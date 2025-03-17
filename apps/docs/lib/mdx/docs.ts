/**
 * @deprecated このファイルは後方互換性のために残されています。
 * 新しいコードでは、個別のモジュールを直接インポートするか、
 * インデックスファイルからインポートしてください。
 */

import {
  readdirSync,
  statSync,
  readFileSync,
  existsSync,
  readFile,
} from 'node:fs';
import { promises as fsPromises } from 'node:fs';
import { join, basename, extname } from 'node:path';
import type { DocType, DocCategory } from './types';
import { glob } from 'glob';
import matter from 'gray-matter';

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

/**
 * 前後のドキュメントを取得する
 * @param slug 現在のドキュメントのスラグ
 * @returns 前後のドキュメントの情報
 */
export async function getAdjacentDocs(slug: string[]): Promise<{
  prev: { title: string; slug: string[] } | null;
  next: { title: string; slug: string[] } | null;
}> {
  if (!Array.isArray(slug) || slug.length < 2) {
    return { prev: null, next: null };
  }

  const [category, docType, ...pathSegments] = slug;

  // categoryとdocTypeが存在することを確認
  if (!category || !docType) {
    return { prev: null, next: null };
  }

  // ベースディレクトリパスを構築
  const basePath = join(process.cwd(), 'contents', category, docType);

  // 現在のファイルが存在するディレクトリと、現在のファイル名を特定
  let currentDir = basePath;
  let currentFileName = 'index.mdx';
  let directorySegments: string[] = [];
  let isTopLevelIndex = false;
  let currentSubdir = ''; // 現在のサブディレクトリ名

  if (pathSegments.length > 0) {
    // パスセグメントの最後がファイル名、それ以外がディレクトリパス
    directorySegments = [...pathSegments];
    const lastSegment = directorySegments.pop();

    // ディレクトリパスがある場合は、そのディレクトリに移動
    if (directorySegments.length > 0) {
      currentDir = join(basePath, ...directorySegments);
      currentSubdir = directorySegments[0] || ''; // 最初のセグメントがサブディレクトリ名
    }

    // 最後のセグメントがindexの場合はindex.mdx、それ以外は{lastSegment}.mdx
    currentFileName =
      lastSegment === 'index' ? 'index.mdx' : `${lastSegment || ''}.mdx`;
  } else {
    // パスセグメントがない場合はトップレベルのindex.mdx
    isTopLevelIndex = true;
  }

  // ディレクトリが存在しない場合は終了
  if (!existsSync(currentDir)) {
    return { prev: null, next: null };
  }

  // 現在のディレクトリ内のMDXファイルのみを取得（サブディレクトリは含まない）
  const mdxFiles = await glob('*.mdx', {
    cwd: currentDir,
    ignore: ['**/node_modules/**', '**/.git/**'],
  });

  // 各ファイルのフロントマターを取得
  const docsWithOrder = await Promise.all(
    mdxFiles.map(async (file) => {
      const filePath = join(currentDir, file);
      const content = await fsPromises.readFile(filePath, 'utf-8');
      const { data } = matter(content);

      // ファイル名からスラグを構築
      const fileName = file.replace(/\.mdx$/, '');
      // index.mdxの場合は現在のディレクトリパスのみ、それ以外はファイル名を追加
      const fileSlug =
        fileName === 'index'
          ? [...directorySegments]
          : [...directorySegments, fileName];

      return {
        title: data.title || fileName,
        order: typeof data.order === 'number' ? data.order : 999, // orderがない場合は大きな値を設定
        slug: [...slug.slice(0, 2), ...fileSlug],
        path: file,
      };
    })
  );

  // orderでソート
  docsWithOrder.sort((a, b) => a.order - b.order);

  // 現在のドキュメントのインデックスを見つける
  const currentIndex = docsWithOrder.findIndex(
    (doc) => doc.path === currentFileName
  );

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  // 前後のドキュメントを取得
  let prev = currentIndex > 0 ? docsWithOrder[currentIndex - 1] : null;
  let next =
    currentIndex < docsWithOrder.length - 1
      ? docsWithOrder[currentIndex + 1]
      : null;

  // サブディレクトリ間のナビゲーションを処理
  if (directorySegments.length > 0) {
    // 親ディレクトリのパス
    const parentDir = basePath;

    // 親ディレクトリ内のすべてのサブディレクトリを取得
    try {
      // 1. 前のページがない場合、前のサブディレクトリの最後のページを取得
      if (!prev && currentIndex === 0 && currentSubdir) {
        // サブディレクトリを取得してorderでソート
        const subdirs = await getSubdirectoriesWithOrder(parentDir);

        // 現在のサブディレクトリのインデックスを見つける
        const currentSubdirIndex = subdirs.findIndex(
          (s) => s?.dir === currentSubdir
        );

        if (currentSubdirIndex > 0) {
          // 前のサブディレクトリを取得
          const prevSubdir = subdirs[currentSubdirIndex - 1];

          if (prevSubdir?.dir) {
            // 親ディレクトリのindex.mdxがあるか確認
            const parentIndexPath = join(parentDir, 'index.mdx');
            if (existsSync(parentIndexPath)) {
              // 親ディレクトリのindex.mdxを前のページとして設定
              const parentContent = await fsPromises.readFile(
                parentIndexPath,
                'utf-8'
              );
              const { data } = matter(parentContent);
              prev = {
                title: data.title || 'Index',
                slug: [category, docType],
                order: typeof data.order === 'number' ? data.order : 0,
                path: 'index.mdx',
              };
            } else {
              // 前のサブディレクトリの最後のページを取得
              const prevSubdirPath = join(parentDir, prevSubdir.dir);
              const prevSubdirFiles = await glob('*.mdx', {
                cwd: prevSubdirPath,
                ignore: ['**/node_modules/**', '**/.git/**'],
              });

              if (prevSubdirFiles.length > 0) {
                const prevSubdirDocs = await Promise.all(
                  prevSubdirFiles.map(async (file) => {
                    const filePath = join(prevSubdirPath, file);
                    const content = await fsPromises.readFile(
                      filePath,
                      'utf-8'
                    );
                    const { data } = matter(content);

                    const fileName = file.replace(/\.mdx$/, '');
                    const fileSlug =
                      fileName === 'index'
                        ? [prevSubdir.dir]
                        : [prevSubdir.dir, fileName];

                    return {
                      title: data.title || fileName,
                      order: typeof data.order === 'number' ? data.order : 999,
                      slug: [...slug.slice(0, 2), ...fileSlug],
                      path: file,
                    };
                  })
                );

                // orderでソートして最後のページを取得
                prevSubdirDocs.sort((a, b) => a.order - b.order);
                prev = prevSubdirDocs[prevSubdirDocs.length - 1];
              }
            }
          }
        }
      }

      // 2. 次のページがない場合、次のサブディレクトリの最初のページを取得
      if (!next && currentIndex === docsWithOrder.length - 1 && currentSubdir) {
        // サブディレクトリを取得してorderでソート
        const subdirs = await getSubdirectoriesWithOrder(parentDir);

        // 現在のサブディレクトリのインデックスを見つける
        const currentSubdirIndex = subdirs.findIndex(
          (s) => s?.dir === currentSubdir
        );

        if (
          currentSubdirIndex >= 0 &&
          currentSubdirIndex < subdirs.length - 1
        ) {
          // 次のサブディレクトリを取得
          const nextSubdir = subdirs[currentSubdirIndex + 1];

          if (nextSubdir?.dir) {
            // 次のサブディレクトリの最初のページを取得
            const nextSubdirPath = join(parentDir, nextSubdir.dir);
            const nextSubdirFiles = await glob('*.mdx', {
              cwd: nextSubdirPath,
              ignore: ['**/node_modules/**', '**/.git/**'],
            });

            if (nextSubdirFiles.length > 0) {
              const nextSubdirDocs = await Promise.all(
                nextSubdirFiles.map(async (file) => {
                  const filePath = join(nextSubdirPath, file);
                  const content = await fsPromises.readFile(filePath, 'utf-8');
                  const { data } = matter(content);

                  const fileName = file.replace(/\.mdx$/, '');
                  const fileSlug =
                    fileName === 'index'
                      ? [nextSubdir.dir]
                      : [nextSubdir.dir, fileName];

                  return {
                    title: data.title || fileName,
                    order: typeof data.order === 'number' ? data.order : 999,
                    slug: [...slug.slice(0, 2), ...fileSlug],
                    path: file,
                  };
                })
              );

              // orderでソートして最初のページを取得
              nextSubdirDocs.sort((a, b) => a.order - b.order);
              next = nextSubdirDocs[0];
            }
          }
        }
      }
    } catch (error) {
      console.error('Error handling subdirectory navigation:', error);
    }
  }

  // トップレベルのindex.mdxで次のページがない場合、サブディレクトリを探索
  if (isTopLevelIndex && !next) {
    try {
      // サブディレクトリを取得してorderでソート
      const subdirs = await getSubdirectoriesWithOrder(basePath);

      // 最も優先度の高いサブディレクトリを取得
      if (subdirs.length > 0) {
        const topSubdir = subdirs[0];

        if (topSubdir?.dir) {
          const subdirPath = join(basePath, topSubdir.dir);

          // サブディレクトリ内のMDXファイルを取得
          const subdirMdxFiles = await glob('*.mdx', {
            cwd: subdirPath,
            ignore: ['**/node_modules/**', '**/.git/**'],
          });

          // 各ファイルのフロントマターを取得
          const subdirDocsWithOrder = await Promise.all(
            subdirMdxFiles.map(async (file) => {
              const filePath = join(subdirPath, file);
              const content = await fsPromises.readFile(filePath, 'utf-8');
              const { data } = matter(content);

              // ファイル名からスラグを構築
              const fileName = file.replace(/\.mdx$/, '');
              const fileSlug =
                fileName === 'index'
                  ? [topSubdir.dir]
                  : [topSubdir.dir, fileName];

              return {
                title: data.title || fileName,
                order: typeof data.order === 'number' ? data.order : 999,
                slug: [...slug.slice(0, 2), ...fileSlug],
                path: file,
              };
            })
          );

          // orderでソート
          subdirDocsWithOrder.sort((a, b) => a.order - b.order);

          // 最も優先度の高いファイルを「次のページ」として設定
          if (subdirDocsWithOrder.length > 0) {
            const topDoc = subdirDocsWithOrder[0];
            if (topDoc) {
              next = {
                title: topDoc.title,
                slug: topDoc.slug,
                order: topDoc.order,
                path: topDoc.path,
              };
            }
          }
        }
      }
    } catch (error) {
      console.error('Error finding next page in subdirectories:', error);
    }
  }

  return {
    prev: prev ? { title: prev.title, slug: prev.slug } : null,
    next: next ? { title: next.title, slug: next.slug } : null,
  };
}

