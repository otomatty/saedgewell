import { join } from 'node:path';

/**
 * ドキュメントのルートディレクトリパス
 * プロジェクトルートからの相対パス
 */
export const DOC_ROOT_DIR = '.docs';

/**
 * プロジェクトルートのパス
 * 現在の環境での絶対パス
 */
export const PROJECT_ROOT = '/Users/sugaiakimasa/apps/saedgewell';

/**
 * ドキュメントのルートディレクトリの絶対パスを取得
 * @returns ドキュメントルートディレクトリの絶対パス
 */
export function getDocRootPath(): string {
  return join(PROJECT_ROOT, DOC_ROOT_DIR);
}

/**
 * コンテンツパスを取得する
 * @param paths パスセグメント
 * @returns 結合されたパス
 */
export function getContentPath(...paths: string[]): string {
  return join(getDocRootPath(), ...paths);
}
