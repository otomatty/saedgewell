import "./globals.css";
import "highlight.js/styles/github-dark.css";
import { Noto_Sans_JP, Inter } from "next/font/google";
import { Toaster } from "@saedgewell/components/core";
import { ThemeProvider } from "@saedgewell/components/providers";
import { SiteSettingsProvider } from "@saedgewell/components/providers";
import { getSiteSettings } from "@saedgewell/actions";
import { TooltipProvider } from "@saedgewell/components/core";
import type { SiteSettings } from "@saedgewell/types";

export const dynamic = "force-dynamic";

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	preload: true,
	display: "swap",
});

const notoSansJP = Noto_Sans_JP({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	preload: true,
	display: "swap",
});

const defaultSettings: SiteSettings = {
	id: "default",
	siteStatus: "development",
	maintenanceMode: false,
	isDevelopmentBannerEnabled: true,
	siteName: "Saedgewell",
	siteDescription: "菅井瑛正のポートフォリオサイト",
	siteKeywords: [
		"プロダクトエンジニア",
		"Web開発",
		"Next.js",
		"React",
		"TypeScript",
	],
	ogImageUrl: null,
	faviconUrl: null,
	robotsTxtContent: null,
	enableBlog: true,
	enableWorks: true,
	enableContact: true,
	enableEstimate: true,
	socialLinks: {},
	createdAt: new Date(),
	updatedAt: new Date(),
	lastModifiedBy: null,
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const settings = (await getSiteSettings()) ?? defaultSettings;

	return (
		<html lang="ja" suppressHydrationWarning>
			<head>
				<meta name="application-name" content={settings.siteName} />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content={settings.siteName} />
				<meta name="description" content={settings.siteDescription} />
				<meta name="keywords" content={settings.siteKeywords.join(", ")} />
				<meta name="format-detection" content="telephone=no" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="theme-color" content="#000000" />
				{settings.ogImageUrl && (
					<meta property="og:image" content={settings.ogImageUrl} />
				)}
				{settings.faviconUrl ? (
					<link rel="icon" href={settings.faviconUrl} />
				) : (
					<link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
				)}
				{settings.robotsTxtContent && (
					<meta name="robots" content={settings.robotsTxtContent} />
				)}
			</head>
			<body
				className={`${notoSansJP.className} ${inter.className}`}
				suppressHydrationWarning
			>
				<SiteSettingsProvider settings={settings}>
					<ThemeProvider>
						<TooltipProvider>
							<div className="min-h-screen flex flex-col">
								{children}
								<Toaster />
							</div>
						</TooltipProvider>
					</ThemeProvider>
				</SiteSettingsProvider>
			</body>
		</html>
	);
}
