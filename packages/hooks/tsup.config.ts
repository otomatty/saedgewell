import { createReactTsupConfig } from "@saedgewell/config";

export default createReactTsupConfig({
	target: "node18",
	external: [
		"react",
		"react-dom",
		"@saedgewell/types",
		"@saedgewell/store",
		"@saedgewell/lib",
	],
});
