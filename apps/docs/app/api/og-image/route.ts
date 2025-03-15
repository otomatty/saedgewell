import { type NextRequest, NextResponse } from 'next/server';
import { DEFAULT_THUMBNAIL_PATH } from '~/lib/utils/image';

/**
 * OGP画像取得API
 * 指定されたURLからOGP画像を取得する
 * @param request リクエスト
 * @returns OGP画像のURL
 */
export async function GET(request: NextRequest) {
  try {
    // URLパラメータからWebサイトのURLを取得
    const url = request.nextUrl.searchParams.get('url');

    // URLが指定されていない場合はエラー
    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    // URLをデコード
    const decodedUrl = decodeURIComponent(url);

    // HTMLを取得
    const response = await fetch(decodedUrl, {
      headers: {
        // 一般的なブラウザのUser-Agentを設定
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    // レスポンスが成功しなかった場合はエラー
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch HTML: ${response.status}` },
        { status: response.status }
      );
    }

    // HTMLを取得
    const html = await response.text();

    // OGP画像のURLを抽出
    const ogImageUrl = extractOgImage(html, decodedUrl);

    // OGP画像が見つからなかった場合
    if (!ogImageUrl) {
      return NextResponse.json(
        { error: 'OGP image not found', fallback: DEFAULT_THUMBNAIL_PATH },
        { status: 404 }
      );
    }

    // OGP画像のURLを返す
    return NextResponse.json({ url: ogImageUrl });
  } catch (error) {
    console.error('Error fetching OGP image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch OGP image', fallback: DEFAULT_THUMBNAIL_PATH },
      { status: 500 }
    );
  }
}

/**
 * HTMLからOGP画像のURLを抽出する
 * @param html HTML
 * @param baseUrl ベースURL（相対パスを絶対パスに変換するため）
 * @returns OGP画像のURL
 */
function extractOgImage(html: string, baseUrl: string): string | null {
  // og:image メタタグを検索
  const ogImageRegex1 =
    /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i;
  const ogImageRegex2 =
    /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i;

  const ogImageMatch1 = html.match(ogImageRegex1);
  const ogImageMatch2 = html.match(ogImageRegex2);
  const ogImageMatch = ogImageMatch1 || ogImageMatch2;

  if (ogImageMatch?.[1]) {
    const ogImageUrl = ogImageMatch[1];

    // 相対パスの場合は絶対パスに変換
    if (ogImageUrl.startsWith('/')) {
      try {
        const baseUrlObj = new URL(baseUrl);
        const absoluteOgUrl = `${baseUrlObj.origin}${ogImageUrl}`;
        return absoluteOgUrl;
      } catch (e) {
        console.error('Error parsing base URL:', e);
        return ogImageUrl;
      }
    }

    return ogImageUrl;
  }

  // Twitter Card 画像を検索
  const twitterImageRegex1 =
    /<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["'][^>]*>/i;
  const twitterImageRegex2 =
    /<meta[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["'][^>]*>/i;

  const twitterImageMatch1 = html.match(twitterImageRegex1);
  const twitterImageMatch2 = html.match(twitterImageRegex2);
  const twitterImageMatch = twitterImageMatch1 || twitterImageMatch2;

  if (twitterImageMatch?.[1]) {
    const twitterImageUrl = twitterImageMatch[1];

    // 相対パスの場合は絶対パスに変換
    if (twitterImageUrl.startsWith('/')) {
      try {
        const baseUrlObj = new URL(baseUrl);
        const absoluteTwitterUrl = `${baseUrlObj.origin}${twitterImageUrl}`;
        return absoluteTwitterUrl;
      } catch (e) {
        console.error('Error parsing base URL:', e);
        return twitterImageUrl;
      }
    }

    return twitterImageUrl;
  }

  return null;
}
