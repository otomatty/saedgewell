import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { getSiteSettings } from '@kit/actions';

const defaultSettings = {
  siteName: 'Saedgewell',
  siteDescription: '菅井瑛正のポートフォリオサイト',
  siteKeywords: [
    'プロダクトエンジニア',
    'Web開発',
    'Next.js',
    'React',
    'TypeScript',
  ],
  ogImageUrl: null,
  faviconUrl: null,
  robotsTxtContent: null,
};

/**
 * @name generateRootMetadata
 * @description サイト設定に基づいてメタデータを生成します
 */
export const generateRootMetadata = async (): Promise<Metadata> => {
  const headersStore = await headers();
  const csrfToken = headersStore.get('x-csrf-token') ?? '';
  const settings = (await getSiteSettings()) ?? defaultSettings;

  return {
    title: settings.siteName,
    description: settings.siteDescription,
    keywords: settings.siteKeywords,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    ),
    applicationName: settings.siteName,
    other: {
      'csrf-token': csrfToken,
    },
    openGraph: {
      title: settings.siteName,
      description: settings.siteDescription,
      ...(settings.ogImageUrl && { images: [settings.ogImageUrl] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.siteName,
      description: settings.siteDescription,
      ...(settings.ogImageUrl && { images: [settings.ogImageUrl] }),
    },
    icons: settings.faviconUrl
      ? { icon: settings.faviconUrl }
      : {
          icon: '/icons/icon-192x192.png',
          apple: '/icons/icon-192x192.png',
        },
    robots: settings.robotsTxtContent ?? 'index, follow',
  };
};
