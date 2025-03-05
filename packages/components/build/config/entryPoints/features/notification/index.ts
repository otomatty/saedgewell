import type { EntryPointMap } from "../../types";
import { getComponentPaths } from "../../../../utils/paths";

/**
 * 通知機能のコンポーネントのエントリーポイントを定義します
 */
export const notificationEntryPoints: EntryPointMap = getComponentPaths(
	"components/features/notification",
	[
		"notification-settings",
		"notification-popover",
		"notification-icon",
		"notification-list",
	],
);
