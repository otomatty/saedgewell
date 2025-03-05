import type { EntryPointMap } from "../../types";
import { getComponentPaths } from "../../../../utils/paths";

/**
 * 連絡先機能のコンポーネントのエントリーポイントを定義します
 */
export const contactsEntryPoints: EntryPointMap = getComponentPaths(
	"components/features/contacts",
	[
		"category-card",
		"faq-accordion",
		"contact-dialog",
		"contact-chat",
		"chat-message",
		"chat-input",
	],
);
