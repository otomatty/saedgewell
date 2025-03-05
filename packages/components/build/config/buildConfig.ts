import type { BuildOptions } from "esbuild";
import path from "node:path";
import type { ComponentType } from "./entryPoints/types";

export type BuildConfig = BuildOptions;

/**
 * 出力設定
 */
interface OutputConfig {
	/** 出力のベースパス */
	base: string;
	/** 出力ディレクトリ */
	directory: string;
	/** 命名規則 */
	naming: {
		/** チャンクファイルの命名規則 */
		chunks: string;
		/** エントリーファイルの命名規則 */
		entries: string;
	};
}

/**
 * コンポーネントビルド設定
 */
interface ComponentBuildConfig {
	/** esbuildのビルドオプション */
	buildOptions: BuildOptions;
	/** コンポーネントの種類 */
	componentType: ComponentType;
	/** ベースパス */
	basePath: string;
	/** フィーチャーコンポーネントかどうか */
	isFeature?: boolean;
	/** フィーチャーの種類 */
	featureType?: string;
	/** 出力設定 */
	outputConfig: OutputConfig;
}

/**
 * コンポーネントビルド設定を作成する
 */
export const createComponentBuildConfig = (
	componentType: ComponentType,
	options: {
		basePath?: string;
		isFeature?: boolean;
		featureType?: string;
	} = {},
): ComponentBuildConfig => {
	const {
		basePath = "src/components",
		isFeature = false,
		featureType,
	} = options;

	if (isFeature && !featureType) {
		throw new Error("featureType is required when isFeature is true");
	}

	const outputConfig: OutputConfig = {
		base: process.cwd(),
		directory: "dist",
		naming: {
			chunks: "[dir]/chunks/[name]-[hash]",
			entries: "[dir]/[name]",
		},
	};

	return {
		buildOptions: {
			bundle: true,
			minify: true,
			splitting: true,
			format: "esm",
			target: "es2020",
			platform: "browser",
			sourcemap: true,
			metafile: true,
			treeShaking: true,
			define: {
				"process.env.NODE_ENV": '"production"',
			},
			outbase: outputConfig.base,
			outdir: outputConfig.directory,
			resolveExtensions: [".tsx", ".ts", ".jsx", ".js"],
			absWorkingDir: process.cwd(),
			nodePaths: ["src"],
			chunkNames: outputConfig.naming.chunks,
			entryNames: outputConfig.naming.entries,
			outExtension: { ".js": ".js" },
			mainFields: ["module", "main"],
			sourcesContent: false,
		},
		componentType,
		basePath,
		isFeature,
		featureType,
		outputConfig,
	};
};

export const defaultBuildConfig: BuildOptions =
	createComponentBuildConfig("component").buildOptions;
