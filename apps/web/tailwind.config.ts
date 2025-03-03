import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				backgroundLine: "hsl(var(--background-line))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
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
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
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
					to: {
						transform: "rotate(0deg)",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"shimmer-slide":
					"shimmer-slide var(--speed) ease-in-out infinite alternate",
				"spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
				orbit: "orbit calc(var(--duration)*1s) linear infinite",
				marquee: "marquee var(--duration) infinite linear",
				"marquee-vertical": "marquee-vertical var(--duration) linear infinite",
				ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
				"background-position-spin":
					"background-position-spin 3000ms infinite alternate",
				meteor: "meteor 5s linear infinite",
				aurora: "aurora-gradient 6s ease-in-out infinite",
				"spin-clockwise": "spin 20s linear infinite",
				"spin-counterclockwise": "spin-reverse 20s linear infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