/**
 * サブディレクトリを取得してorderでソートする
 * @param dirPath ディレクトリパス
 * @returns orderでソートされたサブディレクトリの配列
 */
async function getSubdirectoriesWithOrder(
  dirPath: string
): Promise<Array<{ dir: string; order: number; title: string }>> {
  // サブディレクトリを取得
  const subdirs = readdirSync(dirPath).filter((item) => {
    const itemPath = join(dirPath, item);
    return statSync(itemPath).isDirectory() && !item.startsWith('_');
  });

  // サブディレクトリのindex.jsonからorderを取得
  const subdirsWithOrder = await Promise.all(
    subdirs.map(async (dir) => {
      const indexJsonPath = join(dirPath, dir, 'index.json');
      let order = 999; // デフォルト値
      let title = dir;

      if (existsSync(indexJsonPath)) {
        try {
          const content = await fsPromises.readFile(indexJsonPath, 'utf-8');
          const data = JSON.parse(content);
          if (typeof data.order === 'number') {
            order = data.order;
          }
          if (data.title) {
            title = data.title;
          }
        } catch (error) {
          console.error(`Error reading ${indexJsonPath}:`, error);
        }
      }

      return { dir, order, title };
    })
  );

  // orderでソート
  return subdirsWithOrder.sort((a, b) => a.order - b.order);
}

// MDX処理関連の関数をエクスポート
export { getDocFromParams, processMDX } from './mdx-processor';

// フロントマター関連の関数をエクスポート
export { DocFrontmatterSchema, generateTitleFromFilename } from './frontmatter';

// キャッシュ設定をエクスポート
export { devConfig, prodConfig } from './cache';
