import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/logger/index.ts',
    'src/utils.ts',
    'src/hooks/index.ts',
    'src/events/index.tsx',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  treeshake: true,
  sourcemap: true,
  external: ['react', 'pino'],
});
