"use client";

import {../../../../../../../../packages/components/src/ui/card
	Card,
	CardContent,
} from "../../../../../../../../packages/components/components/ui/card";
import { formatTimerDisplay } from "../../../../../../../../packages/utils/src/timer-format";

interface DailyStatsProps {
	todaysSessions: number;
	todaysFocusTime: number; // 秒単位
}

export default function DailyStats({
	todaysSessions,
	todaysFocusTime,
}: DailyStatsProps) {
	return (
		<div className="grid grid-cols-2 gap-4">
			<Card>
				<CardContent className="pt-6">
					<div className="text-center">
						<div className="text-2xl font-bold">{todaysSessions}</div>
						<div className="text-sm text-muted-foreground">
							今日のセッション
						</div>
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardContent className="pt-6">
					<div className="text-center">
						<div className="text-2xl font-bold">
							{formatTimerDisplay(todaysFocusTime)}
						</div>
						<div className="text-sm text-muted-foreground">今日の集中時間</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
