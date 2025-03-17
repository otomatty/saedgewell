'use server';

import { generateGeminiResponse } from '../../lib/server/gemini';
import { generateQuestionPrompt } from '../../lib/server/gemini';
import type { EstimateFormData, AIQuestion } from '../../types/estimate';

export async function generateQuestions(
  formData: EstimateFormData
): Promise<AIQuestion[]> {
  try {
    const prompt = generateQuestionPrompt(formData);
    const response = await generateGeminiResponse(prompt);
    const { questions } = JSON.parse(response);

    return questions.map((q: AIQuestion) => ({
      ...q,
      isAnswered: false,
      answer: '',
      skipped: false,
    }));
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
}
