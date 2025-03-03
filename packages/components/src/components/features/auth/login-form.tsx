"use client";

import { useState } from "react";
import { Button } from "../../core/button";
import { signInWithGoogle, signInWithGithub } from "@saedgewell/actions";
import { useToast } from "@saedgewell/hooks";
import { Loader2 } from "lucide-react";
import { GoogleIcon, GitHubIcon } from "../../core/icons";

export const LoginForm = () => {
	const [isLoading, setIsLoading] = useState<{
		google: boolean;
		github: boolean;
	}>({
		google: false,
		github: false,
	});
	const { toast } = useToast();

	const handleGoogleLogin = async () => {
		try {
			setIsLoading((prev) => ({ ...prev, google: true }));
			await signInWithGoogle();
		} catch (error) {
			console.error(error);
			toast({
				title: "エラーが発生しました",
				description:
					"Googleログインに失敗しました。時間をおいて再度お試しください。",
				variant: "destructive",
			});
		} finally {
			setIsLoading((prev) => ({ ...prev, google: false }));
		}
	};

	const handleGithubLogin = async () => {
		try {
			setIsLoading((prev) => ({ ...prev, github: true }));
			await signInWithGithub();
		} catch (error) {
			console.error(error);
			toast({
				title: "エラーが発生しました",
				description:
					"GitHubログインに失敗しました。時間をおいて再度お試しください。",
				variant: "destructive",
			});
		} finally {
			setIsLoading((prev) => ({ ...prev, github: false }));
		}
	};

	return (
		<div className="w-full max-w-md flex flex-col gap-4">
			<Button
				variant="outline"
				onClick={handleGoogleLogin}
				disabled={isLoading.google || isLoading.github}
				className="w-full"
			>
				{isLoading.google ? (
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<GoogleIcon className="mr-2 h-4 w-4" />
				)}
				Googleでログイン
			</Button>
			<Button
				variant="outline"
				onClick={handleGithubLogin}
				disabled={isLoading.google || isLoading.github}
				className="w-full"
			>
				{isLoading.github ? (
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<GitHubIcon className="mr-2 h-4 w-4" />
				)}
				GitHubでログイン
			</Button>
		</div>
	);
};
