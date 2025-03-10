import type { Preview } from "@storybook/react";
import "../src/globals.css";
// import "../src/index.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			default: "light",
			values: [
				{
					name: "light",
					value: "#ffffff",
				},
				{
					name: "dark",
					value: "#1a1a1a",
				},
			],
		},
	},
};

export default preview;
