import { createTsupConfig } from "@saedgewell/config";

export default createTsupConfig({
	entry: ["src/index.ts"],
	external: [
		// node_modulesの依存関係を外部化
		/^node:.*/,
		/^@types\/.*/,
		/^typescript$/,
		/^@biomejs\/.*/,
		/^esbuild$/,
		/^tsup$/,
		/^@supabase\/.*/,
	],
	format: ["esm", "cjs"],
	outExtension({ format }) {
		return {
			js: format === "esm" ? ".mjs" : ".cjs",
		};
	},
});
