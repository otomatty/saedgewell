import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { cache } from 'react';
import type { DocFrontmatter } from './types';
import { DocFrontmatterSchema } from './frontmatter';
import { getDocTree } from './doc-tree';
import { getKeywordIndex } from './keyword-index';
import { remarkKeywordLinks } from './remark-keyword-links';
import { devConfig, prodConfig } from './cache';

// rehype-highlightの設定
const highlightOptions = {
  ignoreMissing: true, // 未知の言語を無視
  subset: false, // すべての言語を含める
  aliases: {
    js: 'javascript',
    ts: 'typescript',
    jsx: 'javascript',
    tsx: 'typescript',
    md: 'markdown',
    mdx: 'markdown',
    mermaid: 'mermaid', // Mermaidを明示的に追加
  },
};

/**
 * スラグからドキュメントを取得する
 * @param slug ドキュメントのスラグ
 * @returns フロントマターとMDXコード
 */
export async function getDocFromParams(slug: string[]): Promise<{
  frontmatter: DocFrontmatter;
  code: MDXRemoteSerializeResult;
}> {
  if (!Array.isArray(slug) || slug.length === 0) {
    throw new Error('Invalid slug parameter');
  }

  const [docType, ...validPathSegments] = slug;

  // ファイルパスの構築
  const pathSegments = [docType, ...validPathSegments];
  const filePath = `${join(
    process.cwd(),
    'contents',
    ...(docType ? [docType, ...validPathSegments] : validPathSegments)
  )}.mdx`;
  const indexPath = join(
    process.cwd(),
    'contents',
    ...(docType ? [docType, ...validPathSegments] : validPathSegments),
    'index.mdx'
  );

  let targetPath = filePath;

  // index.mdxが存在する場合はそちらを使用
  if (!existsSync(filePath)) {
    if (!existsSync(indexPath)) {
      throw new Error('Not found');
    }
    targetPath = indexPath;
  }

  try {
    const source = await readFile(targetPath, 'utf-8');

    // フロントマターを事前に解析
    const { data: frontmatter, content: mdxContent } = matter(source);

    try {
      // 問題のある可能性のあるMDXコンテンツを前処理
      const processedContent = mdxContent;

      // キーワードインデックスを構築
      const docTree = getDocTree();
      const { index, duplicates } = getKeywordIndex(
        docTree,
        process.env.NODE_ENV === 'development' ? devConfig : prodConfig
      );

      // 重複エラーのチェック（警告として表示）
      if (duplicates.length > 0) {
        const errorMessage = duplicates
          .map(
            (d) =>
              `タイトル "${d.title}" が複数のファイルで使用されています: ${d.occurrences.map((o) => o.path).join(', ')}`
          )
          .join('\n');
        console.warn(`重複したタイトルが見つかりました:\n${errorMessage}`);
      }

      // rehypeHighlightを最小限の設定で使用
      const mdxSource = await serialize(processedContent, {
        mdxOptions: {
          development: process.env.NODE_ENV === 'development',
          remarkPlugins: [
            remarkGfm,
            [remarkKeywordLinks, index], // キーワードリンクプラグインを追加
          ],
          // rehype-highlightとrehype-mermaidを使用
          rehypePlugins: [[rehypeHighlight, highlightOptions]],
          format: 'mdx',
        },
        // コンポーネントのスコープ内で使用できる値
        scope: {},
      });

      return {
        frontmatter: DocFrontmatterSchema.parse(frontmatter),
        code: mdxSource,
      };
    } catch (error) {
      console.error('❌ Error processing MDX file:', error);
      if (error instanceof Error) {
        console.log('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
      }

      // フォールバック: 簡易的なHTMLを返す
      console.log('⚠️ Returning fallback content');

      // エラー表示用のシンプルなMDXコンテンツを作成
      const fallbackMdx = `
# ${frontmatter.title || 'Content Error'}

MDXコンテンツの処理中にエラーが発生しました。管理者にお問い合わせください。

\`\`\`
${error instanceof Error ? error.message : 'Unknown error'}
\`\`\`
      `;

      // フォールバックコンテンツをシリアライズ
      const fallbackSource = await serialize(fallbackMdx);

      return {
        frontmatter: DocFrontmatterSchema.parse(frontmatter),
        code: fallbackSource,
      };
    }
  } catch (error) {
    console.log('❌ Error in getDocFromParams:', error);
    throw error;
  }
}

/**
 * MDXファイルを処理して、フロントマターとコンテンツを取得する関数
 * @param source MDXソース
 * @returns シリアライズされたMDX
 */
export const processMDX = cache(
  async (source: string): Promise<MDXRemoteSerializeResult> => {
    try {
      // フロントマターを解析
      const { content: processedContent } = matter(source);

      try {
        // rehypeHighlightを最小限の設定で使用
        const mdxSource = await serialize(processedContent, {
          mdxOptions: {
            development: process.env.NODE_ENV === 'development',
            remarkPlugins: [remarkGfm],
            // rehype-highlightとrehype-mermaidを使用
            rehypePlugins: [[rehypeHighlight, highlightOptions]],
            format: 'mdx',
          },
          // コンポーネントのスコープ内で使用できる値
          scope: {},
        });

        return mdxSource;
      } catch (serializeError) {
        console.error(
          'MDXのシリアライズ中にエラーが発生しました:',
          serializeError
        );
        throw serializeError;
      }
    } catch (error) {
      console.error('MDXの処理中にエラーが発生しました:', error);
      throw error;
    }
  }
);
