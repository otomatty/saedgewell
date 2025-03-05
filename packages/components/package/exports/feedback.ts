export const feedbackExports = {
	"./feedback": {
		types: "./dist/components/feedback/index.d.ts",
		import: "./dist/components/feedback/index.js",
	},
	"./feedback/error-message": {
		types: "./dist/components/feedback/error-message/index.d.ts",
		import: "./dist/components/feedback/error-message/index.js",
	},
	"./feedback/error-boundary": {
		types: "./dist/components/feedback/error-boundary/index.d.ts",
		import: "./dist/components/feedback/error-boundary/index.js",
	},
} as const;
