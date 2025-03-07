"use client";

import { Separator } from "../../../../../../../packages/components/src/components/core/separator";
import { SidebarTrigger } from "../../../../../../../packages/components/src/components/core/sidebar";
import { ThemeToggle } from "../../../../../../../packages/ui/src/components/features/theme/theme-toggle";

interface AdminHeaderProps {
	breadcrumbs: {
		id: number;
		href?: string;
		label: string;
		current?: boolean;
	}[];
}

export function AdminHeader({ breadcrumbs }: AdminHeaderProps) {
	return (
		<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
			<div className="flex flex-1 items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mr-2 h-4" />
			</div>
			<div className="flex items-center gap-2 px-4">
				<ThemeToggle />
			</div>
		</header>
	);
}
