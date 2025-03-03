import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// 環境変数を設定
const originalEnv = process.env;
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test-url.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";

// モックの設定
const mockClient = {
	from: vi.fn(),
	select: vi.fn(),
	eq: vi.fn(),
	single: vi.fn(),
	supabaseUrl: "https://test-url.supabase.co",
	supabaseKey: "test-anon-key",
	auth: { getUser: vi.fn() },
	realtime: {},
	// 他の必要なプロパティを追加
} as unknown as supabaseJs.SupabaseClient<unknown>;

// createClientのモック
import * as supabaseJs from "@supabase/supabase-js";
vi.spyOn(supabaseJs, "createClient").mockReturnValue(mockClient);

// モジュールをインポート
import { getDbClient, db } from "../../../src/server/supabase/db";

describe("getDbClient", () => {
	beforeEach(() => {
		// モックをリセット
		vi.clearAllMocks();
	});

	afterEach(() => {
		// 環境変数を元に戻す
		process.env = originalEnv;
	});

	it("データベースクライアントを正しく作成できる", () => {
		const client = getDbClient();
		expect(client).toBeDefined();
	});

	it("同じインスタンスを再利用する", () => {
		// 最初の呼び出し
		const client1 = getDbClient();

		// 2回目の呼び出し
		const client2 = getDbClient();

		// 同じインスタンスが返されることを確認
		expect(client1).toBe(client2);
	});

	it("db.clientでクライアントにアクセスできる", () => {
		const client = db.client;
		expect(client).toBeDefined();
	});
});
