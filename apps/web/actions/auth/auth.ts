'use server';

import { getSupabaseServerClient } from '@kit/supabase/server-client';
import { revalidatePath } from 'next/cache';
import type { UserRole } from '../../types/auth';
import type { ProfileWithRole } from '../../types/profile';
/**
 * 現在のユーザーのロールを取得します
 */
export async function getCurrentUserRole(): Promise<UserRole | null> {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('roles (name)')
    .eq('id', user.id)
    .single();

  return (profile?.roles?.[0]?.name as UserRole) ?? 'user';
}

/**
 * ユーザープロフィールを作成または更新します
 */
export async function upsertProfile(userId: string, email: string) {
  const supabase = await getSupabaseServerClient();

  // トランザクションを開始
  const { error: transactionError } = await supabase.rpc('handle_new_user', {
    p_user_id: userId,
    p_email: email,
  });

  if (transactionError) {
    throw transactionError;
  }

  revalidatePath('/', 'layout');
}

/**
 * 現在のユーザーが管理者かどうかを確認します
 */
export async function checkIsAdmin(): Promise<boolean> {
  try {
    const supabase = await getSupabaseServerClient();
    const { data, error } = await supabase.rpc('check_is_admin');

    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Unexpected error in checkIsAdmin:', error);
    return false;
  }
}

/**
 * 認証状態とプロフィール情報を取得します
 * @returns {Promise<{ isAuthenticated: boolean; profile: ProfileWithRole | null }>}
 */
export async function getAuthState() {
  try {
    const supabase = await getSupabaseServerClient();

    // レスポンスのキャッシュを無効化
    const response = new Response();
    response.headers.set('Cache-Control', 'no-store');

    // セッション情報を取得
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return {
        isAuthenticated: false,
        profile: null,
      };
    }

    // プロフィール情報とロール情報を取得
    const { data: profile } = await supabase
      .from('profiles')
      .select(`
				*,
				user_roles!inner (
					roles!inner (
						name
					)
				)
			`)
      .eq('id', session.user.id)
      .single();

    if (!profile) {
      return {
        isAuthenticated: true,
        profile: null,
      };
    }

    // 管理者権限を確認（admin_usersテーブルから）
    const { data: isAdmin } = await supabase.rpc('check_is_admin');

    // ロール情報を配列に変換（user, clientのみ）
    const roles = (profile.user_roles?.map(
      (ur: { roles: { name: string } }) => {
        const roleName = ur.roles.name;
        if (roleName === 'user' || roleName === 'client') {
          return roleName;
        }
        return 'user';
      }
    ) ?? ['user']) as UserRole[];

    // デフォルトロールを設定（最初のロールをメインロールとして使用）
    const defaultRole = roles[0] ?? 'user';

    // ProfileWithRole型に変換
    const profileWithRole: ProfileWithRole = {
      id: profile.id,
      email: profile.email,
      fullName: profile.full_name ?? null,
      avatarUrl: profile.avatar_url ?? null,
      createdAt: profile.created_at,
      updatedAt: profile.updated_at,
      role: defaultRole,
      isAdmin: !!isAdmin, // admin_usersテーブルの結果を使用
      roles,
    };

    return {
      isAuthenticated: true,
      profile: profileWithRole,
    };
  } catch (error) {
    console.error('認証状態の取得に失敗しました:', error);
    return {
      isAuthenticated: false,
      profile: null,
    };
  }
}
