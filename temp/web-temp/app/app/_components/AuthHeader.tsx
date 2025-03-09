"use client";

import { SidebarTrigger } from "../../../../../../packages/components/src/components/core/sidebar";
import { Separator } from "../../../../../../packages/components/src/components/core/separator";
import { NotificationPopover } from "../../../../../../packages/ui/src/components/features/notification/notification-popover";
import { ThemeToggle } from "../../../../../../packages/ui/src/components/features/theme/theme-toggle";
import { useNotifications } from "../../../hooks/use-notifications";

export function AuthHeader() {
	const { updateSettings } = useNotifications();

	return (
		<header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
			<div className="flex flex-1 items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mr-2 h-4" />
			</div>
			<div className="flex items-center gap-2 px-4">
				<ThemeToggle />
				<NotificationPopover onUpdateSettings={updateSettings} />
			</div>
		</header>
	);
}
