import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { updateSession } from "../../../src/server/supabase/middleware";
import { NextRequest, NextResponse } from "next/server";
import * as ssr from "@supabase/ssr";

// モックの設定
const mockRedirect = vi.fn();
const mockNextResponse = {
	cookies: {
		get: vi.fn(),
		getAll: vi.fn(),
		set: vi.fn(),
		delete: vi.fn(),
		has: vi.fn(),
	},
	headers: {
		append: vi.fn(),
		delete: vi.fn(),
		get: vi.fn(),
		has: vi.fn(),
		set: vi.fn(),
	},
};
const mockNext = vi.fn().mockReturnValue(mockNextResponse);

// NextResponseのモック
vi.spyOn(NextResponse, "redirect").mockImplementation(mockRedirect);
vi.spyOn(NextResponse, "next").mockImplementation(mockNext);

// createServerClientのモック
const mockGetUser = vi.fn().mockResolvedValue({ data: { user: null } });

// createServerClientのモックを取得
const mockCreateServerClient = vi.fn();
vi.spyOn(ssr, "createServerClient").mockImplementation(mockCreateServerClient);

describe("updateSession", () => {
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
		mockRedirect.mockClear();
		mockNext.mockClear();

		// createServerClientのモックを設定
		mockCreateServerClient.mockImplementation((url, key, options) => {
			// setAllが呼び出されたときにmockNextを呼び出す
			if (options?.cookies?.setAll) {
				options.cookies.setAll([{ name: "test", value: "test" }]);
			}
			return {
				auth: {
					getUser: mockGetUser,
				},
			};
		});
	});

	afterEach(() => {
		// 環境変数を元に戻す
		process.env = originalEnv;
	});

	it("環境変数が設定されていない場合はエラーをスローする", async () => {
		// 環境変数をリセット
		process.env = {
			...originalEnv,
			NEXT_PUBLIC_SUPABASE_URL: undefined,
		};

		const request = new NextRequest("https://example.com/dashboard");
		await expect(updateSession(request)).rejects.toThrow(
			"Missing Supabase environment variables",
		);
	});

	it("認証済みユーザーの場合、NextResponseを返す", async () => {
		// 認証済みユーザーをモック
		const mockUser = { id: "test-user-id" };
		mockGetUser.mockResolvedValueOnce({ data: { user: mockUser } });

		// NextResponse.nextが値を返すことを確認
		mockNext.mockReturnValue(mockNextResponse);

		const request = new NextRequest("https://example.com/dashboard");
		const response = await updateSession(request);

		expect(mockNext).toHaveBeenCalled();
		expect(response).toBeDefined();
	});

	it("未認証ユーザーが保護されたパスにアクセスする場合、リダイレクトする", async () => {
		// 未認証ユーザーをモック
		mockGetUser.mockResolvedValueOnce({ data: { user: null } });
		mockRedirect.mockReturnValueOnce("redirected");

		const request = new NextRequest("https://example.com/dashboard");
		const response = await updateSession(request);

		expect(mockRedirect).toHaveBeenCalled();
	});

	it("未認証ユーザーが公開パスにアクセスする場合、リダイレクトしない", async () => {
		// 未認証ユーザーをモック
		mockGetUser.mockResolvedValueOnce({ data: { user: null } });

		// NextResponse.nextが値を返すことを確認
		mockNext.mockReturnValue(mockNextResponse);

		const request = new NextRequest("https://example.com/login");
		const response = await updateSession(request);

		expect(mockRedirect).not.toHaveBeenCalled();
		expect(response).toBeDefined();
	});
});
