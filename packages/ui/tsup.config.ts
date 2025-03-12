import { defineConfig } from 'tsup';
import {
  shadcnEntries,
  makerkitEntries,
  magicuiEntries,
  customEntries,
  utilEntries,
} from './src/entries';

// 外部依存関係を共通の変数として定義
const externalDependencies = [
  'react',
  'react-dom',
  'next',
  '@radix-ui/*',
  'tailwindcss',
  'clsx',
  'lucide-react',
  '@hookform/resolvers',
  'cmdk',
  'input-otp',
  'react-day-picker',
  'react-top-loading-bar',
  'recharts',
  'tailwind-merge',
  'class-variance-authority',
  'next-themes',
  'react-hook-form',
  'react-i18next',
  'sonner',
  'zod',
];

// 共通の設定をベースとして定義
const baseConfig = {
  format: ['esm' as const, 'cjs' as const],
  dts: true,
  external: externalDependencies,
  treeshake: true,
  sourcemap: true,
  outDir: 'dist',
  splitting: true,
  bundle: true,
  minify: true,
  workers: 2,
};

// エントリーポイントを分割してビルドする
export default defineConfig([
  {
    ...baseConfig,
    entry: shadcnEntries,
    clean: true, // 最初のビルドでのみtrueに設定
  },
  {
    ...baseConfig,
    entry: makerkitEntries,
    clean: false, // 後続のビルドではfalseに設定
  },
  {
    ...baseConfig,
    entry: magicuiEntries,
    clean: false,
  },
  {
    ...baseConfig,
    entry: utilEntries,
    clean: false,
  },
]);
