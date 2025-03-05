import type { EntryPointMap } from "../../types";
import { getComponentPaths } from "../../../../utils/paths";

/**
 * テーマ機能のコンポーネントのエントリーポイントを定義します
 */
export const themeEntryPoints: EntryPointMap = getComponentPaths(
	"components/features/theme",
	["theme-toggle", "theme-switch"],
);
