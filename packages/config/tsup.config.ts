import { defineConfig } from "tsup";
import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// JSONファイルをコピーする関数
async function copyJsonFiles() {
	const jsonFiles = [
		["src/typescript/base.json", "dist/typescript/base.json"],
		["src/typescript/react.json", "dist/typescript/react.json"],
		["src/typescript/nextjs.json", "dist/typescript/nextjs.json"],
		["src/lint/base.json", "dist/lint/base.json"],
	];

	for (const [src, dest] of jsonFiles) {
		mkdirSync(join(dest, ".."), { recursive: true });
		copyFileSync(src, dest);
	}
}

// configパッケージは自身の共通設定を使用できないため、直接定義
export default defineConfig({
	clean: true,
	dts: true,
	entry: [
		"src/index.ts",
		"src/typescript/index.ts",
		"src/styling/index.ts",
		"src/lint/index.ts",
		"src/runtime/index.ts",
		"src/build/index.ts",
	],
	format: ["esm", "cjs"],
	minify: false,
	sourcemap: true,
	target: "node20",
	outDir: "dist",
	treeshake: true,
	external: [
		// node_modulesの依存関係を外部化
		/^node:.*/,
		/^@types\/.*/,
		/^typescript$/,
		/^@biomejs\/.*/,
		/^esbuild$/,
		/^tsup$/,
	],
	onSuccess: copyJsonFiles,
});
