'use server';

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import matter from 'gray-matter';
import { getDocTypes } from '~/lib/mdx/docs';
import { statSync } from 'node:fs';

export type SearchResult = {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
  excerpt: string;
  matchedContent?: string;
  priority?: number; // 検索結果の優先度
  sourceType: 'index' | 'content'; // 検索ソースの種類
  thumbnail?: string; // サムネイル画像のURL
};

// 検索インデックスのキャッシュ
let searchIndexCache: {
  timestamp: number;
  index: Record<
    string,
    {
      title: string;
      description: string;
      content: string;
      path: string;
      category: string;
      id: string;
      sourceType: 'index' | 'content';
      thumbnail?: string;
    }
  >;
  fileStats: Record<string, number>; // ファイルパスとタイムスタンプのマップ
} | null = null;

// ファイルの最終更新日時を取得する関数
function getFileModificationTime(filePath: string): number {
  try {
    if (existsSync(filePath)) {
      const stats = statSync(filePath);
      return stats.mtimeMs;
    }
  } catch (error) {
    // エラーが発生した場合は0を返す
  }
  return 0;
}

// ディレクトリ内のファイル更新状況を再帰的に確認する関数
function checkDirectoryForChanges(
  dirPath: string,
  fileStats: Record<string, number>
): boolean {
  try {
    if (!existsSync(dirPath)) {
      return true; // ディレクトリが存在しない場合は変更ありとみなす
    }

    const entries = readdirSync(dirPath);

    for (const entry of entries) {
      const entryPath = join(dirPath, entry);

      try {
        const stats = statSync(entryPath);

        if (stats.isDirectory()) {
          // サブディレクトリを再帰的に確認
          const hasChanges = checkDirectoryForChanges(entryPath, fileStats);
          if (hasChanges) {
            return true;
          }
        } else {
          // ファイルの最終更新日時を確認
          const currentMtime = stats.mtimeMs;
          const cachedMtime = fileStats[entryPath] || 0;

          if (currentMtime > cachedMtime) {
            return true; // ファイルが更新されている場合は変更ありとみなす
          }
        }
      } catch (error) {
        return true; // エラーが発生した場合は変更ありとみなす
      }
    }

    return false; // 変更なし
  } catch (error) {
    return true; // エラーが発生した場合は変更ありとみなす
  }
}

// ファイルシステムの変更を検知する関数
function hasFileSystemChanges(): boolean {
  if (!searchIndexCache || !searchIndexCache.fileStats) {
    return true; // キャッシュがない場合は変更ありとみなす
  }

  const contentsDir = join(process.cwd(), 'contents');

  // contentsディレクトリの変更を確認
  return checkDirectoryForChanges(contentsDir, searchIndexCache.fileStats);
}

// ディレクトリ内のファイル情報を再帰的に収集する関数
function collectFileStats(dirPath: string, fileStats: Record<string, number>) {
  try {
    if (!existsSync(dirPath)) {
      return;
    }

    const entries = readdirSync(dirPath);

    for (const entry of entries) {
      const entryPath = join(dirPath, entry);

      try {
        const stats = statSync(entryPath);

        if (stats.isDirectory()) {
          // サブディレクトリを再帰的に処理
          collectFileStats(entryPath, fileStats);
        } else {
          // ファイルの最終更新日時を記録
          fileStats[entryPath] = stats.mtimeMs;
        }
      } catch (error) {
        // エラーが発生した場合はスキップ
      }
    }
  } catch (error) {
    // エラーが発生した場合はスキップ
  }
}

