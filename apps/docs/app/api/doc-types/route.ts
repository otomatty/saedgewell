import { type NextRequest, NextResponse } from 'next/server';
import { getDocTypes, getDocCategories } from '~/lib/mdx/doc-types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category');
    const includeCategories = searchParams.get('includeCategories') === 'true';

    // ドキュメントタイプを取得
    const docTypes = getDocTypes(undefined, categoryId || undefined);

    // カテゴリを含める場合
    if (includeCategories) {
      const categories = getDocCategories();
      return NextResponse.json({
        docTypes,
        categories,
      });
    }

    return NextResponse.json(docTypes);
  } catch (error) {
    console.error('Error in /api/doc-types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch document types' },
      { status: 500 }
    );
  }
}
