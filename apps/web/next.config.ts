import type { NextConfig } from "next";
import webpack from "webpack";

/**
 * Next.jsの設定
 * - images: Supabaseのストレージドメインを許可
 * - webpack: クライアントサイドでのnode:processモジュールの解決
 */
const nextConfig: NextConfig = {
	images: {
		domains: ["pkgvisiqnidmpqchosnv.supabase.co"],
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
			// 既存の設定を保持
			const existingAlias = config.resolve.alias || {};
			const existingFallback = config.resolve.fallback || {};

			config.resolve.alias = {
				...existingAlias,
				"node:process": "process/browser",
				"node:buffer": "buffer",
				"node:util": "util",
			};

			config.resolve.fallback = {
				...existingFallback,
				process: require.resolve("process/browser"),
				buffer: require.resolve("buffer/"),
				util: require.resolve("util/"),
			};

			// プラグインの重複を防ぐ
			if (
				!config.plugins.some(
					(plugin) => plugin instanceof webpack.ProvidePlugin,
				)
			) {
				config.plugins.push(
					new webpack.ProvidePlugin({
						process: "process/browser",
						Buffer: ["buffer", "Buffer"],
					}),
				);
			}
		}
		return config;
	},
};

export default nextConfig;
