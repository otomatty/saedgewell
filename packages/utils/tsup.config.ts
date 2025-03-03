import { createTsupConfig } from "@saedgewell/config";

export default createTsupConfig({
	dts: {
		compilerOptions: {
			incremental: false,
		},
	},
	splitting: false,
});