// 検索インデックスの構築
async function buildSearchIndex() {
  const now = Date.now();
  const contentsDir = join(process.cwd(), 'contents');

  // キャッシュが有効かつファイルシステムに変更がない場合はキャッシュを使用
  if (
    searchIndexCache &&
    now - searchIndexCache.timestamp < 5 * 60 * 1000 &&
    !hasFileSystemChanges()
  ) {
    return searchIndexCache.index;
  }

  const index: Record<
    string,
    {
      title: string;
      description: string;
      content: string;
      path: string;
      category: string;
      id: string;
      sourceType: 'index' | 'content';
      thumbnail?: string;
    }
  > = {};

  // ファイル情報を収集するためのオブジェクト
  const fileStats: Record<string, number> = {};

  // ルートのindex.jsonを読み込む
  const rootIndexPath = join(contentsDir, 'index.json');
  if (existsSync(rootIndexPath)) {
    try {
      const rootIndexContent = readFileSync(rootIndexPath, 'utf-8');
      const rootIndex = JSON.parse(rootIndexContent);

      // ファイル情報を記録
      fileStats[rootIndexPath] = getFileModificationTime(rootIndexPath);

      // ドキュメントタイプの情報をインデックスに追加
      if (rootIndex.docTypes && Array.isArray(rootIndex.docTypes)) {
        for (const docType of rootIndex.docTypes) {
          const id = docType.id;
          const path = `/${id}`;

          // パスの存在確認
          const docTypePath = join(contentsDir, id);
          if (!existsSync(docTypePath)) {
            continue; // ディレクトリが存在しない場合はスキップ
          }

          index[id] = {
            id,
            title: docType.title || id,
            description: docType.description || '',
            content: JSON.stringify(docType),
            path,
            category: docType.category || '',
            sourceType: 'index',
            thumbnail: docType.thumbnail,
          };
        }
      }
    } catch (error) {
      // エラーが発生した場合はスキップ
    }
  }

  // documentsディレクトリの処理
  const documentsDir = join(contentsDir, 'documents');
  if (existsSync(documentsDir)) {
    // 各ドキュメントタイプのディレクトリを処理
    for (const docTypeDir of readdirSync(documentsDir)) {
      const docTypePath = join(documentsDir, docTypeDir);

      try {
        if (!statSync(docTypePath).isDirectory()) continue;

        // index.jsonがあれば読み込む
        const indexPath = join(docTypePath, 'index.json');
        if (existsSync(indexPath)) {
          try {
            const indexContent = readFileSync(indexPath, 'utf-8');
            const docTypeInfo = JSON.parse(indexContent);

            // ファイル情報を記録
            fileStats[indexPath] = getFileModificationTime(indexPath);

            // ドキュメントタイプの情報をインデックスに追加
            const id = `documents/${docTypeDir}`;
            const path = `/documents/${docTypeDir}`;

            index[id] = {
              id,
              title: docTypeInfo.title || docTypeDir,
              description: docTypeInfo.description || '',
              content: JSON.stringify(docTypeInfo),
              path,
              category: 'documents',
              sourceType: 'index',
              thumbnail: docTypeInfo.thumbnail,
            };
          } catch (error) {
            // エラーが発生した場合はスキップ
          }
        }

        // MDXファイルを処理
        processDirectory(
          docTypePath,
          `documents/${docTypeDir}`,
          'documents',
          index,
          fileStats
        );
      } catch (error) {
        // エラーが発生した場合はスキップ
      }
    }
  }

  // wikiディレクトリの処理
  const wikiDir = join(contentsDir, 'wiki');
  if (existsSync(wikiDir)) {
    // index.jsonがあれば読み込む
    const wikiIndexPath = join(wikiDir, 'index.json');
    if (existsSync(wikiIndexPath)) {
      try {
        const indexContent = readFileSync(wikiIndexPath, 'utf-8');
        const wikiInfo = JSON.parse(indexContent);

        // ファイル情報を記録
        fileStats[wikiIndexPath] = getFileModificationTime(wikiIndexPath);

        // Wikiの情報をインデックスに追加
        const id = 'wiki';
        const path = '/wiki';

        index[id] = {
          id,
          title: wikiInfo.title || 'Wiki',
          description: wikiInfo.description || '',
          content: JSON.stringify(wikiInfo),
          path,
          category: 'wiki',
          sourceType: 'index',
          thumbnail: wikiInfo.thumbnail,
        };
      } catch (error) {
        // エラーが発生した場合はスキップ
      }
    }

    // MDXファイルを処理
    try {
      for (const file of readdirSync(wikiDir)) {
        if (extname(file) !== '.mdx' && extname(file) !== '.md') continue;

        const filePath = join(wikiDir, file);

        try {
          if (!existsSync(filePath)) continue;

          const docId = file.replace(/\.mdx?$/, '');
          const content = readFileSync(filePath, 'utf-8');
          const { data, content: mdxContent } = matter(content);

          // ファイル情報を記録
          fileStats[filePath] = getFileModificationTime(filePath);

          // Wikiエントリの情報をインデックスに追加
          const id = `wiki/${docId}`;
          const path = `/wiki/${docId}`;

          index[id] = {
            id,
            title: data.title || docId,
            description: data.description || '',
            content: mdxContent,
            path,
            category: 'wiki',
            sourceType: 'content',
            thumbnail: data.thumbnail,
          };
        } catch (error) {
          // エラーが発生した場合はスキップ
        }
      }
    } catch (error) {
      // エラーが発生した場合はスキップ
    }
  }

  // contentsディレクトリ全体のファイル情報を収集
  collectFileStats(contentsDir, fileStats);

  // キャッシュを更新
  searchIndexCache = {
    timestamp: now,
    index,
    fileStats,
  };

  return index;
}

