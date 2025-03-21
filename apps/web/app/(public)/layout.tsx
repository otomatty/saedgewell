import type { Metadata } from 'next';
import { Header } from './_layout/Header';
import { Footer } from './_layout/Footer';
import { getAuthState } from '@kit/next/actions';

export const metadata: Metadata = {
  title: {
    default: 'Saedgewell | 菅井瑛正',
    template: ' Saedgewell | 菅井瑛正',
  },
  description: 'プロダクトエンジニア 菅井瑛正のポートフォリオサイトです。',
  keywords: [
    'プロダクトエンジニア',
    'Web開発',
    'Next.js',
    'React',
    'TypeScript',
    'ポートフォリオ',
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const { profile } = await getAuthState();

    return (
      <>
        <Header profile={profile} />
        <main className="flex-1">{children}</main>
        <Footer />
      </>
    );
  } catch (error) {
    console.error('認証状態の取得に失敗しました:', error);
    console.log('認証状態: 未認証です（エラーが発生しました）');
    return (
      <>
        <Header profile={null} />
        <main className="flex-1">{children}</main>
        <Footer />
      </>
    );
  }
}
