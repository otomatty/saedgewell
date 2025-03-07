"use server";

import { generateGeminiResponse } from "@saedgewell/lib/server";
import { generateDescriptionPrompt } from "@saedgewell/lib/server";
import type { EstimateTypes } from "@saedgewell/types";

export interface DescriptionExample {
	title: string;
	description: string;
	features: string[];
	targetUsers: string[];
	references: string[];
}

export async function generateDescriptionExamples(
	projectType: EstimateTypes.ProjectType,
	currentDescription?: string,
): Promise<DescriptionExample[]> {
	try {
		const prompt = generateDescriptionPrompt(projectType, currentDescription);
		const response = await generateGeminiResponse(prompt);
		const { examples } = JSON.parse(response);

		return examples;
	} catch (error) {
		console.error("Error generating description examples:", error);
		throw error;
	}
}
