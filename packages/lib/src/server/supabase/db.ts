import { createClient } from "@supabase/supabase-js";
import type { Database } from "@saedgewell/types";

// 環境変数を取得する関数
function getDbConfig() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error("Missing Supabase environment variables");
	}

	return { supabaseUrl, supabaseAnonKey };
}

// 遅延初期化でクライアントを作成
let dbClient: ReturnType<typeof createClient<Database>> | null = null;

export function getDbClient() {
	// すでに初期化されている場合はそれを返す
	if (dbClient) return dbClient;

	// 初期化されていない場合は新しく作成
	const { supabaseUrl, supabaseAnonKey } = getDbConfig();
	dbClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
	return dbClient;
}

// 後方互換性のために既存のエクスポートを維持
export const db = {
	get client() {
		return getDbClient();
	},
};
