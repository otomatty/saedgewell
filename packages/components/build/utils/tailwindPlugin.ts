import type { Plugin } from "esbuild";
import { tailwindPlugin } from "esbuild-plugin-tailwindcss";

export const createTailwindPlugin = (): Plugin => ({
	name: "tailwind",
	setup(build) {
		build.onResolve({ filter: /\.css$/ }, (args) => ({
			path: args.path,
			namespace: "tailwind",
		}));
		build.onLoad({ filter: /.*/, namespace: "tailwind" }, async () => ({
			contents: await tailwindPlugin.setup({
				onStart: () => {},
				onBeforeParse: () => {},
				onLoad: () => {},
				onResolve: () => {},
				onEnd: () => {},
			}),
			loader: "css",
		}));
	},
});
