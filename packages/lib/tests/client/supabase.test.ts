import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// 環境変数を設定
const originalEnv = process.env;
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test-url.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";

// モジュールのモック
import * as supabaseJs from "@supabase/supabase-js";
import type { Database } from "@saedgewell/types";

// モックの設定
const mockSupabaseClient = {
	auth: {
		getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
		signInWithPassword: vi.fn(),
		signOut: vi.fn(),
	},
};

vi.spyOn(supabaseJs, "createClient").mockReturnValue(
	mockSupabaseClient as unknown as supabaseJs.SupabaseClient<unknown>,
);

// モジュールをインポート（環境変数設定後）
import { supabaseClient } from "../../src/client/supabase";

describe("supabaseClient", () => {
	const originalWindow = global.window;

	beforeEach(() => {
		// windowオブジェクトをモック
		global.window = {} as Window & typeof globalThis;

		// モックをリセット
		vi.clearAllMocks();
	});

	afterEach(() => {
		// windowオブジェクトを元に戻す
		global.window = originalWindow;
		// 環境変数を元に戻す
		process.env = originalEnv;
	});

	it("Supabaseクライアントが正しく初期化されている", () => {
		expect(supabaseClient).toBeDefined();
	});
});
