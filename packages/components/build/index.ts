#!/usr/bin/env bun
import { build } from "esbuild";
import { rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";

import { createComponentBuildConfig } from "./config/buildConfig";
import { entryPoints } from "./config/entryPoints";
import type {
	ComponentBuildResult,
	EntryPointMap,
} from "./config/entryPoints/types";
import { externalDependencies } from "./config/external";
import { formatFileSize } from "./utils/fileSize";
import { createTailwindPlugin } from "./utils/tailwindPlugin";
import {
	convertEntryPointMap,
	createBuildEntryPoints,
} from "./utils/entryPoints";

console.log("\n🚀 Starting build process...\n");

const outdir = "dist";
const rootDir = process.cwd();

if (existsSync(outdir)) {
	console.log(`🗑️ Cleaning previous build at ${outdir}`);
	await rm(outdir, { recursive: true, force: true });
}

const start = performance.now();

async function buildFeatureComponent(
	feature: string,
	entryPoints: EntryPointMap,
): Promise<ComponentBuildResult> {
	const config = createComponentBuildConfig("feature", {
		isFeature: true,
		featureType: feature,
	});

	// エントリーポイントを新しい形式に変換
	const newEntryPoints = convertEntryPointMap(
		entryPoints,
		"feature",
		"features",
		feature,
	);

	// ビルド用のエントリーポイントを生成
	const buildEntryPoints = createBuildEntryPoints(newEntryPoints, rootDir);

	const result = await build({
		...config.buildOptions,
		entryPoints: buildEntryPoints,
		external: externalDependencies,
		plugins: [createTailwindPlugin()],
	});

	return {
		category: `components/features/${feature}`,
		result,
		metadata: {
			componentType: "features",
			featureType: feature,
			entryPointCount: Object.keys(entryPoints).length,
		},
	};
}

async function buildStandardComponent(
	category: string,
	entryPoints: EntryPointMap,
): Promise<ComponentBuildResult> {
	const config = createComponentBuildConfig("component");

	// エントリーポイントを新しい形式に変換
	const newEntryPoints = convertEntryPointMap(
		entryPoints,
		"component",
		category,
	);

	// ビルド用のエントリーポイントを生成
	const buildEntryPoints = createBuildEntryPoints(newEntryPoints, rootDir);

	const result = await build({
		...config.buildOptions,
		entryPoints: buildEntryPoints,
		external: externalDependencies,
		plugins: [createTailwindPlugin()],
	});

	return {
		category: `components/${category}`,
		result,
		metadata: {
			componentType: category,
			entryPointCount: Object.keys(entryPoints).length,
		},
	};
}

try {
	const buildResults: ComponentBuildResult[] = [];

	// コンポーネントのビルド
	for (const [category, components] of Object.entries(entryPoints.components)) {
		if (category === "features") {
			// 機能コンポーネントの個別ビルド
			for (const [feature, featureEntryPoints] of Object.entries(components)) {
				const result = await buildFeatureComponent(
					feature,
					featureEntryPoints as EntryPointMap,
				);
				buildResults.push(result);
			}
		} else {
			// 通常のコンポーネントのビルド
			const result = await buildStandardComponent(
				category,
				components as EntryPointMap,
			);
			buildResults.push(result);
		}
	}

	// プロバイダーのビルド
	for (const [category, entries] of Object.entries(entryPoints.providers)) {
		const result = await buildStandardComponent(
			`providers/${category}`,
			entries as EntryPointMap,
		);
		buildResults.push(result);
	}

	// ライブラリのビルド
	for (const [category, entries] of Object.entries(entryPoints.lib)) {
		const result = await buildStandardComponent(
			`lib/${category}`,
			entries as EntryPointMap,
		);
		buildResults.push(result);
	}

	const end = performance.now();
	const buildTime = (end - start).toFixed(2);

	// ビルド結果の出力
	for (const { category, result } of buildResults) {
		if (result.metafile) {
			const outputs = Object.entries(result.metafile.outputs).map(
				([file, info]) => ({
					Category: category,
					File: path.relative(process.cwd(), file),
					Size: formatFileSize((info as { bytes: number }).bytes),
				}),
			);
			console.table(outputs);
		}
	}

	console.log(`\n✅ Build completed in ${buildTime}ms\n`);
} catch (error) {
	console.error("Build failed:", error);
	process.exit(1);
}