// ディレクトリ内のMDXファイルを再帰的に処理する関数
function processDirectory(
  dirPath: string,
  basePath: string,
  category: string,
  index: Record<
    string,
    {
      title: string;
      description: string;
      content: string;
      path: string;
      category: string;
      id: string;
      sourceType: 'index' | 'content';
      thumbnail?: string;
    }
  >,
  fileStats: Record<string, number>
) {
  try {
    if (!existsSync(dirPath)) {
      return;
    }

    const entries = readdirSync(dirPath);

    for (const entry of entries) {
      const entryPath = join(dirPath, entry);

      try {
        const stats = statSync(entryPath);

        if (stats.isDirectory()) {
          // サブディレクトリを再帰的に処理
          processDirectory(
            entryPath,
            `${basePath}/${entry}`,
            category,
            index,
            fileStats
          );
        } else if (extname(entry) === '.mdx' || extname(entry) === '.md') {
          // MDXファイルを処理
          const docId = entry.replace(/\.mdx?$/, '');

          try {
            const content = readFileSync(entryPath, 'utf-8');
            const { data, content: mdxContent } = matter(content);

            // ファイル情報を記録
            fileStats[entryPath] = getFileModificationTime(entryPath);

            // ドキュメントの情報をインデックスに追加
            const id = `${basePath}/${docId}`;
            const path = `/${basePath}/${docId}`;

            index[id] = {
              id,
              title: data.title || docId,
              description: data.description || '',
              content: mdxContent,
              path,
              category,
              sourceType: 'content',
              thumbnail: data.thumbnail,
            };
          } catch (error) {
            // エラーが発生した場合はスキップ
          }
        }
      } catch (error) {
        // エラーが発生した場合はスキップ
      }
    }
  } catch (error) {
    // エラーが発生した場合はスキップ
  }
}

// 検索結果のパスが実際に存在するかを確認する関数
function validateSearchResult(result: SearchResult): boolean {
  try {
    const contentsDir = join(process.cwd(), 'contents');
    const pathParts = result.id.split('/').filter(Boolean); // 空の文字列を除外

    // index.jsonからの結果の場合は、対応するディレクトリが存在するか確認
    if (result.sourceType === 'index') {
      if (pathParts.length === 0) {
        return false; // 無効なパス
      }

      if (pathParts.length === 1) {
        // ルートレベルのドキュメントタイプ
        return existsSync(join(contentsDir, pathParts[0] as string));
      }

      // サブディレクトリのドキュメントタイプ
      // 安全に連結するために一つずつパスを構築
      let fullPath = contentsDir;
      for (const part of pathParts) {
        fullPath = join(fullPath, part);
      }
      return existsSync(fullPath);
    }

    // コンテンツからの結果の場合は、対応するMDXファイルが存在するか確認
    if (pathParts.length === 0) {
      return false; // 無効なパス
    }

    const fileName = pathParts.pop();
    if (!fileName) {
      return false; // ファイル名が取得できない場合
    }

    // 安全に連結するために一つずつパスを構築
    let dirPath = contentsDir;
    for (const part of pathParts) {
      dirPath = join(dirPath, part);
    }

    return (
      existsSync(join(dirPath, `${fileName}.mdx`)) ||
      existsSync(join(dirPath, `${fileName}.md`))
    );
  } catch (error) {
    return false;
  }
}

