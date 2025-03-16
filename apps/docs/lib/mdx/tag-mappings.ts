/**
 * タグのマッピング定義
 * タグIDと表示名のマッピングを管理します
 */

// タグのマッピング定義
export const TAG_MAPPINGS = {
  // タイプタグ
  type: {
    book: '書籍',
    project: 'プロジェクト',
    official: '公式ドキュメント',
    business: 'ビジネス',
  },
  // 技術タグ
  tech: {
    nextjs: 'Next.js',
    react: 'React',
    supabase: 'Supabase',
  },
} as const;

/**
 * タグIDから表示名を取得する
 * @param tagId タグID
 * @param tagType タグタイプ（'type' または 'tech'）
 * @returns タグの表示名
 */
export function getTagDisplayName(
  tagId: string,
  tagType?: 'type' | 'tech'
): string {
  // タグタイプが指定されている場合はそのタイプのマッピングから検索
  if (tagType && tagType in TAG_MAPPINGS) {
    const mapping = TAG_MAPPINGS[tagType as keyof typeof TAG_MAPPINGS];
    if (tagId in mapping) {
      return mapping[tagId as keyof typeof mapping];
    }
  }

  // タグタイプが指定されていない場合は全てのマッピングから検索
  for (const type in TAG_MAPPINGS) {
    const mapping = TAG_MAPPINGS[type as keyof typeof TAG_MAPPINGS];
    if (tagId in mapping) {
      return mapping[tagId as keyof typeof mapping];
    }
  }

  // マッピングが見つからない場合はタグIDをそのまま返す
  return tagId;
}
