import type { BuildResult } from "esbuild";

// エントリーポイントの型定義
export interface EntryPointMap {
	[key: string]: string;
}

export interface FeaturesEntryPoints {
	theme: EntryPointMap;
	notification: EntryPointMap;
	achievements: EntryPointMap;
	auth: EntryPointMap;
	contacts: EntryPointMap;
	gmail: EntryPointMap;
}

export interface ComponentsEntryPoints {
	animation: EntryPointMap;
	background: EntryPointMap;
	core: EntryPointMap;
	layout: EntryPointMap;
	feedback: EntryPointMap;
	features: FeaturesEntryPoints;
}

export interface ProvidersEntryPoints {
	theme: EntryPointMap;
	siteSettings: EntryPointMap;
}

export interface LibEntryPoints {
	utils: EntryPointMap;
}

export interface EntryPoints {
	components: ComponentsEntryPoints;
	providers: ProvidersEntryPoints;
	lib: LibEntryPoints;
}

// ビルド結果の型定義
export interface ComponentBuildResult {
	category: string;
	result: BuildResult;
	metadata: BuildResultMetadata;
}

export type ComponentType = "component" | "feature" | "provider" | "lib";
export type ComponentCategory =
	| "animation"
	| "layout"
	| "core"
	| "background"
	| "feedback"
	| string;

/**
 * ビルドエントリーポイントの入力設定
 */
export interface BuildEntryInput {
	/** ソースファイルパス */
	path: string;
	/** ソースのルートディレクトリ */
	directory: string;
}

/**
 * ビルドエントリーポイントの出力設定
 */
export interface BuildEntryOutput {
	/** 出力パス */
	path: string;
	/** 出力ディレクトリ */
	directory: string;
}

/**
 * ビルドエントリーポイントの設定
 */
export interface BuildEntryPoint {
	/** 入力設定 */
	input: BuildEntryInput;
	/** 出力設定 */
	output: BuildEntryOutput;
	/** コンポーネントの種類 */
	type: ComponentType;
	/** コンポーネントのカテゴリ */
	category: ComponentCategory;
	/** フィーチャーコンポーネントの場合のフィーチャー名 */
	feature?: string;
}

/**
 * ビルドエントリーポイントのマップ
 */
export type BuildEntryPointMap = Record<string, BuildEntryPoint>;

/**
 * ビルド結果のメタデータ
 */
export interface BuildResultMetadata {
	componentType: string;
	featureType?: string;
	entryPointCount: number;
}
