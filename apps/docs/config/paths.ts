import { join } from 'node:path';

/**
 * ドキュメントのルートディレクトリパス
 * プロジェクトルートからの相対パス
 */
export const DOC_ROOT_DIR = '.docs';

/**
 * ドキュメントのルートディレクトリの絶対パスを取得
 * @returns ドキュメントルートディレクトリの絶対パス
 */
export function getDocRootPath(): string {
  // process.cwd()はプロジェクトルートを指すので、そこからの相対パスで.docsディレクトリを指定
  return join(process.cwd(), DOC_ROOT_DIR);
}

/**
 * コンテンツパスを取得する
 * @param paths パスセグメント
 * @returns 結合されたパス
 */
export function getContentPath(...paths: string[]): string {
  return join(getDocRootPath(), ...paths);
}
