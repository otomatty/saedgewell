"use server";

import { createClient } from "@saedgewell/lib/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { UserRole, ProfileWithRole } from "@saedgewell/types";

/**
 * OAuth認証（Google）を実行します
 */
export async function signInWithGoogle() {
	const supabase = await createClient();
	const redirectUrl =
		process.env.NODE_ENV === "production"
			? `${process.env.NEXT_PUBLIC_PROD_URL}/auth/callback`
			: `${process.env.NEXT_PUBLIC_DEV_URL}/auth/callback`;

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "google",
		options: {
			redirectTo: redirectUrl,
			queryParams: {
				access_type: "offline",
				prompt: "consent",
			},
		},
	});

	if (error) {
		throw error;
	}

	if (data.url) {
		redirect(data.url);
	}
}

/**
 * OAuth認証（GitHub）を実行します
 */
export async function signInWithGithub() {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "github",
		options: {
			redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
		},
	});

	if (error) {
		throw error;
	}

	if (data.url) {
		redirect(data.url);
	}
}

/**
 * サインアウトを実行します
 * @throws {Error} サインアウトに失敗した場合
 */
export async function signOut() {
	try {
		const supabase = await createClient();
		const { error } = await supabase.auth.signOut();

		if (error) {
			throw error;
		}

		// キャッシュを無効化し、ルートページにリダイレクト
		revalidatePath("/", "layout");
		redirect("/");
	} catch (error) {
		console.error("サインアウトに失敗しました:", error);
		throw error;
	}
}

/**
 * 現在のユーザーのロールを取得します
 */
export async function getCurrentUserRole(): Promise<UserRole | null> {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return null;
	}

	const { data: profile } = await supabase
		.from("profiles")
		.select("roles (name)")
		.eq("id", user.id)
		.single();

	return (profile?.roles?.[0]?.name as UserRole) ?? "user";
}

/**
 * ユーザープロフィールを作成または更新します
 */
export async function upsertProfile(userId: string, email: string) {
	const supabase = await createClient();

	// トランザクションを開始
	const { error: transactionError } = await supabase.rpc("handle_new_user", {
		p_user_id: userId,
		p_email: email,
	});

	if (transactionError) {
		throw transactionError;
	}

	revalidatePath("/", "layout");
}

/**
 * 現在のユーザーが管理者かどうかを確認します
 */
export async function checkIsAdmin(): Promise<boolean> {
	try {
		const supabase = await createClient();
		const { data, error } = await supabase.rpc("check_is_admin");

		if (error) {
			console.error("Error checking admin status:", error);
			return false;
		}

		return !!data;
	} catch (error) {
		console.error("Unexpected error in checkIsAdmin:", error);
		return false;
	}
}

/**
 * 認証状態とプロフィール情報を取得します
 * @returns {Promise<{ isAuthenticated: boolean; profile: ProfileWithRole | null }>}
 */
export async function getAuthState() {
	try {
		const supabase = await createClient();

		// レスポンスのキャッシュを無効化
		const response = new Response();
		response.headers.set("Cache-Control", "no-store");

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
			.from("profiles")
			.select(`
				*,
				user_roles!inner (
					roles!inner (
						name
					)
				)
			`)
			.eq("id", session.user.id)
			.single();

		if (!profile) {
			return {
				isAuthenticated: true,
				profile: null,
			};
		}

		// 管理者権限を確認（admin_usersテーブルから）
		const { data: isAdmin } = await supabase.rpc("check_is_admin");

		// ロール情報を配列に変換（user, clientのみ）
		const roles = (profile.user_roles?.map(
			(ur: { roles: { name: string } }) => {
				const roleName = ur.roles.name;
				if (roleName === "user" || roleName === "client") {
					return roleName;
				}
				return "user";
			},
		) ?? ["user"]) as UserRole[];

		// デフォルトロールを設定（最初のロールをメインロールとして使用）
		const defaultRole = roles[0] ?? "user";

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
		console.error("認証状態の取得に失敗しました:", error);
		return {
			isAuthenticated: false,
			profile: null,
		};
	}
}
