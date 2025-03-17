import { NextResponse } from 'next/server';
import { getDocTree } from '~/lib/mdx/docs';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params;
    const url = new URL(request.url);
    const subDir = url.searchParams.get('subDir');

    // ディレクトリの存在確認
    const baseDir = process.cwd();
    const contentDir = `contents/${type}`;
    const fullPath = join(baseDir, contentDir);

    if (!existsSync(fullPath)) {
      console.warn(`Directory not found: ${fullPath}`);
      return NextResponse.json([], { status: 404 });
    }

    // サブディレクトリが指定されている場合は、そのサブディレクトリのコンテンツのみを取得
    if (subDir && type === 'documents') {
      const subDirPath = join(fullPath, subDir);
      if (!existsSync(subDirPath)) {
        console.warn(`Subdirectory not found: ${subDirPath}`);
        return NextResponse.json([], { status: 404 });
      }

      const allDocs = getDocTree(`contents/${type}`);

      // 指定されたサブディレクトリに対応するDocNodeを探す
      const subDirNode = allDocs.find((item) => {
        const slugParts = item.slug?.split('/') || [];
        return slugParts[0] === subDir;
      });

      // サブディレクトリが見つかり、子要素がある場合はその子要素を返す
      if (subDirNode?.children?.length) {
        return NextResponse.json(subDirNode.children);
      }

      // サブディレクトリが見つからない場合は空の配列を返す
      return NextResponse.json([]);
    }

    // 通常のケース：すべてのドキュメントを返す
    const docTree = getDocTree(`contents/${type}`);
    return NextResponse.json(docTree);
  } catch (error) {
    console.error('Error in /api/docs/[type]:', error);
    return NextResponse.json(
      { error: 'Failed to fetch document tree' },
      { status: 500 }
    );
  }
}
