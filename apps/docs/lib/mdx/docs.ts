/**
 * @deprecated このファイルは後方互換性のために残されています。
 * 新しいコードでは、個別のモジュールを直接インポートするか、
 * インデックスファイルからインポートしてください。
 */

import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, basename, extname } from 'node:path';
import type { DocType, DocCategory } from '~/types/mdx';
import { getDocRootPath } from '~/config/paths';

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
  {
    id: 'journals',
    title: '日記',
    description: '日々の作業記録や学習記録',
    type: 'category',
  },
];

// const TAGS = {
//   type: [
//     {
//       id: 'book',
//       title: '書籍',
//       description: 'プログラミング関連の書籍やチュートリアル',
//     },
//     {
//       id: 'project',
//       title: 'プロジェクト',
//       description: '個人開発プロジェクトのドキュメント',
//     },
//     {
//       id: 'official',
//       title: '公式ドキュメント',
//       description: '使用技術の公式ドキュメント',
//     },
//   ],
//   tech: [
//     { id: 'nextjs', title: 'Next.js' },
//     { id: 'react', title: 'React' },
//     { id: 'supabase', title: 'Supabase' },
//   ],
// };

// 型定義のエクスポート
export type { DocFrontmatter, DocNode, DocType } from '~/types/mdx';

// ドキュメントツリー関連の関数をエクスポート
export { getDocTree } from './doc-tree';

// ナビゲーション関連の関数をエクスポート
export { getAdjacentDocs, getDocsWithOrder } from './navigation';
export type { DocNavigation, DocNavigationItem } from './navigation';

