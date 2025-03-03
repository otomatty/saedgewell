import type React from "react";
import type { ContributionDay } from "../../../../../../../../packages/types/src/github";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../../../../../../../packages/components/src/components/core/tabs";
import { GithubContributionCalendar } from "./GithubContributionCalendar";
import { GithubContributionChart } from "./GithubContributionChart";
import { SectionTitle } from "../../../../../../../../packages/sample/src/components/layout/section-title";

interface GithubContributionsProps {
	contributions: ContributionDay[];
}

/**
 * GitHubのコントリビューションを表示するコンポーネント
 * @param {GithubContributionsProps} props
 * @returns {JSX.Element}
 */
export const GithubContributions: React.FC<GithubContributionsProps> = ({
	contributions,
}) => {
	return (
		<div>
			<SectionTitle
				title="GitHub Contributions"
				subtitle="GitHubのコントリビューションを表示します。"
			/>
			<Tabs defaultValue="calendar">
				<TabsList>
					<TabsTrigger value="calendar">Calendar</TabsTrigger>
					<TabsTrigger value="chart">Chart</TabsTrigger>
				</TabsList>
				<TabsContent value="calendar">
					<GithubContributionCalendar contributions={contributions} />
				</TabsContent>

				<TabsContent value="chart">
					<GithubContributionChart contributions={contributions} />
				</TabsContent>
			</Tabs>
		</div>
	);
};
