import { Noto_Sans_JP, Inter } from 'next/font/google';

/**
 * @name inter
 * @description Define here the sans font.
 * By default, it uses the Inter font from Google Fonts.
 */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  preload: true,
  display: 'swap',
  variable: '--font-inter',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  preload: true,
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

/**
 * @heading
 * @description Define here the heading font.
 */
const heading = notoSansJP;

// we export these fonts into the root layout
export { inter, heading };