// ドキュメントタイプ関連の関数をエクスポート
export function getDocTypes() {
  const contentsDir = getDocRootPath(); // .docsディレクトリへのパスを取得
  const docTypes: DocType[] = [];
  const wikiEntries: DocType[] = [];

  try {
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
                icon: indexContent.icon || undefined,
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
                icon: undefined,
              });
            }
          } else {
            // index.jsonがなければデフォルト値を使用
            docTypes.push({
              id: docTypeId,
              title: docTypeId,
              description: '',
              category: 'documents',
              icon: undefined,
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
            const iconMatch = content.match(/icon:\s*(.+)/);

            const title = titleMatch?.[1]?.trim() || entryId;
            const description = descriptionMatch?.[1]?.trim() || '';
            const thumbnail = thumbnailMatch?.[1]?.trim();
            const icon = iconMatch?.[1]?.trim();

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
              icon,
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
              icon: undefined,
            });
          }
        }
      } else if (categoryId === 'journals') {
        // journalsカテゴリの場合、日付ディレクトリとindex.jsonを処理
        const dateDirs = readdirSync(categoryPath, {
          withFileTypes: true,
        }).filter(
          (dirent) => dirent.isDirectory() && !dirent.name.startsWith('.')
        );

        for (const dateDir of dateDirs) {
          const datePath = join(categoryPath, dateDir.name);
          const indexJsonPath = join(datePath, 'index.json');

          // 日付ディレクトリ内のindex.jsonファイルを読み込む
          if (existsSync(indexJsonPath)) {
            try {
              const indexContent = JSON.parse(
                readFileSync(indexJsonPath, 'utf-8')
              );

              // index.jsonからの情報を使用してエントリを作成
              wikiEntries.push({
                id: `journals/${dateDir.name}`,
                title: indexContent.title || `${dateDir.name}の作業記録`,
                description: indexContent.description || '',
                summary: indexContent.summary || '',
                category: 'journals',
                thumbnail: indexContent.thumbnail,
                icon: indexContent.icon,
                tags: {
                  type: ['date'],
                  date: [dateDir.name],
                },
                date: indexContent.date || dateDir.name,
                author: indexContent.author,
              });

              // index.jsonに記載されている各エントリも処理
              if (indexContent.entries && Array.isArray(indexContent.entries)) {
                for (const entry of indexContent.entries) {
                  const entryId = entry.id;
                  const mdxPath = join(datePath, `${entryId}.mdx`);

                  // MDXファイルが存在するか確認
                  if (existsSync(mdxPath)) {
                    // タグ情報をマージ
                    const tags = { ...entry.tags };
                    if (!tags.date) tags.date = [dateDir.name];

                    wikiEntries.push({
                      id: `journals/${dateDir.name}/${entryId}`,
                      title: entry.title,
                      description: entry.description || '',
                      category: 'journals',
                      parentId: `journals/${dateDir.name}`, // 親ドキュメントへの参照
                      tags: tags,
                      date: indexContent.date || dateDir.name,
                    });
                  }
                }
              }
            } catch (error) {
              console.error(
                `Error reading index.json from ${indexJsonPath}:`,
                error
              );
              // エラーが発生しても処理を続行
              wikiEntries.push({
                id: `journals/${dateDir.name}`,
                title: `${dateDir.name}の作業記録`,
                description: '',
                category: 'journals',
              });
            }
          } else {
            // index.jsonが存在しない場合は日付ディレクトリ内のMDXファイルを直接処理
            const mdxFiles = readdirSync(datePath).filter(
              (file) => extname(file) === '.mdx'
            );

            if (mdxFiles.length > 0) {
              // 日付ディレクトリをエントリとして追加
              wikiEntries.push({
                id: `journals/${dateDir.name}`,
                title: `${dateDir.name}の作業記録`,
                description: `${dateDir.name}の作業記録`,
                category: 'journals',
                tags: {
                  type: ['date'],
                  date: [dateDir.name],
                },
              });

              // 各MDXファイルも個別にエントリとして追加
              for (const file of mdxFiles) {
                const filePath = join(datePath, file);
                const entryId = basename(file, '.mdx');
                // ファイル名から日付を除いた部分を使用
                const displayName = entryId.replace(/^\d{4}-\d{2}-\d{2}-/, '');

                try {
                  const content = readFileSync(filePath, 'utf-8');

                  // フロントマターから情報を抽出（簡易的な実装）
                  const titleMatch = content.match(/title:\s*(.+)/);
                  const descriptionMatch = content.match(/description:\s*(.+)/);
                  const tagsMatch = content.match(/tags:\s*(.+)/);
                  const thumbnailMatch = content.match(/thumbnail:\s*(.+)/);
                  const iconMatch = content.match(/icon:\s*(.+)/);

                  // タイトルがなければファイル名を整形して使用
                  const title =
                    titleMatch?.[1]?.trim() || displayName.replace(/-/g, ' ');
                  const description = descriptionMatch?.[1]?.trim() || '';
                  const thumbnail = thumbnailMatch?.[1]?.trim();
                  const icon = iconMatch?.[1]?.trim();

                  // タグを抽出（配列形式を想定）
                  const tags: {
                    tech?: string[];
                    type?: string[];
                    date?: string[];
                  } = { date: [dateDir.name] };

                  if (tagsMatch?.[1]) {
                    try {
                      // YAML形式のタグを解析（簡易実装）
                      const tagLine = tagsMatch[1].trim();
                      if (tagLine.startsWith('[') && tagLine.endsWith(']')) {
                        const tagArray = tagLine
                          .slice(1, -1)
                          .split(',')
                          .map((t) =>
                            t.trim().replace(/'/g, '').replace(/"/g, '')
                          );

                        tags.tech = tagArray;
                      }
                    } catch (e) {
                      console.error(`Error parsing tags for ${filePath}:`, e);
                    }
                  }

                  wikiEntries.push({
                    id: `journals/${dateDir.name}/${entryId}`,
                    title,
                    description,
                    category: 'journals',
                    thumbnail,
                    icon,
                    tags,
                    parentId: `journals/${dateDir.name}`, // 親ドキュメントへの参照
                  });
                } catch (error) {
                  console.error(`Error reading ${filePath}:`, error);
                  // エラーが発生しても処理を続行
                  wikiEntries.push({
                    id: `journals/${dateDir.name}/${entryId}`,
                    title: displayName.replace(/-/g, ' '),
                    description: '',
                    category: 'journals',
                    icon: undefined,
                    parentId: `journals/${dateDir.name}`, // 親ドキュメントへの参照
                  });
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error reading document types:', error);
  }

  // すべてのドキュメントタイプを結合
  return { categories: CATEGORIES, docTypes: [...docTypes, ...wikiEntries] };
}

// MDX処理関連の関数をエクスポート

// フロントマター関連の関数をエクスポート
export { DocFrontmatterSchema, generateTitleFromFilename } from './frontmatter';
