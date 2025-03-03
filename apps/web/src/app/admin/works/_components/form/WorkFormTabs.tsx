"use client";

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../../../../../../../packages/components/src/components/core/tabs";
import type { Work } from "../../../../../../../../packages/types/src/work";
import { WorkBasicForm } from "./WorkBasicForm";
import { WorkDetailForm } from "./WorkDetailForm";
import { WorkResponsibilityForm } from "./WorkResponsibilityForm";
import { WorkTechnologyForm } from "./WorkTechnologyForm";

interface WorkFormTabsProps {
	work: Work;
}

export function WorkFormTabs({ work }: WorkFormTabsProps) {
	return (
		<Tabs defaultValue="basic" className="space-y-4">
			<TabsList>
				<TabsTrigger value="basic">基本情報</TabsTrigger>
				<TabsTrigger value="detail">詳細情報</TabsTrigger>
				<TabsTrigger value="responsibility">担当業務</TabsTrigger>
				<TabsTrigger value="technology">使用技術</TabsTrigger>
			</TabsList>
			<TabsContent value="basic">
				<WorkBasicForm work={work} />
			</TabsContent>
			<TabsContent value="detail">
				<WorkDetailForm work={work} />
			</TabsContent>
			<TabsContent value="responsibility">
				<WorkResponsibilityForm work={work} />
			</TabsContent>
			<TabsContent value="technology">
				<WorkTechnologyForm work={work} />
			</TabsContent>
		</Tabs>
	);
}
