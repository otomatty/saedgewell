import type { BuildConfig } from "../config/buildConfig";

const toCamelCase = (str: string): string => {
	return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

const parseValue = (value: string): string | number | boolean => {
	if (value === "true") return true;
	if (value === "false") return false;
	if (!Number.isNaN(Number(value))) return Number(value);
	return value;
};

export function parseArgs(): Partial<BuildConfig> {
	const config: Record<
		string,
		| boolean
		| number
		| string
		| string[]
		| Record<string, boolean | number | string | string[]>
	> = {};
	const args = process.argv.slice(2);

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];
		if (!arg.startsWith("--")) continue;

		// Handle --no-* flags
		if (arg.startsWith("--no-")) {
			const key = toCamelCase(arg.slice(5));
			config[key] = false;
			continue;
		}

		// Handle --flag (boolean true)
		if (
			!arg.includes("=") &&
			(i === args.length - 1 || args[i + 1].startsWith("--"))
		) {
			const key = toCamelCase(arg.slice(2));
			config[key] = true;
			continue;
		}

		// Handle --key=value or --key value
		let key: string;
		let value: string;

		if (arg.includes("=")) {
			[key, value] = arg.slice(2).split("=", 2);
		} else {
			key = arg.slice(2);
			value = args[++i];
		}

		// Convert kebab-case key to camelCase
		key = toCamelCase(key);

		// Handle nested properties (e.g. --minify.whitespace)
		if (key.includes(".")) {
			const [parentKey, childKey] = key.split(".");
			config[parentKey] = config[parentKey] || {};
			config[parentKey][childKey] = parseValue(value);
		} else {
			config[key] = parseValue(value);
		}
	}

	return config as Partial<BuildConfig>;
}
