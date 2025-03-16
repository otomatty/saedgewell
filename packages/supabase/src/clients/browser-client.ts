/**
 * browser-client.ts
 *
 * このファイルはブラウザ環境（クライアントサイド）でSupabaseクライアントを初期化するための
 * 関数を提供します。
 *
 * 主な機能:
 * - ブラウザ環境に最適化されたSupabaseクライアントの作成
 * - 環境変数からSupabase URLと匿名キーを取得して使用
 * - 型安全なクライアントインスタンスの提供
 *
 * 処理の流れ:
 * 1. getSupabaseClientKeys()関数を呼び出して環境変数からSupabase URLと匿名キーを取得
 * 2. @supabase/ssrパッケージの createBrowserClient 関数を使用してクライアントを初期化
 * 3. ジェネリック型パラメータを使用して、型安全なクライアントを返す
 *    (デフォルトではDatabase型を使用するが、カスタム型も指定可能)
 *
 * 使用例:
 * ```
 * const supabase = getSupabaseBrowserClient();
 * const { data } = await supabase.from('table').select('*');
 * ```
 *
 * 注意点:
 * - このクライアントはブラウザ環境でのみ使用することを想定しています
 * - クライアントコンポーネント内でのみ使用可能です
 * - 環境変数 NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_ANON_KEY が
 *   設定されている必要があります
 */
import { createBrowserClient } from '@supabase/ssr';

import type { Database } from '../database.types';
import { getSupabaseClientKeys } from '../get-supabase-client-keys';

/**
 * @name getSupabaseBrowserClient
 * @description ブラウザで使用するためのSupabaseクライアントを取得します
 */
export function getSupabaseBrowserClient<GenericSchema = Database>() {
  const keys = getSupabaseClientKeys();

  return createBrowserClient<GenericSchema>(keys.url, keys.anonKey);
}
