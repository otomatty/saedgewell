import { atom } from "jotai";
import type { EstimateTypes } from "@saedgewell/types";

// フォームの現在のステップ
export const currentStepAtom = atom<number>(0);

// フォームデータ
export const formDataAtom = atom<EstimateTypes.EstimateFormData>({
	projectType: "web",
	description: "",
	deadline: "flexible",
});

// AIからの追加質問
export const aiQuestionsAtom = atom<EstimateTypes.AIQuestion[]>([]);

// AI質問への回答
export const aiAnswersAtom = atom<Record<string, string | string[]>>({});

// 提案された機能リスト
export const proposedFeaturesAtom = atom<EstimateTypes.FeatureProposal[]>([]);

// 選択された機能のID
export const selectedFeatureIdsAtom = atom<string[]>([]);
