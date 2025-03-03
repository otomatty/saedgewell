import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { isServer, getEnv } from "../../src/shared/utils";

describe("isServer", () => {
	const originalWindow = global.window;

	beforeEach(() => {
		// テスト前の準備
		vi.clearAllMocks();
	});

	afterEach(() => {
		// windowオブジェクトを元に戻す
		if (originalWindow === undefined) {
			global.window = undefined as unknown as Window & typeof globalThis;
		} else {
			global.window = originalWindow;
		}
	});

	it("サーバーサイドの場合はtrueを返す", () => {
		global.window = undefined as unknown as Window & typeof globalThis;
		expect(isServer()).toBe(true);
	});

	it("クライアントサイドの場合はfalseを返す", () => {
		global.window = {} as Window & typeof globalThis;
		expect(isServer()).toBe(false);
	});
});

describe("getEnv", () => {
	const originalEnv = process.env;
	const originalWindow = global.window;

	beforeEach(() => {
		// テスト前の準備
		vi.clearAllMocks();
		process.env = {
			...originalEnv,
			TEST_SERVER_ENV: "server-value",
			NEXT_PUBLIC_TEST_ENV: "public-value",
		};
	});

	afterEach(() => {
		process.env = originalEnv;
		// windowオブジェクトを元に戻す
		if (originalWindow === undefined) {
			global.window = undefined as unknown as Window & typeof globalThis;
		} else {
			global.window = originalWindow;
		}
	});

	it("サーバーサイドでは全ての環境変数にアクセスできる", () => {
		global.window = undefined as unknown as Window & typeof globalThis;
		expect(getEnv("TEST_SERVER_ENV")).toBe("server-value");
		expect(getEnv("NEXT_PUBLIC_TEST_ENV")).toBe("public-value");
	});

	it("クライアントサイドではNEXT_PUBLIC_プレフィックスの環境変数のみアクセスできる", () => {
		global.window = {} as Window & typeof globalThis;
		expect(getEnv("NEXT_PUBLIC_TEST_ENV")).toBe("public-value");
		expect(getEnv("TEST_SERVER_ENV")).toBe("");
	});

	it("環境変数が存在しない場合はデフォルト値を返す", () => {
		expect(getEnv("NON_EXISTENT_ENV", "default-value")).toBe("default-value");
	});
});