export async function searchDocuments(query: string): Promise<SearchResult[]> {
  if (!query || query.trim() === '') {
    return [];
  }

  const searchTerm = query.toLowerCase();
  const results: SearchResult[] = [];

  // 検索インデックスを構築
  const searchIndex = await buildSearchIndex();

  // インデックスを使用して検索
  for (const [id, entry] of Object.entries(searchIndex)) {
    let priority = 0;
    let matchedContent = '';

    // タイトルに一致する場合（最も優先度が高い）
    const titleMatch = entry.title.toLowerCase().includes(searchTerm);
    if (titleMatch) {
      priority = 3;
    }

    // 説明に一致する場合
    const descriptionMatch = entry.description
      .toLowerCase()
      .includes(searchTerm);
    if (descriptionMatch) {
      priority = Math.max(priority, 2);
    }

    // 内容に一致する場合
    const contentMatch = entry.content.toLowerCase().includes(searchTerm);
    if (contentMatch) {
      priority = Math.max(priority, 1);

      // マッチした内容の抜粋を作成
      const index = entry.content.toLowerCase().indexOf(searchTerm);
      const start = Math.max(0, index - 50);
      const end = Math.min(
        entry.content.length,
        index + searchTerm.length + 50
      );
      matchedContent = `...${entry.content.substring(start, end)}...`;
    }

    // いずれかに一致する場合は結果に追加
    if (titleMatch || descriptionMatch || contentMatch) {
      const searchResult: SearchResult = {
        id: entry.id,
        title: entry.title,
        description: entry.description,
        category: entry.category,
        path: entry.path,
        excerpt: entry.description || `${matchedContent.substring(0, 150)}...`,
        matchedContent,
        priority,
        sourceType: entry.sourceType,
        thumbnail: entry.thumbnail,
      };

      // 検索結果のパスが実際に存在するか確認
      if (validateSearchResult(searchResult)) {
        results.push(searchResult);
      }
    }
  }

  // 優先度でソート
  results.sort((a, b) => {
    // 優先度が高い順
    if ((b.priority || 0) !== (a.priority || 0)) {
      return (b.priority || 0) - (a.priority || 0);
    }
    // タイトルのアルファベット順
    return a.title.localeCompare(b.title);
  });

  return results;
}

/**
 * 検索候補を取得するサーバーアクション
 * 入力中の検索クエリに基づいて候補を提供する
 * @param query 検索クエリ
 * @param limit 取得する候補の最大数
 * @returns 検索候補の配列
 */
export async function getSuggestions(
  query: string,
  limit = 5
): Promise<SearchResult[]> {
  if (!query || query.trim() === '') {
    return [];
  }

  const searchTerm = query.toLowerCase();
  const results: SearchResult[] = [];

  // 検索インデックスを構築
  const searchIndex = await buildSearchIndex();

  // index.jsonからの結果のみを対象とする
  const indexEntries = Object.entries(searchIndex).filter(
    ([_, entry]) => entry.sourceType === 'index'
  );

  // インデックスを使用して検索
  for (const [id, entry] of indexEntries) {
    let priority = 0;

    // タイトルに一致する場合（最も優先度が高い）
    const titleMatch = entry.title.toLowerCase().includes(searchTerm);
    if (titleMatch) {
      priority = 3;
    }

    // 説明に一致する場合
    const descriptionMatch = entry.description
      .toLowerCase()
      .includes(searchTerm);
    if (descriptionMatch) {
      priority = Math.max(priority, 2);
    }

    // いずれかに一致する場合は結果に追加
    if (titleMatch || descriptionMatch) {
      const searchResult: SearchResult = {
        id: entry.id,
        title: entry.title,
        description: entry.description,
        category: entry.category,
        path: entry.path,
        excerpt: entry.description,
        priority,
        sourceType: entry.sourceType,
        thumbnail: entry.thumbnail,
      };

      // 検索結果のパスが実際に存在するか確認
      if (validateSearchResult(searchResult)) {
        results.push(searchResult);
      }
    }
  }

  // 優先度でソート
  results.sort((a, b) => {
    // 優先度が高い順
    if ((b.priority || 0) !== (a.priority || 0)) {
      return (b.priority || 0) - (a.priority || 0);
    }
    // タイトルのアルファベット順
    return a.title.localeCompare(b.title);
  });

  // 指定された数だけ返す
  return results.slice(0, limit);
}
