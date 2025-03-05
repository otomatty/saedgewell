import { coreExports } from "./core";
import { animationExports } from "./animation";
import { backgroundExports } from "./background";
import { featuresExports } from "./features";
import { feedbackExports } from "./feedback";
import { layoutExports } from "./layout";

export const exports = {
	".": {
		types: "./dist/index.d.ts",
		import: "./dist/index.js",
	},
	"./layout": {
		types: "./dist/components/layout/index.d.ts",
		import: "./dist/components/layout/index.js",
	},
	"./features": {
		types: "./dist/components/features/index.d.ts",
		import: "./dist/components/features/index.js",
	},
	"./feedback": {
		types: "./dist/components/feedback/index.d.ts",
		import: "./dist/components/feedback/index.js",
	},
	"./providers": {
		types: "./dist/providers/index.d.ts",
		import: "./dist/providers/index.js",
	},
	...coreExports,
	...animationExports,
	...backgroundExports,
	...featuresExports,
	...feedbackExports,
	...layoutExports,
} as const;
