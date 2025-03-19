'use server';

import { SearchEngine } from '~/lib/search/engine';
import type { SearchResult, SearchOptions } from '~/types/search';
import { searchConfig } from '~/config/search.config';
import { searchLogger } from '~/lib/logger/search';

/**
 * ドキュメントを検索する
 * @param query 検索クエリ
 * @returns 検索結果の配列
 */
export async function searchDocuments(query: string): Promise<SearchResult[]> {
  try {
    const searchEngine = SearchEngine.getInstance();
    return await searchEngine.search(query, {
      searchMode: 'hybrid',
      limit: searchConfig.search.maxResults,
    });
  } catch (error) {
    searchLogger.error(error);
    return [];
  }
}

/**
 * 検索候補を取得する
 * @param query 検索クエリ
 * @param limit 取得する候補の最大数
 * @returns 検索候補の配列
 */
export async function getSuggestions(
  query: string,
  limit = 5
): Promise<SearchResult[]> {
  try {
    const searchEngine = SearchEngine.getInstance();
    return await searchEngine.search(query, {
      searchMode: 'fast',
      limit,
    });
  } catch (error) {
    searchLogger.error(error);
    return [];
  }
}
