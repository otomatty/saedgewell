import { NextResponse } from 'next/server';
import { getDocTree } from '~/lib/mdx/docs';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { type } = await params;
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
