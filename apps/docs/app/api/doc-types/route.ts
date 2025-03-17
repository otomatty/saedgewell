import { type NextRequest, NextResponse } from 'next/server';
import { getDocTypes, getDocCategories } from '~/lib/mdx/doc-types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category');
    const includeCategories = searchParams.get('includeCategories') === 'true';
    const id = searchParams.get('id');

    // ドキュメントタイプを取得
    const docTypes = getDocTypes(undefined, categoryId || undefined);

    // IDが指定されている場合は、そのIDに一致するドキュメントタイプのみを返す
    if (id) {
      const docType = docTypes.find((doc) => doc.id === id);
      if (docType) {
        return NextResponse.json(docType);
      }
      // ドキュメントタイプが見つからない場合は、IDをタイトルとして使用したデフォルト値を返す
      return NextResponse.json({
        id,
        title: id.charAt(0).toUpperCase() + id.slice(1),
        category: 'documents',
      });
    }

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
