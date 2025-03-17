import { z } from 'zod';

/**
 * MDXファイルのフロントマターのスキーマ定義
 * titleが未定義の場合はファイル名から生成します
 */
export const DocFrontmatterSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  order: z.number().default(9999),
});

/**
 * ファイル名からタイトルを生成する
 * @param filename ファイル名
 * @returns 生成されたタイトル
 */
export function generateTitleFromFilename(filename: string): string {
  return filename
    .replace(/\.mdx$/, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
