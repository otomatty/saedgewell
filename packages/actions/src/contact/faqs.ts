"use server";

import { createClient } from "@saedgewell/lib/server";
import type { ContactTypes } from "@saedgewell/types";

/**
 * カテゴリに紐づくFAQ一覧を取得する
 */
export async function getFAQsByCategory(
	categoryId: string,
): Promise<ContactTypes.Faq[]> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("faqs")
		.select("*")
		.eq("category_id", categoryId)
		.order("created_at", { ascending: true });

	if (error) {
		console.error("Error fetching FAQs:", error);
		throw new Error("FAQの取得に失敗しました");
	}

	return data;
}

/**
 * FAQを取得する
 */
export async function getFAQ(id: string): Promise<ContactTypes.Faq | null> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("faqs")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		console.error("Error fetching FAQ:", error);
		throw new Error("FAQの取得に失敗しました");
	}

	return data;
}

/**
 * キーワードでFAQを検索する
 */
export async function searchFAQs(keyword: string): Promise<ContactTypes.Faq[]> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("faqs")
		.select("*")
		.or(`question.ilike.%${keyword}%,answer.ilike.%${keyword}%`)
		.order("created_at", { ascending: true });

	if (error) {
		console.error("Error searching FAQs:", error);
		throw new Error("FAQの検索に失敗しました");
	}

	return data;
}
