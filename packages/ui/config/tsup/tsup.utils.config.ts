import { defineConfig } from 'tsup';
import { utilEntries } from './entries';

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

// utilsライブラリ用の設定
export default defineConfig({
  entry: utilEntries,
  format: ['esm' as const, 'cjs' as const],
  dts: false, // 型定義ビルドを無効化（別プロセスで生成）
  external: externalDependencies,
  treeshake: true,
  sourcemap: false, // ソースマップを無効化
  outDir: 'dist',
  splitting: true,
  bundle: true,
  minify: true,
  clean: false, // 既存のビルド結果を保持
});
