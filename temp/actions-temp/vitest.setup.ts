import { beforeAll, afterAll, vi } from "vitest";

// グローバルなモックの設定
beforeAll(() => {
	// 環境変数のモック
	vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://test.example.com");
	vi.stubEnv("NEXT_PUBLIC_DEV_URL", "http://localhost:3000");
	vi.stubEnv("NEXT_PUBLIC_PROD_URL", "https://test.example.com");
	vi.stubEnv("NODE_ENV", "test");

	// Supabase関連の環境変数
	vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co");
	vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key");

	// Gemini API関連の環境変数
	vi.stubEnv("NEXT_PUBLIC_GEMINI_API_KEY", "test-gemini-api-key");

	// next/headersのモック
	vi.mock("next/headers", () => {
		// requestAsyncStorageのモック実装
		const mockCookies = {
			getAll: vi.fn().mockReturnValue([]),
			get: vi.fn().mockReturnValue(null),
			set: vi.fn(),
		};

		// AsyncLocalStorageのモック
		const asyncLocalStorage = {
			getStore: vi.fn().mockReturnValue({
				cookies: mockCookies,
			}),
		};

		return {
			cookies: vi.fn().mockImplementation(() => mockCookies),
			// Next.js内部で使用されるrequestAsyncStorageをエクスポート
			requestAsyncStorage: asyncLocalStorage,
			// その他必要なヘッダー関連の関数
			headers: vi.fn().mockReturnValue(new Headers()),
		};
	});

	// @saedgewell/lib/serverのモック
	vi.mock("@saedgewell/lib/server", async () => {
		const mockSupabaseClient = {
			auth: {
				signInWithOAuth: vi.fn().mockResolvedValue({
					data: { url: "https://example.com/auth" },
					error: null,
				}),
				signOut: vi.fn().mockResolvedValue({ error: null }),
				getUser: vi
					.fn()
					.mockResolvedValue({ data: { user: null }, error: null }),
			},
			from: vi.fn().mockImplementation((table) => ({
				select: vi.fn().mockReturnThis(),
				insert: vi.fn().mockReturnThis(),
				update: vi.fn().mockReturnThis(),
				delete: vi.fn().mockReturnThis(),
				eq: vi.fn().mockReturnThis(),
				or: vi.fn().mockReturnThis(),
				range: vi.fn().mockReturnThis(),
				order: vi.fn().mockReturnThis(),
				single: vi.fn().mockResolvedValue({ data: null, error: null }),
				execute: vi.fn().mockResolvedValue({ data: null, error: null }),
			})),
			rpc: vi.fn().mockResolvedValue({ data: null, error: null }),
		};

		return {
			createClient: vi.fn().mockReturnValue(mockSupabaseClient),
			getSupabaseConfig: vi.fn().mockReturnValue({
				url: "https://test.supabase.co",
				anonKey: "test-anon-key",
			}),
		};
	});

	// next/cacheのモック
	vi.mock("next/cache", () => {
		return {
			revalidatePath: vi.fn(),
		};
	});

	// next/navigationのモック
	vi.mock("next/navigation", () => {
		return {
			redirect: vi.fn(),
		};
	});
});

// テスト終了時のクリーンアップ
afterAll(() => {
	vi.unstubAllEnvs();
	vi.resetAllMocks();
});
