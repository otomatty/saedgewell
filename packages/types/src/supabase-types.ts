/**
 * Supabaseの型定義をエクスポートするラッパーファイル
 * supabase.d.tsからの型定義を再エクスポートします
 */

// supabase.d.tsからの型定義をインポート
// 注意: 実際のsupabase.d.tsの内容に合わせて調整してください
import type { Database } from "./supabase";

// 型定義をエクスポート
export type { Database };

// データベースのテーブル型を抽出
export type Tables = Database["public"]["Tables"];

// 各テーブルの行の型を抽出
export type TablesRow<T extends keyof Tables> = Tables[T]["Row"];

// 各テーブルの挿入型を抽出
export type TablesInsert<T extends keyof Tables> = Tables[T]["Insert"];

// 各テーブルの更新型を抽出
export type TablesUpdate<T extends keyof Tables> = Tables[T]["Update"];

// ヘルパー関数の型
export type SupabaseHelperTypes = {
	Tables: Tables;
	TablesRow: TablesRow<keyof Tables>;
	TablesInsert: TablesInsert<keyof Tables>;
	TablesUpdate: TablesUpdate<keyof Tables>;
};
