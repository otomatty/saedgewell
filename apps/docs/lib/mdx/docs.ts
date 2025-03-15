/**
 * @deprecated このファイルは後方互換性のために残されています。
 * 新しいコードでは、個別のモジュールを直接インポートするか、
 * インデックスファイルからインポートしてください。
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, basename, extname } from 'node:path';
import type { DocType, DocCategory } from './types';

// カテゴリとタグの定義
const CATEGORIES: DocCategory[] = [
  {
    id: 'documents',
    title: 'ドキュメント',
    description: '書籍、プロジェクト文書、技術文書などのまとまった情報',
    type: 'category',
  },
  {
    id: 'wiki',
    title: 'Wiki',
    description: '技術用語や業務用語などの単語レベルの情報',
    type: 'category',
  },
];

const TAGS = {
  type: [
    {
      id: 'book',
      title: '書籍',
      description: 'プログラミング関連の書籍やチュートリアル',
    },
    {
      id: 'project',
      title: 'プロジェクト',
      description: '個人開発プロジェクトのドキュメント',
    },
    {
      id: 'official',
      title: '公式ドキュメント',
      description: '使用技術の公式ドキュメント',
    },
  ],
  tech: [
    { id: 'nextjs', title: 'Next.js' },
    { id: 'react', title: 'React' },
    { id: 'supabase', title: 'Supabase' },
  ],
};

// 型定義のエクスポート
export type { DocFrontmatter, DocNode, DocType } from './types';

// ドキュメントツリー関連の関数をエクスポート
export { getDocTree } from './doc-tree';

// ドキュメントタイプ関連の関数をエクスポート
export function getDocTypes() {
  const contentsDir = join(process.cwd(), 'contents');
  const docTypes: DocType[] = [];
  const wikiEntries: DocType[] = [];

  // カテゴリディレクトリを読み取る
  for (const categoryId of readdirSync(contentsDir)) {
    const categoryPath = join(contentsDir, categoryId);

    // ディレクトリのみを処理
    if (!statSync(categoryPath).isDirectory()) continue;

    // カテゴリに属するドキュメントタイプを読み取る
    if (categoryId === 'documents') {
      // documentsカテゴリの場合、各サブディレクトリがドキュメントタイプ
      for (const docTypeId of readdirSync(categoryPath)) {
        const docTypePath = join(categoryPath, docTypeId);

        // ディレクトリのみを処理
        if (!statSync(docTypePath).isDirectory()) continue;

        // index.jsonがあれば読み取る
        const indexPath = join(docTypePath, 'index.json');
        if (existsSync(indexPath)) {
          try {
            const indexContent = JSON.parse(readFileSync(indexPath, 'utf-8'));
            docTypes.push({
              id: docTypeId,
              title: indexContent.title || docTypeId,
              description: indexContent.description || '',
              category: 'documents',
              thumbnail: indexContent.thumbnail || undefined,
              tags: indexContent.tags || {},
            });
          } catch (error) {
            console.error(`Error parsing ${indexPath}:`, error);
            // エラーが発生しても処理を続行
            docTypes.push({
              id: docTypeId,
              title: docTypeId,
              description: '',
              category: 'documents',
            });
          }
        } else {
          // index.jsonがなければデフォルト値を使用
          docTypes.push({
            id: docTypeId,
            title: docTypeId,
            description: '',
            category: 'documents',
          });
        }
      }
    } else if (categoryId === 'wiki') {
      // wikiカテゴリの場合、各MDXファイルを個別のエントリとして扱う
      const mdxFiles = readdirSync(categoryPath).filter(
        (file) => extname(file) === '.mdx'
      );

      for (const file of mdxFiles) {
        const filePath = join(categoryPath, file);
        const entryId = basename(file, '.mdx');

        try {
          const content = readFileSync(filePath, 'utf-8');

          // フロントマターから情報を抽出（簡易的な実装）
          const titleMatch = content.match(/title:\s*(.+)/);
          const descriptionMatch = content.match(/description:\s*(.+)/);
          const tagsMatch = content.match(/tags:\s*(.+)/);
          const thumbnailMatch = content.match(/thumbnail:\s*(.+)/);

          const title = titleMatch?.[1]?.trim() || entryId;
          const description = descriptionMatch?.[1]?.trim() || '';
          const thumbnail = thumbnailMatch?.[1]?.trim();

          // タグを抽出
          let tags: { tech?: string[]; type?: string[] } | undefined =
            undefined;

          if (tagsMatch) {
            const tagValue = tagsMatch[1]?.trim();
            if (tagValue === 'technical') {
              const techTags: string[] = [];
              if (content.includes('nextjs')) techTags.push('nextjs');
              if (content.includes('react')) techTags.push('react');
              if (content.includes('supabase')) techTags.push('supabase');

              if (techTags.length > 0) {
                tags = { tech: techTags };
              }
            } else if (tagValue === 'business') {
              tags = { type: ['business'] };
            }
          }

          wikiEntries.push({
            id: `wiki/${entryId}`,
            title,
            description,
            category: 'wiki',
            thumbnail,
            tags,
          });
        } catch (error) {
          console.error(`Error reading ${filePath}:`, error);
          // エラーが発生しても処理を続行
          wikiEntries.push({
            id: `wiki/${entryId}`,
            title: entryId,
            description: '',
            category: 'wiki',
          });
        }
      }
    }
  }

  // すべてのドキュメントタイプを結合
  return { categories: CATEGORIES, docTypes: [...docTypes, ...wikiEntries] };
}

// MDX処理関連の関数をエクスポート
export { getDocFromParams, processMDX } from './mdx-processor';

// フロントマター関連の関数をエクスポート
export { DocFrontmatterSchema, generateTitleFromFilename } from './frontmatter';

// キャッシュ設定をエクスポート
export { devConfig, prodConfig } from './cache';
