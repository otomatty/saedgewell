/**
 * Next.jsミドルウェアファイル
 *
 * このファイルはリクエストがルートハンドラーに到達する前に実行される処理を定義します。
 * 認証状態の確認、CSRF保護、リクエストIDの設定などを行い、
 * 適切なリダイレクトやヘッダー設定を行います。
 */

import type { NextRequest } from 'next/server';
import { NextResponse, URLPattern } from 'next/server';

import { CsrfError, createCsrfProtect } from '@edge-csrf/nextjs';

import { checkRequiresMultiFactorAuthentication } from '@kit/supabase/check-requires-mfa';
import { createMiddlewareClient } from '@kit/supabase/middleware-client';

import appConfig from '~/config/app.config';
import pathsConfig from '~/config/paths.config';

// CSRFトークンを保存するCookie名
const CSRF_SECRET_COOKIE = 'csrfSecret';
// Next.jsのサーバーアクションを識別するためのヘッダー名
const NEXT_ACTION_HEADER = 'next-action';

/**
 * ミドルウェアが適用されるパスのマッチャー設定
 * 静的ファイルや画像、APIルートなどを除外
 */
export const config = {
  matcher: ['/((?!_next/static|_next/image|images|locales|assets|api/*).*)'],
};

/**
 * ユーザー情報を取得する関数
 *
 * @param request - Nextリクエストオブジェクト
 * @param response - Nextレスポンスオブジェクト
 * @returns Supabaseから取得したユーザー情報
 */
const getUser = (request: NextRequest, response: NextResponse) => {
  const supabase = createMiddlewareClient(request, response);

  return supabase.auth.getUser();
};

/**
 * ミドルウェア関数
 * 全てのリクエストに対して実行される
 *
 * @param request - Nextリクエストオブジェクト
 * @returns Nextレスポンスオブジェクト
 */
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 各リクエストに一意のIDを設定
  // これによりログやトレースでリクエストを追跡できる
  setRequestId(request);

  // 変更を伴うリクエストに対してCSRF保護を適用
  const csrfResponse = await withCsrfMiddleware(request, response);

  // 特定のルートパターンに対するハンドラーを取得
  const handlePattern = matchUrlPattern(request.url);

  // パターンハンドラーが存在する場合、それを実行
  if (handlePattern) {
    const patternHandlerResponse = await handlePattern(request, csrfResponse);

    // パターンハンドラーがレスポンスを返した場合、それを返す
    if (patternHandlerResponse) {
      return patternHandlerResponse;
    }
  }

  // サーバーアクションの場合、アクションパスをヘッダーに追加
  // これによりサーバーアクション内でパスを知ることができる
  if (isServerAction(request)) {
    csrfResponse.headers.set('x-action-path', request.nextUrl.pathname);
  }

  // パターンハンドラーがレスポンスを返さなかった場合、
  // CSRFミドルウェアで処理されたレスポンスを返す
  return csrfResponse;
}

/**
 * CSRF保護ミドルウェア
 *
 * @param request - Nextリクエストオブジェクト
 * @param response - Nextレスポンスオブジェクト（デフォルトは新しいレスポンス）
 * @returns CSRF保護が適用されたレスポンス
 */
async function withCsrfMiddleware(
  request: NextRequest,
  response = new NextResponse()
) {
  // CSRF保護の設定
  const csrfProtect = createCsrfProtect({
    cookie: {
      secure: appConfig.production, // 本番環境ではセキュアCookieを使用
      name: CSRF_SECRET_COOKIE, // CSRFシークレットを保存するCookie名
    },
    // サーバーアクションの場合はPOSTメソッドをCSRF検証から除外（Next.jsに組み込み保護があるため）
    // それ以外の場合は常にGET、HEAD、OPTIONSメソッドを除外
    ignoreMethods: isServerAction(request)
      ? ['POST']
      : ['GET', 'HEAD', 'OPTIONS'],
  });

  try {
    // リクエストにCSRF保護を適用
    await csrfProtect(request, response);

    return response;
  } catch (error) {
    // CSRFエラーの場合、401（認証エラー）レスポンスを返す
    if (error instanceof CsrfError) {
      return NextResponse.json('Invalid CSRF token', {
        status: 401,
      });
    }

    // その他のエラーは再スロー
    throw error;
  }
}

/**
 * リクエストがサーバーアクションかどうかを判定する関数
 *
 * @param request - Nextリクエストオブジェクト
 * @returns サーバーアクションの場合はtrue
 */
function isServerAction(request: NextRequest) {
  const headers = new Headers(request.headers);

  return headers.has(NEXT_ACTION_HEADER);
}

/**
 * URLパターンとそれに対応するハンドラーを定義
 *
 * @returns パターンとハンドラーのペアの配列
 */
function getPatterns() {
  return [
    {
      // 認証関連のパスに対するパターン
      pattern: new URLPattern({ pathname: '/auth/*?' }),
      handler: async (req: NextRequest, res: NextResponse) => {
        const {
          data: { user },
        } = await getUser(req, res);

        // ユーザーがログアウト状態の場合、何もしない
        if (!user) {
          return;
        }

        // MFA検証ページかどうかを確認
        // （ユーザーは認証済みだがMFA検証が必要な場合）
        const isVerifyMfa = req.nextUrl.pathname === pathsConfig.auth.verifyMfa;

        // ユーザーがログイン済みでMFA検証が不要な場合、
        // ホームページにリダイレクト
        if (!isVerifyMfa) {
          return NextResponse.redirect(
            new URL(pathsConfig.app.home, req.nextUrl.origin).href
          );
        }
      },
    },
    {
      // 認証が必要なパスに対するパターン
      // /home/から始まるパスのみ認証を要求する
      pattern: new URLPattern({ pathname: '/home/*?' }),
      handler: async (req: NextRequest, res: NextResponse) => {
        const {
          data: { user },
        } = await getUser(req, res);

        const origin = req.nextUrl.origin;
        const next = req.nextUrl.pathname;

        // ユーザーがログインしていない場合、サインインページにリダイレクト
        // 現在のパスをnextクエリパラメータとして渡す（ログイン後のリダイレクト先として）
        if (!user) {
          const signIn = pathsConfig.auth.signIn;
          const redirectPath = `${signIn}?next=${next}`;

          return NextResponse.redirect(new URL(redirectPath, origin).href);
        }

        const supabase = createMiddlewareClient(req, res);

        // ユーザーがMFA認証を必要とするか確認
        const requiresMultiFactorAuthentication =
          await checkRequiresMultiFactorAuthentication(supabase);

        // MFA認証が必要な場合、MFA検証ページにリダイレクト
        if (requiresMultiFactorAuthentication) {
          return NextResponse.redirect(
            new URL(pathsConfig.auth.verifyMfa, origin).href
          );
        }
      },
    },
  ];
}

/**
 * URLパターンに一致するハンドラーを見つける関数
 *
 * @param url - 検査するURL
 * @returns 一致するハンドラー関数、または undefined
 */
function matchUrlPattern(url: string) {
  const patterns = getPatterns();
  const input = url.split('?')[0]; // クエリパラメータを除去

  // 全てのパターンをチェックし、一致するものがあればそのハンドラーを返す
  for (const pattern of patterns) {
    const patternResult = pattern.pattern.exec(input);

    if (patternResult !== null && 'pathname' in patternResult) {
      return pattern.handler;
    }
  }
}

/**
 * リクエストに一意のIDを設定する関数
 *
 * @param request - リクエストオブジェクト
 */
function setRequestId(request: Request) {
  request.headers.set('x-correlation-id', crypto.randomUUID());
}
