import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../../../../../../packages/components/src/components/core/card";
import type { ReactNode } from "react";

interface StatsCardProps {
	title: string;
	value: number;
	icon: ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{value}</div>
			</CardContent>
		</Card>
	);
};
