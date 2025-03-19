import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

import { createAuthCallbackService } from '@kit/supabase/auth';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

import pathsConfig from '~/config/paths.config';

export async function GET(request: NextRequest) {
  const service = createAuthCallbackService(getSupabaseServerClient());
  const supabase = getSupabaseServerClient();

  const { nextPath } = await service.exchangeCodeForSession(request, {
    redirectPath: pathsConfig.app.home,
  });

  // 認証状態を確認してコンソールに出力
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) {
    console.log('認証状態: 未認証です');
  } else {
    console.log('認証状態: 認証済み', {
      user,
      nextPath,
    });
  }

  if (error) {
    console.error('認証エラーが発生しました:', error);
  }

  return redirect(nextPath);
}
