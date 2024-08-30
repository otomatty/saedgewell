import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import Header from '@/components/common/organisms/Header/Header';
import Footer from '@/components/common/organisms/Footer/Footer';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title:
    'Saedgewell - Webサイト・アプリケーション開発/クラウド構築/UXデザイン/ITインストラクター',
  description:
    '岩手県大船渡市在住のWeb・クラウドエンジニア/UXデザイナー/ITインストラクター',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
