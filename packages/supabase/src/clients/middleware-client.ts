/**
 * middleware-client.ts
 *
 * このファイルはNext.jsのミドルウェア内でSupabaseクライアントを初期化するための
 * 関数を提供します。
 *
 * 主な機能:
 * - ミドルウェア環境に最適化されたSupabaseクライアントの作成
 * - NextRequestとNextResponseオブジェクトを使用したクッキー管理
 * - 型安全なクライアントインスタンスの提供
 *
 * 処理の流れ:
 * 1. 'server-only'パッケージをインポートして、このコードがクライアントサイドに
 *    バンドルされることを防止
 * 2. NextRequestとNextResponseオブジェクトを引数として受け取る
 * 3. getSupabaseClientKeys()関数を呼び出して環境変数からSupabase URLと匿名キーを取得
 * 4. @supabase/ssrパッケージの createServerClient 関数を使用してクライアントを初期化
 * 5. NextRequestとNextResponseオブジェクトを使用してクッキーの取得と設定を行う
 *    カスタムハンドラを提供
 *    - getAll(): requestからすべてのクッキーを取得
 *    - setAll(): 新しいクッキーをrequestとresponseの両方に設定
 * 6. ジェネリック型パラメータを使用して、型安全なクライアントを返す
 *
 * 特記事項:
 * - クッキーの設定は、requestとresponseの両方に対して行われます。これは、
 *   現在のリクエスト処理中にクッキーを読み取れるようにするためと、
 *   レスポンスでクライアントにクッキーを送信するためです。
 *
 * 使用例:
 * ```
 * // middleware.ts内で
 * export async function middleware(request: NextRequest) {
 *   const response = NextResponse.next();
 *   const supabase = createMiddlewareClient(request, response);
 *
 *   // セッションの確認など
 *   const { data: { session } } = await supabase.auth.getSession();
 *
 *   return response;
 * }
 * ```
 *
 * 注意点:
 * - このクライアントはNext.jsのミドルウェア内でのみ使用することを想定しています
 * - 環境変数 NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_ANON_KEY が
 *   設定されている必要があります
 */
import 'server-only';

import type { NextRequest, NextResponse } from 'next/server';

import { createServerClient } from '@supabase/ssr';

import type { Database } from '../database.types';
import { getSupabaseClientKeys } from '../get-supabase-client-keys';

/**
 * Supabase用のミドルウェアクライアントを作成します。
 *
 * @param {NextRequest} request - Next.jsのリクエストオブジェクト。
 * @param {NextResponse} response - Next.jsのレスポンスオブジェクト。
 */
export function createMiddlewareClient<GenericSchema = Database>(
  request: NextRequest,
  response: NextResponse
) {
  const keys = getSupabaseClientKeys();

  return createServerClient<GenericSchema>(keys.url, keys.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }

        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });
}
