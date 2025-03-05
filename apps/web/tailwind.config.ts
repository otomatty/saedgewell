import { baseConfig } from "@saedgewell/config/styling";
import type { Config } from "tailwindcss";

// 既存の設定を保持しつつ、ベース設定を拡張
const config: Config = {
	...baseConfig,
	content: [
		...(Array.isArray(baseConfig.content) ? baseConfig.content : []),
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		...baseConfig.theme,
		extend: {
			...baseConfig.theme?.extend,
			colors: {
				...baseConfig.theme?.extend?.colors,
				backgroundLine: "hsl(var(--background-line))",
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
				"color-1": "hsl(var(--color-1))",
				"color-2": "hsl(var(--color-2))",
				"color-3": "hsl(var(--color-3))",
				"color-4": "hsl(var(--color-4))",
				"color-5": "hsl(var(--color-5))",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				...baseConfig.theme?.extend?.keyframes,
				"shimmer-slide": {
					to: {
						transform: "translate(calc(100cqw - 100%), 0)",
					},
				},
				"spin-around": {
					"0%": {
						transform: "translateZ(0) rotate(0)",
					},
					"15%, 35%": {
						transform: "translateZ(0) rotate(90deg)",
					},
					"65%, 85%": {
						transform: "translateZ(0) rotate(270deg)",
					},
					"100%": {
						transform: "translateZ(0) rotate(360deg)",
					},
				},
				orbit: {
					"0%": {
						transform:
							"rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg))",
					},
					"100%": {
						transform:
							"rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg))",
					},
				},
				marquee: {
					from: {
						transform: "translateX(0)",
					},
					to: {
						transform: "translateX(calc(-100% - var(--gap)))",
					},
				},
				"marquee-vertical": {
					from: {
						transform: "translateY(0)",
					},
					to: {
						transform: "translateY(calc(-100% - var(--gap)))",
					},
				},
				ripple: {
					"0%, 100%": {
						transform: "translate(-50%, -50%) scale(1)",
					},
					"50%": {
						transform: "translate(-50%, -50%) scale(0.9)",
					},
				},
				"aurora-border": {
					"0%, 100%": {
						borderRadius: "37% 29% 27% 27% / 28% 25% 41% 37%",
					},
					"25%": {
						borderRadius: "47% 29% 39% 49% / 61% 19% 66% 26%",
					},
					"50%": {
						borderRadius: "57% 23% 47% 72% / 63% 17% 66% 33%",
					},
					"75%": {
						borderRadius: "28% 49% 29% 100% / 93% 20% 64% 25%",
					},
				},
				"aurora-1": {
					"0%, 100%": {
						top: "0",
						right: "0",
					},
					"50%": {
						top: "50%",
						right: "25%",
					},
					"75%": {
						top: "25%",
						right: "50%",
					},
				},
				"aurora-2": {
					"0%, 100%": {
						top: "0",
						left: "0",
					},
					"60%": {
						top: "75%",
						left: "25%",
					},
					"85%": {
						top: "50%",
						left: "50%",
					},
				},
				"aurora-3": {
					"0%, 100%": {
						bottom: "0",
						left: "0",
					},
					"40%": {
						bottom: "50%",
						left: "25%",
					},
					"65%": {
						bottom: "25%",
						left: "50%",
					},
				},
				"aurora-4": {
					"0%, 100%": {
						bottom: "0",
						right: "0",
					},
					"50%": {
						bottom: "25%",
						right: "40%",
					},
					"90%": {
						bottom: "50%",
						right: "25%",
					},
				},
				"background-position-spin": {
					"0%": {
						backgroundPosition: "top center",
					},
					"100%": {
						backgroundPosition: "bottom center",
					},
				},
				meteor: {
					"0%": {
						transform: "rotate(var(--angle)) translateX(0)",
						opacity: "1",
					},
					"70%": {
						opacity: "1",
					},
					"100%": {
						transform: "rotate(var(--angle)) translateX(-500px)",
						opacity: "0",
					},
				},
				"aurora-gradient": {
					"0%, 100%": {
						"background-size": "400% 400%",
						"background-position": "0% 50%",
					},
					"50%": {
						"background-size": "400% 400%",
						"background-position": "100% 50%",
					},
				},
				"spin-reverse": {
					from: {
						transform: "rotate(360deg)",
					},
				},
			},
			animation: {
				...baseConfig.theme?.extend?.animation,
				"shimmer-slide": "shimmer-slide 1.5s linear infinite",
				"spin-around": "spin-around 6s ease-in-out infinite",
				orbit: "orbit calc(var(--duration) * 1s) linear infinite",
				marquee: "marquee var(--duration) linear infinite",
				"marquee-vertical": "marquee-vertical var(--duration) linear infinite",
				ripple: "ripple 1.5s ease-in-out infinite",
				"aurora-border": "aurora-border 8s ease-in-out infinite",
				"aurora-1": "aurora-1 15s ease-in-out infinite",
				"aurora-2": "aurora-2 15s ease-in-out infinite",
				"aurora-3": "aurora-3 15s ease-in-out infinite",
				"aurora-4": "aurora-4 15s ease-in-out infinite",
				"background-position-spin":
					"background-position-spin 3s ease-in-out infinite alternate",
				meteor: "meteor var(--duration) linear infinite",
				"aurora-gradient": "aurora-gradient 15s ease infinite",
				"spin-slow": "spin 4s linear infinite",
				"spin-reverse": "spin-reverse 1s linear infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
