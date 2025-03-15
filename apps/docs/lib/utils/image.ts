/**
 * 画像URL最適化ユーティリティ
 */

/**
 * デフォルト画像パス
 */
export const DEFAULT_THUMBNAIL_PATH = '/thumbnails/no-image.webp';

/**
 * URLがWebサイトのURLかどうかを判断する
 * @param url URL
 * @returns WebサイトのURLかどうか
 */
function isWebsiteUrl(url: string): boolean {
  // URLが http:// または https:// で始まり、画像ファイル拡張子で終わらない場合はWebサイトのURL
  return (
    (url.startsWith('http://') || url.startsWith('https://')) &&
    !url.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i) &&
    !url.includes('gyazo.com') &&
    !url.includes('i.gyazo.com')
  );
}

/**
 * WebサイトのURLからOGP画像を取得するURLを生成する
 * @param url WebサイトのURL
 * @returns OGP画像取得APIのURL
 */
function getOgImageUrl(url: string): string {
  // URLをエンコード
  const encodedUrl = encodeURIComponent(url);
  // OGP画像取得APIのURLを返す
  return `/api/og-image?url=${encodedUrl}`;
}

/**
 * 画像URLをプロキシするかどうかを判断する
 * @param url 画像URL
 * @returns プロキシが必要かどうか
 */
function shouldProxyImage(url: string): boolean {
  // 相対パスの場合はプロキシ不要
  if (url.startsWith('/')) {
    return false;
  }

  // Gyazo画像はプロキシ不要（next.config.mjsで許可済み）
  if (url.includes('gyazo.com') || url.includes('i.gyazo.com')) {
    return false;
  }

  // その他のURLはプロキシ必要
  return true;
}

/**
 * 画像URLをプロキシAPIを通して取得するURLに変換する
 * @param url 元の画像URL
 * @returns プロキシAPI経由のURL
 */
function getProxiedImageUrl(url: string): string {
  // URLをエンコード
  const encodedUrl = encodeURIComponent(url);
  // プロキシAPIのURLを返す
  return `/api/proxy-image?url=${encodedUrl}`;
}

/**
 * Gyazo URLを適切な画像URLに変換する関数
 * @param url Gyazo URL
 * @param width 希望する画像の幅
 * @returns 最適化されたGyazo画像URL
 */
function optimizeGyazoUrl(url: string, width = 1200): string {
  // すでに i.gyazo.com 形式の場合は、サイズパラメータを追加
  if (url.includes('i.gyazo.com')) {
    // URLにクエリパラメータがあるかチェック
    const hasQuery = url.includes('?');
    // 適切なサイズパラメータを追加
    return `${url}${hasQuery ? '&' : '?'}w=${width}`;
  }

  // 通常の gyazo.com/ID 形式を i.gyazo.com/ID.png に変換し、サイズパラメータを追加
  if (url.includes('gyazo.com/')) {
    const id = url.split('gyazo.com/')[1];
    return `https://i.gyazo.com/${id}.png?w=${width}`;
  }

  return url;
}

/**
 * 画像URLを最適化する関数
 * 適用順序:
 * 1. OGP画像を取得
 * 2. Gyazoから画像を取得
 * 3. public/thumbnailsから取得
 * 4. 画像が取得できない場合はno-image.webpを表示
 *
 * @param url 元の画像URL
 * @param width 希望する画像の幅（Gyazo画像のみ適用）
 * @returns 最適化された画像URL
 */
export async function optimizeImageUrl(
  url: string,
  width = 1200
): Promise<string> {
  // URLが指定されていない場合はデフォルト画像を返す
  if (!url) {
    return DEFAULT_THUMBNAIL_PATH;
  }

  // 1. WebサイトのURLの場合はOGP画像を取得
  if (isWebsiteUrl(url)) {
    try {
      // 相対パスを絶対パスに変換
      const baseUrl =
        typeof window !== 'undefined'
          ? window.location.origin
          : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

      const absoluteOgImageUrl = new URL(
        getOgImageUrl(url),
        baseUrl
      ).toString();
      const response = await fetch(absoluteOgImageUrl);

      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          // OGP画像が見つかった場合、その画像をプロキシする
          return getProxiedImageUrl(data.url);
        }
      }
      // OGP画像が見つからなかった場合はデフォルト画像を返す
      return DEFAULT_THUMBNAIL_PATH;
    } catch (error) {
      console.error('Error fetching OGP image:', error);
      return DEFAULT_THUMBNAIL_PATH;
    }
  }

  // 2. Gyazo画像の場合は最適化
  if (url.includes('gyazo.com') || url.includes('i.gyazo.com')) {
    return optimizeGyazoUrl(url, width);
  }

  // 3. /thumbnails/ で始まる相対パスの場合、publicディレクトリからの参照とみなす
  if (url.startsWith('/thumbnails/')) {
    return url;
  }

  // 4. その他の画像URLの場合はプロキシを通して取得
  if (shouldProxyImage(url)) {
    return getProxiedImageUrl(url);
  }

  // それ以外の場合はそのまま返す
  return url;
}

/**
 * 同期的に画像URLを最適化する関数（非同期処理が使えない場合用）
 * @param url 元の画像URL
 * @param width 希望する画像の幅（Gyazo画像のみ適用）
 * @returns 最適化された画像URL
 */
export function optimizeImageUrlSync(url: string, width = 1200): string {
  // URLが指定されていない場合はデフォルト画像を返す
  if (!url) {
    return DEFAULT_THUMBNAIL_PATH;
  }

  // WebサイトのURLの場合は同期的に処理できないのでプロキシAPIを使用
  if (isWebsiteUrl(url)) {
    return getOgImageUrl(url);
  }

  // Gyazo画像の場合は最適化
  if (url.includes('gyazo.com') || url.includes('i.gyazo.com')) {
    return optimizeGyazoUrl(url, width);
  }

  // /thumbnails/ で始まる相対パスの場合、publicディレクトリからの参照とみなす
  if (url.startsWith('/thumbnails/')) {
    return url;
  }

  // その他の画像URLの場合はプロキシを通して取得
  if (shouldProxyImage(url)) {
    return getProxiedImageUrl(url);
  }

  // それ以外の場合はそのまま返す
  return url;
}

/**
 * 画像のプレースホルダーSVGをBase64エンコードした文字列を生成する
 * @param width 画像の幅
 * @param height 画像の高さ
 * @param color 背景色
 * @returns Base64エンコードされたSVG
 */
export function generatePlaceholderImage(
  width = 1200,
  height = 675,
  color = '#f2f2f2'
): string {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="${width}" height="${height}" fill="${color}"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * 16:9のアスペクト比に基づいて高さを計算する
 * @param width 画像の幅
 * @returns 16:9のアスペクト比に基づいた高さ
 */
export function calculateAspectRatioHeight(width: number): number {
  return Math.round((width * 9) / 16);
}
