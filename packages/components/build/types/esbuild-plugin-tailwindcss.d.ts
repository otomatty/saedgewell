declare module "esbuild-plugin-tailwindcss" {
	export const tailwindPlugin: {
		setup: (options: {
			onStart: () => void;
			onBeforeParse: () => void;
			onLoad: () => void;
			onResolve: () => void;
			onEnd: () => void;
		}) => Promise<string>;
	};
}
