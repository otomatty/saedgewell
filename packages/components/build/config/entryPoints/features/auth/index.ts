import type { EntryPointMap } from "../../types";
import { getComponentPaths } from "../../../../utils/paths";

/**
 * 認証機能のコンポーネントのエントリーポイントを定義します
 */
export const authEntryPoints: EntryPointMap = getComponentPaths(
	"components/features/auth",
	["login-form", "login-dialog"],
);
