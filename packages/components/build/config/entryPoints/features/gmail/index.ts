import type { EntryPointMap } from "../../types";
import { getComponentPaths } from "../../../../utils/paths";

/**
 * Gmail連携機能のコンポーネントのエントリーポイントを定義します
 */
export const gmailEntryPoints: EntryPointMap = getComponentPaths(
	"components/features/gmail",
	["auth-button"],
);
