/**
 * @saedgewell/assets
 * 静的アセットを提供するパッケージ
 */

// フォント関連のエクスポート
export * from "./fonts";

// アイコン関連のエクスポート
export * from "./icons";

// 画像関連のエクスポート
export * from "./images";

// アセットのベースパス（Next.jsなどで使用する場合）
export const ASSET_BASE_PATH = "/assets";

// アセットのCDNパス（本番環境で使用する場合）
export const ASSET_CDN_PATH = "https://cdn.saedgewell.com/assets";

/**
 * アセットのパスを取得する関数
 * @param path アセットのパス
 * @param useCdn CDNを使用するかどうか
 * @returns 完全なアセットパス
 */
export function getAssetPath(path: string, useCdn = false): string {
	const basePath = useCdn ? ASSET_CDN_PATH : ASSET_BASE_PATH;
	return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
