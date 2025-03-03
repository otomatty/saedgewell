import { createTsupConfig } from "@saedgewell/config";

export default createTsupConfig({
	splitting: false,
	external: ["@saedgewell/types", "@saedgewell/utils"],
	target: "esnext",
});
