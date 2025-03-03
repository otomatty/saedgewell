import { createTsupConfig } from "@saedgewell/config/build";

export default createTsupConfig({
	splitting: false,
	external: ["@saedgewell/types", "jotai"],
	target: "esnext",
});
