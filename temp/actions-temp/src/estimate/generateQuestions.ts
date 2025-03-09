"use server";

import { generateGeminiResponse } from "@saedgewell/lib/server";
import { generateQuestionPrompt } from "@saedgewell/lib/server";
import type { EstimateTypes } from "@saedgewell/types";

export async function generateQuestions(
	formData: EstimateTypes.EstimateFormData,
): Promise<EstimateTypes.AIQuestion[]> {
	try {
		const prompt = generateQuestionPrompt(formData);
		const response = await generateGeminiResponse(prompt);
		const { questions } = JSON.parse(response);

		return questions.map((q: EstimateTypes.AIQuestion) => ({
			...q,
			isAnswered: false,
			answer: "",
			skipped: false,
		}));
	} catch (error) {
		console.error("Error generating questions:", error);
		throw error;
	}
}
