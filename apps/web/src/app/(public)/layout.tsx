import type { Metadata } from "next";
import { Header } from "./_layout/Header";
import { Footer } from "./_layout/Footer";
import { getAuthState } from "@saedgewell/actions";

export const metadata: Metadata = {
	title: {
		default: "Saedgewell | 菅井瑛正",
		template: "%s | Saedgewell | 菅井瑛正",
	},
	description: "プロダクトエンジニア 菅井瑛正のポートフォリオサイトです。",
	keywords: [
		"プロダクトエンジニア",
		"Web開発",
		"Next.js",
		"React",
		"TypeScript",
		"ポートフォリオ",
	],
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	try {
		const { isAuthenticated, profile } = await getAuthState();

		return (
			<>
				<Header profile={profile} isAuthenticated={isAuthenticated} />
				<main className="flex-1">{children}</main>
				<Footer />
			</>
		);
	} catch (error) {
		console.error("認証状態の取得に失敗しました:", error);
		// エラーが発生した場合は未認証状態として扱う
		return (
			<>
				<Header profile={null} isAuthenticated={false} />
				<main className="flex-1">{children}</main>
				<Footer />
			</>
		);
	}
}
