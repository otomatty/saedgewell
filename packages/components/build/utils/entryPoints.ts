import path from "node:path";
import type {
	BuildEntryPoint,
	BuildEntryPointMap,
	ComponentType,
	EntryPointMap,
} from "../config/entryPoints/types";

/**
 * 従来のエントリーポイントを新しい形式に変換する
 */
export function convertToNewEntryPoint(
	key: string,
	value: string,
	type: ComponentType,
	category: string,
	feature?: string,
): BuildEntryPoint {
	return {
		input: {
			path: value,
			directory: "src",
		},
		output: {
			path: key,
			directory: "dist",
		},
		type,
		category,
		feature,
	};
}

/**
 * 従来のエントリーポイントマップを新しい形式に変換する
 */
export function convertEntryPointMap(
	entryPoints: EntryPointMap,
	type: ComponentType,
	category: string,
	feature?: string,
): BuildEntryPointMap {
	return Object.entries(entryPoints).reduce<BuildEntryPointMap>(
		(acc, [key, value]) => {
			const normalizedKey = path.basename(key);
			acc[normalizedKey] = convertToNewEntryPoint(
				key,
				value,
				type,
				category,
				feature,
			);
			return acc;
		},
		{},
	);
}

/**
 * ビルド用のエントリーポイントマップを生成する
 */
export function createBuildEntryPoints(
	entryPoints: BuildEntryPointMap,
	rootDir: string,
): Record<string, string> {
	return Object.values(entryPoints).reduce<Record<string, string>>(
		(acc, entry) => {
			// 入力パスは src からの相対パス
			const inputPath = path.join(rootDir, entry.input.path);
			// 出力パスはそのまま使用
			acc[entry.output.path] = inputPath;
			return acc;
		},
		{},
	);
}
