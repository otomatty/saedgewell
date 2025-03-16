import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * ドキュメントタイプのindex.jsonからタイトルとメタデータを取得するAPIエンドポイント
 * @returns {Object} ドキュメントタイプのメタデータ（タイトル、説明、アイコンなど）
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params;

    // typeパラメータには「category/docType」の形式でパスが渡される
    // 例: documents/makerkit
    const decodedType = decodeURIComponent(type);

    // パスの検証
    if (!decodedType.includes('/')) {
      return NextResponse.json(
        { error: 'Invalid path format. Expected "category/docType"' },
        { status: 400 }
      );
    }

    // パスの分解
    const parts = decodedType.split('/');
    if (parts.length !== 2) {
      return NextResponse.json(
        { error: 'Invalid path format. Expected "category/docType"' },
        { status: 400 }
      );
    }

    const [category, docType] = parts;
    if (!category || !docType) {
      return NextResponse.json(
        { error: 'Missing category or docType' },
        { status: 400 }
      );
    }

    // 許可されたカテゴリのみ処理
    const allowedCategories = ['documents', 'wiki', 'development'];
    if (!allowedCategories.includes(category)) {
      return NextResponse.json(
        { error: `Invalid category: ${category}` },
        { status: 400 }
      );
    }

    // index.jsonファイルのパス
    const indexPath = join(
      process.cwd(),
      'contents',
      category,
      docType,
      'index.json'
    );

    // ファイルの存在確認
    if (!existsSync(indexPath)) {
      return NextResponse.json(
        { error: 'Index file not found' },
        { status: 404 }
      );
    }

    // index.jsonの読み込み
    try {
      const indexContent = readFileSync(indexPath, 'utf-8');
      const indexData = JSON.parse(indexContent);

      // カテゴリ情報を追加
      const responseData = {
        ...indexData,
        category,
        docType,
      };

      return NextResponse.json(responseData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (readError) {
      console.error('Error reading index file:', readError);
      return NextResponse.json(
        { error: 'Error reading index file' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in /api/doc-index/[type]:', error);
    return NextResponse.json(
      { error: 'Failed to fetch document index' },
      { status: 500 }
    );
  }
}
