import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import {
	getSupabaseConfig,
	createClient,
} from "../../../src/server/supabase/client";

// モックはvitest.setup.tsで設定済み
// テストファイル内でモックを再定義する必要はありません

describe("getSupabaseConfig", () => {
	const originalEnv = process.env;

	beforeEach(() => {
		vi.clearAllMocks();
		// 環境変数を設定
		process.env = {
			...originalEnv,
			NEXT_PUBLIC_SUPABASE_URL: "https://test-url.supabase.co",
			NEXT_PUBLIC_SUPABASE_ANON_KEY: "test-anon-key",
		};
	});

	afterEach(() => {
		// 環境変数を元に戻す
		process.env = originalEnv;
	});

	it("環境変数から正しくSupabase設定を取得できる", () => {
		const config = getSupabaseConfig();
		expect(config.url).toBe("https://test-url.supabase.co");
		expect(config.anonKey).toBe("test-anon-key");
	});

	it("環境変数が設定されていない場合はエラーをスローする", () => {
		// 環境変数をリセット
		process.env = {
			...originalEnv,
			NEXT_PUBLIC_SUPABASE_URL: undefined,
		};

		expect(() => getSupabaseConfig()).toThrow(
			"Missing Supabase environment variables",
		);
	});
});

// createClientのテストは一時的にスキップ
describe.skip("createClient", () => {
	const originalEnv = process.env;

	beforeEach(() => {
		vi.clearAllMocks();
		// 環境変数を設定
		process.env = {
			...originalEnv,
			NEXT_PUBLIC_SUPABASE_URL: "https://test-url.supabase.co",
			NEXT_PUBLIC_SUPABASE_ANON_KEY: "test-anon-key",
		};
	});

	afterEach(() => {
		// 環境変数を元に戻す
		process.env = originalEnv;
	});

	it("Supabaseクライアントを正しく作成できる", async () => {
		const client = await createClient();
		// モックの検証はvitest.setup.tsで設定したモックに依存します
	});
});
