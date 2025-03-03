import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
	test: {
		environment: "node",
		include: ["**/*.test.ts", "**/*.spec.ts"],
		setupFiles: ["./vitest.setup.ts"],
		globals: true,
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: [
				"**/*.d.ts",
				"**/*.config.ts",
				"**/node_modules/**",
				"**/dist/**",
				"**/coverage/**",
			],
		},
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
		deps: {
			inline: ["vitest-mock-extended"],
		},
		mockReset: true,
		restoreMocks: true,
		clearMocks: true,
	},
});
