/**
 * 共通のtsup設定を提供するモジュール
 */
import type { Options } from "tsup";

/**
 * 基本的なtsup設定
 * @param options カスタムオプション
 * @returns tsup設定オブジェクト
 */
export function createTsupConfig(options?: Partial<Options>): Options {
	return {
		entry: ["src/index.ts"],
		format: ["esm", "cjs"],
		dts: true,
		sourcemap: true,
		clean: true,
		minify: false,
		target: "node20",
		...options,
	};
}

/**
 * React向けのtsup設定
 * @param options カスタムオプション
 * @returns tsup設定オブジェクト
 */
export function createReactTsupConfig(options?: Partial<Options>): Options {
	return createTsupConfig({
		target: "es2020",
		external: ["react", "react-dom", "react/jsx-runtime"],
		...options,
	});
}

/**
 * サーバーアクション向けのtsup設定
 * @param options カスタムオプション
 * @returns tsup設定オブジェクト
 */
export function createServerActionTsupConfig(
	options?: Partial<Options>,
): Options {
	return createTsupConfig({
		target: "node20",
		...options,
	});
}

/**
 * アセット向けのtsup設定
 * @param options カスタムオプション
 * @returns tsup設定オブジェクト
 */
export function createAssetsTsupConfig(options?: Partial<Options>): Options {
	return createTsupConfig({
		target: "esnext",
		...options,
	});
}
