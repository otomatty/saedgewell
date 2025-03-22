'use server';

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { cache } from 'react';
import type { DocFrontmatter } from '../../types/mdx';
import { DocFrontmatterSchema } from '../../lib/mdx/frontmatter';
import { remarkKeywordLinks } from '../../lib/mdx/remark-keyword-links';
import { getContentPath } from '../../config/paths';

// rehype-highlightの設定
const highlightOptions = {
  ignoreMissing: true,
  subset: false,
};

// MDXのシリアライズオプション
const serializeOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, [remarkKeywordLinks, { docType: 'docs' }]],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypeHighlight, highlightOptions],
    ],
    format: 'mdx' as const,
  },
  parseFrontmatter: true,
};

/**
 * ドキュメントのパラメータからMDXコンテンツを取得する
 * @param slug スラッグ配列
 * @returns フロントマターとMDXコード
 */
export async function getDocFromParams(slug: string[]): Promise<{
  frontmatter: DocFrontmatter;
  code: MDXRemoteSerializeResult;
}> {
  try {
    const doc = await getDocBySlug(slug);
    return doc;
  } catch (error) {
    console.error(`Error getting doc from params: ${slug.join('/')}`, error);
    throw new Error(`ドキュメントの取得に失敗しました: ${slug.join('/')}`);
  }
}

/**
 * スラッグからドキュメントを取得する
 * @param slug スラッグ配列
 * @returns フロントマターとMDXコード
 */
export const getDocBySlug = cache(async (slug: string[]) => {
  if (!slug || slug.length === 0) {
    throw new Error('スラッグが指定されていません');
  }

  // スラッグからファイルパスを構築
  const filePath = getContentPath(...slug);

  // ファイルが存在するか確認
  let fullPath = '';
  if (existsSync(`${filePath}.mdx`)) {
    fullPath = `${filePath}.mdx`;
  } else if (existsSync(`${filePath}.md`)) {
    fullPath = `${filePath}.md`;
  } else if (existsSync(filePath) && existsSync(join(filePath, 'index.mdx'))) {
    fullPath = join(filePath, 'index.mdx');
  } else if (existsSync(filePath) && existsSync(join(filePath, 'index.md'))) {
    fullPath = join(filePath, 'index.md');
  } else {
    throw new Error(`ドキュメントが見つかりません: ${filePath}`);
  }

  // ファイルを読み込む
  const fileContents = await readFile(fullPath, 'utf8');

  // フロントマターを解析
  const { content, data } = matter(fileContents);

  // フロントマターをバリデーション
  let frontmatter: DocFrontmatter;
  try {
    frontmatter = DocFrontmatterSchema.parse(data);
  } catch (error) {
    console.warn(`Invalid frontmatter in ${fullPath}:`, error);
    frontmatter = {
      title: slug[slug.length - 1] || '',
    };
  }

  // MDXをシリアライズ
  // @ts-expect-error - 型の互換性の問題を無視
  const code = await serialize(content, {
    ...serializeOptions,
    scope: frontmatter as Record<string, unknown>,
  });

  return {
    frontmatter,
    code,
  };
});

/**
 * ドキュメントのパスを取得する
 * @param docType ドキュメントタイプ
 * @param slug スラッグ
 * @returns ドキュメントパス
 */
export async function getDocPath(
  docType: string,
  slug?: string
): Promise<string> {
  if (!slug) return `/${docType}`;
  return `/${docType}/${slug}`;
}

/**
 * ドキュメントのURLを取得する
 * @param docType ドキュメントタイプ
 * @param slug スラッグ
 * @returns ドキュメントURL
 */
export async function getDocUrl(
  docType: string,
  slug?: string
): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
  return `${baseUrl}${await getDocPath(docType, slug)}`;
}

/**
 * ドキュメントのタイトルを取得する
 * @param slug スラッグ配列
 * @returns ドキュメントタイトル
 */
export async function getDocTitle(slug: string[]): Promise<string> {
  try {
    const { frontmatter } = await getDocBySlug(slug);
    return frontmatter.title || slug[slug.length - 1] || '';
  } catch (error) {
    return slug[slug.length - 1] || '';
  }
}

/**
 * ドキュメントのメタデータを取得する
 * @param slug スラッグ配列
 * @returns ドキュメントメタデータ
 */
export async function getDocMetadata(slug: string[]): Promise<DocFrontmatter> {
  try {
    const { frontmatter } = await getDocBySlug(slug);
    return frontmatter;
  } catch (error) {
    return {
      title: slug[slug.length - 1] || '',
    };
  }
}

/**
 * ドキュメントの存在を確認する
 * @param slug スラッグ配列
 * @returns ドキュメントが存在するか
 */
export async function doesDocExist(slug: string[]): Promise<boolean> {
  if (!slug || slug.length === 0) {
    return false;
  }

  // スラッグからファイルパスを構築
  const filePath = getContentPath(...slug);

  // ファイルが存在するか確認
  return (
    existsSync(`${filePath}.mdx`) ||
    existsSync(`${filePath}.md`) ||
    (existsSync(filePath) && existsSync(join(filePath, 'index.mdx'))) ||
    (existsSync(filePath) && existsSync(join(filePath, 'index.md')))
  );
}

/**
 * ドキュメントのコンテンツを取得する
 * @param slug スラッグ配列
 * @returns ドキュメントコンテンツ
 */
export async function getDocContent(slug: string[]): Promise<string> {
  if (!slug || slug.length === 0) {
    throw new Error('スラッグが指定されていません');
  }

  // スラッグからファイルパスを構築
  const filePath = getContentPath(...slug);

  // ファイルが存在するか確認
  let fullPath = '';
  if (existsSync(`${filePath}.mdx`)) {
    fullPath = `${filePath}.mdx`;
  } else if (existsSync(`${filePath}.md`)) {
    fullPath = `${filePath}.md`;
  } else if (existsSync(filePath) && existsSync(join(filePath, 'index.mdx'))) {
    fullPath = join(filePath, 'index.mdx');
  } else if (existsSync(filePath) && existsSync(join(filePath, 'index.md'))) {
    fullPath = join(filePath, 'index.md');
  } else {
    throw new Error(`ドキュメントが見つかりません: ${filePath}`);
  }

  // ファイルを読み込む
  const fileContents = await readFile(fullPath, 'utf8');

  // フロントマターを解析
  const { content } = matter(fileContents);

  return content;
}
