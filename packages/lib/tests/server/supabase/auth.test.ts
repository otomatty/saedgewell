import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getUser } from "../../../src/server/supabase/auth";

// モックの設定
const mockGetUser = vi.fn();
const mockCreateClient = vi.fn().mockReturnValue({
	auth: {
		getUser: mockGetUser,
	},
});

// モジュールのモック
import * as clientModule from "../../../src/server/supabase/client";
vi.spyOn(clientModule, "createClient").mockImplementation(mockCreateClient);

describe("getUser", () => {
	const originalEnv = process.env;

	beforeEach(() => {
		// 環境変数を設定
		process.env = {
			...originalEnv,
			NEXT_PUBLIC_SUPABASE_URL: "https://test-url.supabase.co",
			NEXT_PUBLIC_SUPABASE_ANON_KEY: "test-anon-key",
		};

		// モックをリセット
		vi.clearAllMocks();

		// デフォルトでは認証済みユーザーを返す
		mockGetUser.mockResolvedValue({
			data: {
				user: { id: "test-user-id", email: "test@example.com" },
			},
		});
	});

	afterEach(() => {
		// 環境変数を元に戻す
		process.env = originalEnv;
	});

	it("認証済みユーザーの情報を正しく取得する", async () => {
		const user = await getUser();
		expect(mockCreateClient).toHaveBeenCalled();
		expect(mockGetUser).toHaveBeenCalled();
		expect(user).toEqual({ id: "test-user-id", email: "test@example.com" });
	});

	it("未認証の場合はnullを返す", async () => {
		// 未認証ユーザーをモック
		mockGetUser.mockResolvedValue({ data: { user: null } });

		const user = await getUser();
		expect(mockCreateClient).toHaveBeenCalled();
		expect(mockGetUser).toHaveBeenCalled();
		expect(user).toBeNull();
	});

	it("エラーが発生した場合は例外をスローする", async () => {
		// エラーをモック
		mockGetUser.mockRejectedValue(new Error("Authentication error"));

		await expect(getUser()).rejects.toThrow("Authentication error");
		expect(mockCreateClient).toHaveBeenCalled();
		expect(mockGetUser).toHaveBeenCalled();
	});
});
