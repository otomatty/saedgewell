import { NextResponse } from 'next/server';
import { getDocTree } from '~/lib/docs';

export async function GET() {
  const docTree = getDocTree();
  return NextResponse.json(docTree);
}
