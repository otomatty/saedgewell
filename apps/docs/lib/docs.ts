import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';
import { cache } from 'react';
import { readFile } from 'node:fs/promises';
import { bundleMDX } from 'mdx-bundler';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

// rehype-pretty-codeのノード型定義
interface PrettyCodeNode {
  children: Array<{ type: string; value: string }>;
  properties: {
    className: string[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

const DocFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  order: z.number().optional(),
});

export type DocFrontmatter = z.infer<typeof DocFrontmatterSchema>;

export interface DocNode {
  title: string;
  description?: string;
  slug: string;
  order?: number;
  children: DocNode[];
}

const docTreeCache = new Map<string, { data: DocNode[]; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5分

export function getDocTree(contentDir = 'contents/docs'): DocNode[] {
  // キャッシュチェック
  const cached = docTreeCache.get(contentDir);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const baseDir = process.cwd();
  const docsDir = join(baseDir, contentDir);

  function buildTree(dir: string, parentSlug = ''): DocNode[] {
    try {
      const items = readdirSync(dir, { withFileTypes: true });
      const nodes: DocNode[] = [];

      for (const item of items) {
        if (item.name.startsWith('.')) continue;

        const path = join(dir, item.name);
        const slug = parentSlug ? `${parentSlug}/${item.name}` : item.name;

        try {
          if (item.isDirectory()) {
            const indexPath = join(path, 'index.mdx');
            const indexContent = readFileSync(indexPath, 'utf-8');
            const { data } = matter(indexContent);
            const frontmatter = DocFrontmatterSchema.parse(data);

            nodes.push({
              ...frontmatter,
              slug: slug.replace(/\\/g, '/'),
              children: buildTree(path, slug),
            });
          } else if (item.name.endsWith('.mdx')) {
            const content = readFileSync(path, 'utf-8');
            const { data } = matter(content);
            const frontmatter = DocFrontmatterSchema.parse(data);

            nodes.push({
              ...frontmatter,
              slug: slug.replace(/\\/g, '/').replace(/\.mdx$/, ''),
              children: [],
            });
          }
        } catch (error) {
          if (error instanceof z.ZodError) {
            console.error(`Invalid frontmatter in ${path}:`, error.errors);
          } else {
            console.warn(`Warning: ${path} not found or invalid:`, error);
          }
          // フォールバック：基本的なノード情報を返す
          if (item.isDirectory()) {
            nodes.push({
              title: item.name,
              slug: slug.replace(/\\/g, '/'),
              order: 0,
              children: buildTree(path, slug),
            });
          }
        }
      }

      return nodes.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    } catch (error) {
      console.error(`Error processing directory ${dir}:`, error);
      return [];
    }
  }

  const result = buildTree(docsDir);

  // キャッシュを更新
  docTreeCache.set(contentDir, { data: result, timestamp: Date.now() });

  return result;
}

// シンタックスハイライトの設定
const prettyCodeOptions = {
  theme: 'github-dark',
  keepBackground: true,
  defaultLang: 'plaintext',
  // mermaidコードブロックは処理しない設定を削除
  // filterMetaString: (meta: string) => !meta.includes('mermaid'),
  // getHighlighter関数を削除（シリアライズ可能なオプションのみを使用）
};

export const getDocFromParams = cache(async (slug: string[]) => {
  try {
    const docPath = `${join(process.cwd(), 'contents/docs', ...slug)}.mdx`;

    try {
      const source = await readFile(docPath, 'utf-8');
      const { code, frontmatter } = await bundleMDX({
        source,
        esbuildOptions: (options) => {
          options.target = ['es2020'];
          return options;
        },
        mdxOptions(options) {
          options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
          options.rehypePlugins = [
            ...(options.rehypePlugins ?? []),
            [rehypePrettyCode, prettyCodeOptions],
          ];
          return options;
        },
      });

      const parsedFrontmatter = DocFrontmatterSchema.safeParse(frontmatter);

      if (!parsedFrontmatter.success) {
        console.error(
          `Invalid frontmatter in ${docPath}:`,
          parsedFrontmatter.error
        );
        return null;
      }

      return {
        content: code,
        frontmatter: parsedFrontmatter.data,
      };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        console.error(`File not found: ${docPath}`);
        return null;
      }
      throw error;
    }
  } catch (error) {
    console.error('Error in getDocFromParams:', error);
    throw error;
  }
});
