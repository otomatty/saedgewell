import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 設定ファイルのパスを取得します
 * @param configPath - 設定ファイルのパス
 * @returns 設定ファイルの絶対パス
 */
export function getConfigPath(configPath: string): string {
	return join(__dirname, configPath);
}
