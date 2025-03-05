import path from "path";
import type { EntryPointMap } from "../config/entryPoints/types";

/**
 * 指定されたディレクトリ内のコンポーネントのエントリーポイントを生成します
 * @param baseDir ベースディレクトリ（src/からの相対パス）
 * @param components コンポーネント名の配列
 * @returns エントリーポイントのマップ
 */
export function getComponentPaths(
	baseDir: string,
	components: string[],
): EntryPointMap {
	return components.reduce<EntryPointMap>((acc, component) => {
		const outputPath = path.join(baseDir, component);
		const sourcePath = path.join("src", baseDir, component);
		acc[outputPath] = sourcePath;
		return acc;
	}, {});
}

/**
 * 指定されたディレクトリ内の全てのTypeScriptファイルのエントリーポイントを生成します
 * @param baseDir ベースディレクトリ（src/からの相対パス）
 * @returns エントリーポイントのマップ
 */
export function getAllTsFiles(baseDir: string): EntryPointMap {
	// TODO: fs.readdirSyncを使用してディレクトリ内の全てのTypeScriptファイルを取得
	return {};
}
