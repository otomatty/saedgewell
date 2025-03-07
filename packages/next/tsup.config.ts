import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/actions/index.ts', 'src/routes/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  external: ['react', 'next', 'zod', '@kit/auth', '@kit/supabase'],
  treeshake: true,
  sourcemap: true,
});
