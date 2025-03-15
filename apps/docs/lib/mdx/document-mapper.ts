import { readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { glob } from 'glob';
import matter from 'gray-matter';
import type {
  DocumentMapping,
  DocumentMappingConfig,
  DocumentMetadata,
  ResolvedKeyword,
} from './types';
import { CacheManager } from './cache';
import { errorReporter } from './errors';

const DEFAULT_CONFIG: DocumentMappingConfig = {
  basePath: 'contents',
  extensions: ['.mdx', '.md'],
  ignorePaths: ['**/node_modules/**', '**/.git/**'],
  indexUpdateInterval: 5 * 60 * 1000, // 5分
};

/**
 * ドキュメントマッパー
 * ドキュメントの検索、メタデータの管理、キーワードの解決を行う
 */
export class DocumentMapper {
  private mappings: Map<string, DocumentMapping>;
  private cache: CacheManager<DocumentMapping>;
  private config: DocumentMappingConfig;
  private lastIndexUpdate: number;

  constructor(config: Partial<DocumentMappingConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.mappings = new Map();
    this.cache = new CacheManager({
      enableFileWatcher: false,
      updateInterval: this.config.indexUpdateInterval,
      ttl: this.config.indexUpdateInterval,
      maxSize: 1000,
      persistToDisk: true,
      version: '1.0.0',
    });
    this.lastIndexUpdate = 0;
  }

  /**
   * ドキュメントインデックスを更新する
   */
  async updateIndex(): Promise<void> {
    const now = Date.now();
    if (now - this.lastIndexUpdate < this.config.indexUpdateInterval) {
      return;
    }

    console.log('🔍 DocumentMapper - インデックスの更新を開始');
    const startTime = Date.now();

    try {
      const files = await glob(`**/*{${this.config.extensions.join(',')}}`, {
        cwd: this.config.basePath,
        ignore: this.config.ignorePaths,
        absolute: true,
      });

      console.log(`🔍 DocumentMapper - ${files.length}件のファイルを検出`);

      for (const file of files) {
        const relativePath = relative(this.config.basePath, file);
        let cached: DocumentMapping | null = null;

        try {
          cached = await this.cache.get(relativePath);
        } catch (error) {
          console.warn(
            `🔍 DocumentMapper - ${relativePath}のキャッシュ取得に失敗:`,
            error
          );
        }

        if (cached) {
          this.mappings.set(relativePath, cached);
          continue;
        }

        try {
          const content = await readFile(file, 'utf-8');
          const { data: frontmatter } = matter(content);
          const slug = this.generateSlug(relativePath);
          const docType = this.getDocTypeFromPath(relativePath);

          const metadata: DocumentMetadata = {
            title: frontmatter.title || this.generateTitle(slug),
            description: frontmatter.description,
            path: relativePath,
            slug,
            docType,
            keywords: frontmatter.keywords || [],
            lastModified: new Date().toISOString(),
          };

          const mapping: DocumentMapping = {
            path: relativePath,
            slug,
            docType,
            metadata,
            keywords: metadata.keywords,
          };

          this.mappings.set(relativePath, mapping);

          try {
            await this.cache.set(relativePath, mapping);
          } catch (error) {
            console.warn(
              `🔍 DocumentMapper - ${relativePath}のキャッシュ保存に失敗:`,
              error
            );
          }
        } catch (error) {
          console.error(`🔍 DocumentMapper - ${file}の処理に失敗:`, error);
          errorReporter.report(error as Error);
        }
      }

      this.lastIndexUpdate = now;
      const elapsedTime = Date.now() - startTime;
      console.log(
        `🔍 DocumentMapper - インデックスの更新が完了 (${elapsedTime}ms)`
      );
    } catch (error) {
      const elapsedTime = Date.now() - startTime;
      console.error(
        `🔍 DocumentMapper - インデックスの更新に失敗 (${elapsedTime}ms):`,
        error
      );
      errorReporter.report(error as Error);
      throw new Error(
        `ドキュメントインデックスの更新に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`
      );
    }
  }

  /**
   * キーワードを解決する
   */
  async resolveKeyword(
    keyword: string,
    docType?: string
  ): Promise<ResolvedKeyword> {
    try {
      console.log(`🔍 DocumentMapper - "${keyword}" の解決を開始`);
      await this.updateIndex();

      const exactMatches: DocumentMapping[] = [];
      const partialMatches: DocumentMapping[] = [];
      const similarMatches: DocumentMapping[] = [];

      for (const mapping of this.mappings.values()) {
        const matchType = this.getMatchType(mapping, keyword, docType);
        switch (matchType) {
          case 'exact':
            exactMatches.push(mapping);
            break;
          case 'partial':
            partialMatches.push(mapping);
            break;
          case 'similar':
            similarMatches.push(mapping);
            break;
        }
      }

      console.log(`🔍 DocumentMapper - "${keyword}" の解決結果:`, {
        exactMatchesCount: exactMatches.length,
        partialMatchesCount: partialMatches.length,
        similarMatchesCount: similarMatches.length,
      });

      // 完全一致が見つかった場合
      if (exactMatches.length === 1) {
        return {
          keyword,
          docType,
          mapping: exactMatches[0],
          isAmbiguous: false,
        };
      }

      if (exactMatches.length > 1) {
        return {
          keyword,
          docType,
          isAmbiguous: true,
          alternatives: exactMatches,
          error: '複数の完全一致するドキュメントが見つかりました',
        };
      }

      // 部分一致が見つかった場合
      if (partialMatches.length > 0) {
        return {
          keyword,
          docType,
          isAmbiguous: true,
          alternatives: partialMatches,
          error: '部分一致するドキュメントが見つかりました',
        };
      }

      // 類似キーワードが見つかった場合
      if (similarMatches.length > 0) {
        return {
          keyword,
          docType,
          isAmbiguous: true,
          alternatives: similarMatches,
          error: '類似するキーワードが見つかりました',
        };
      }

      // マッチするものが見つからなかった場合
      console.log(
        `🔍 DocumentMapper - "${keyword}" に一致するドキュメントが見つかりませんでした`
      );
      return {
        keyword,
        docType,
        isAmbiguous: false,
        error: 'ドキュメントが見つかりません',
      };
    } catch (error) {
      console.error(
        `🔍 DocumentMapper - "${keyword}" の解決中にエラーが発生:`,
        error
      );
      errorReporter.report(error as Error);
      return {
        keyword,
        docType,
        isAmbiguous: false,
        error:
          error instanceof Error
            ? `キーワードの解決中にエラーが発生しました: ${error.message}`
            : 'キーワードの解決中に不明なエラーが発生しました',
      };
    }
  }

  /**
   * マッチの種類を判定する
   */
  private getMatchType(
    mapping: DocumentMapping,
    keyword: string,
    docType?: string
  ): 'exact' | 'partial' | 'similar' | null {
    if (docType && mapping.docType !== docType) {
      return null;
    }

    const normalizedKeyword = keyword.toLowerCase();
    const title = mapping.metadata.title.toLowerCase();

    // 完全一致
    if (
      title === normalizedKeyword ||
      mapping.keywords.some((k) => k.toLowerCase() === normalizedKeyword)
    ) {
      return 'exact';
    }

    // 部分一致
    if (
      title.includes(normalizedKeyword) ||
      mapping.keywords.some((k) => k.toLowerCase().includes(normalizedKeyword))
    ) {
      return 'partial';
    }

    // 類似一致（編集距離が2以下）
    if (
      this.calculateLevenshteinDistance(title, normalizedKeyword) <= 2 ||
      mapping.keywords.some(
        (k) =>
          this.calculateLevenshteinDistance(
            k.toLowerCase(),
            normalizedKeyword
          ) <= 2
      )
    ) {
      return 'similar';
    }

    return null;
  }

  /**
   * レーベンシュタイン距離を計算する
   */
  private calculateLevenshteinDistance(a: string, b: string): number {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    // 配列を0で初期化
    const row1 = new Array(a.length + 1).fill(0);
    const row2 = new Array(a.length + 1).fill(0);

    // 初期行の設定
    for (let i = 0; i <= a.length; i++) {
      row1[i] = i;
    }

    // 各行の計算
    for (let i = 1; i <= b.length; i++) {
      row2[0] = i;

      for (let j = 1; j <= a.length; j++) {
        const cost = a[j - 1] === b[i - 1] ? 0 : 1;
        row2[j] = Math.min(row2[j - 1] + 1, row1[j] + 1, row1[j - 1] + cost);
      }

      // 行の入れ替え
      for (let j = 0; j <= a.length; j++) {
        row1[j] = row2[j];
      }
    }

    return row2[a.length];
  }

  /**
   * パスからドキュメントタイプを取得する
   */
  private getDocTypeFromPath(path: string): string {
    const parts = path.split('/');
    return parts[0] || 'docs';
  }

  /**
   * スラッグを生成する
   */
  private generateSlug(path: string): string {
    return path
      .replace(/\.[^/.]+$/, '') // 拡張子を削除
      .replace(/\/index$/, '') // index.mdxを削除
      .replace(/\\/g, '/'); // Windowsのパス区切りを/に統一
  }

  /**
   * タイトルを生成する
   */
  private generateTitle(slug: string): string {
    const lastPart = slug.split('/').pop() || slug;
    return lastPart.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }
}

// シングルトンインスタンス
export const documentMapper = new DocumentMapper();
