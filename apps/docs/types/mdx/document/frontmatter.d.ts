/**
 * フロントマター関連の型定義
 */

/**
 * ドキュメントのフロントマター
 */
export interface DocFrontmatter {
  /** タイトル */
  title?: string;
  /** 説明 */
  description?: string;
  /** 表示順序 */
  order?: number;
  /** キーワード */
  keywords?: string[];
}
