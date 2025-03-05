import type { EntryPointMap } from "../../types";
import { getComponentPaths } from "../../../../utils/paths";

/**
 * 実績機能のコンポーネントのエントリーポイントを定義します
 */
export const achievementsEntryPoints: EntryPointMap = getComponentPaths(
	"components/features/achievements",
	["work-card"],
);
