import { createServerActionTsupConfig } from "@saedgewell/config/build";

export default createServerActionTsupConfig({
	entry: ["src/index.ts"],
	external: [
		"@saedgewell/lib",
		"@saedgewell/types",
		"@saedgewell/utils",
		"@saedgewell/config",
		"next",
		"@opentelemetry/api",
	],
	dts: {
		compilerOptions: {
			incremental: false,
		},
	},
});
