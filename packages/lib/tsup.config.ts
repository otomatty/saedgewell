import { createTsupConfig } from "@saedgewell/config";

export default createTsupConfig({
	entry: [
		"src/index.ts",
		"src/server/index.ts",
		"src/client/index.ts",
		"src/shared/index.ts",
	],
	dts: {
		compilerOptions: {
			incremental: false,
		},
	},
	// 外部依存関係を除外
	external: [
		"@supabase/supabase-js",
		"@saedgewell/types",
		"@saedgewell/utils",
		"next/server",
		"google-auth-library",
		"googleapis",
	],
});
