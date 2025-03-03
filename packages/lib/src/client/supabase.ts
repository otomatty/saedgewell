/**
 * クライアントサイド用のSupabaseクライアント
 */
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@saedgewell/types";

// 環境変数からSupabaseの設定を取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 環境変数が設定されていない場合はエラーをスロー
if (!supabaseUrl || !supabaseAnonKey) {
	if (typeof window !== "undefined") {
		console.error("Missing Supabase environment variables");
	}
}

// クライアントサイド用のSupabaseクライアントを作成
export const supabaseClient =
	supabaseUrl && supabaseAnonKey
		? createClient<Database>(supabaseUrl, supabaseAnonKey, {
				auth: {
					persistSession: true,
					autoRefreshToken: true,
				},
			})
		: null;

// 型付きのSupabaseクライアントをエクスポート
export type SupabaseClient = typeof supabaseClient;
