/**
 * クライアントとサーバーで共有されるユーティリティ関数
 */
// TODO: @saedgewell/utilsパッケージからisServer関数をインポートする
// import { isServer } from "@saedgewell/utils";

/**
 * サーバーサイドかどうかを判定する関数
 * @returns サーバーサイドならtrue、クライアントサイドならfalse
 */
export function isServer(): boolean {
	return typeof window === "undefined";
}

/**
 * 環境変数を取得する関数
 * @param key 環境変数のキー
 * @param defaultValue デフォルト値
 * @returns 環境変数の値またはデフォルト値
 */
export function getEnv(key: string, defaultValue = ""): string {
	if (isServer()) {
		return process.env[key] || defaultValue;
	}

	// クライアントサイドでは、NEXT_PUBLIC_プレフィックスの環境変数のみアクセス可能
	if (key.startsWith("NEXT_PUBLIC_")) {
		return process.env[key] || defaultValue;
	}

	console.warn(
		`環境変数 ${key} はクライアントサイドでアクセスできません。NEXT_PUBLIC_プレフィックスを付けてください。`,
	);
	return defaultValue;
}
