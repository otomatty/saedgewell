import { defineConfig } from 'tsup';
import { shadcnEntries } from './entries/shadcn';

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

// shadcnコンポーネント用の設定
export default defineConfig({
  entry: shadcnEntries,
  format: ['esm' as const, 'cjs' as const],
  dts: false,
  external: externalDependencies,
  treeshake: true,
  sourcemap: false,
  outDir: 'dist',
  splitting: true,
  bundle: true,
  minify: true,
  // workers: 1, // 並列処理を最小限に制限
  clean: true, // 最初のビルドでクリーン
  esbuildOptions(options) {
    // パス解決の設定を追加
    options.resolveExtensions = ['.tsx', '.ts', '.jsx', '.js'];
    options.mainFields = ['module', 'main'];
  },
});
