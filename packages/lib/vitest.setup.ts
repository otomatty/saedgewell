import { vi, expect, beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

// モジュールのモックを設定
// 注意: vi.mockはファイルの先頭で呼び出す必要があります
vi.mock("next/headers", () => ({
	cookies: () => ({
		getAll: () => [{ name: "test-cookie", value: "test-value" }],
		set: vi.fn(),
		get: vi.fn(),
		remove: vi.fn(),
	}),
}));

vi.mock("@supabase/ssr", () => ({
	createServerClient: vi.fn(() => ({
		auth: {
			getUser: vi
				.fn()
				.mockResolvedValue({ data: { user: { id: "test-user-id" } } }),
		},
		from: vi.fn(() => ({
			select: vi.fn(() => ({
				eq: vi.fn(() => ({
					single: vi.fn(() => Promise.resolve({ data: {}, error: null })),
				})),
			})),
		})),
	})),
}));

// vitestのグローバル関数をエクスポート
// @ts-expect-error - グローバルにviを追加
globalThis.vi = vi;

// Supabase環境変数のモック設定
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";

// windowオブジェクトのモック
global.window = global.window || {};

// テスト間でモックをリセットする
beforeEach(() => {
	vi.resetAllMocks();
});
