"use client";

import { Button } from "../../core/button";
import { ResponsiveDialog } from "../../core/responsive-dialog";
import { LoginForm } from "./login-form";

export const LoginDialog = () => {
	return (
		<ResponsiveDialog
			trigger={<Button>ログインする</Button>}
			title="ログイン"
			description="ソーシャルアカウントでログインしてください"
			contentClassName="sm:max-w-[400px]"
		>
			<LoginForm />
		</ResponsiveDialog>
	);
};
