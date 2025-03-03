"use client";

import { useState, useEffect } from "react";
import { Button } from "../../core/button";
import { Mail } from "lucide-react";
import { startGmailAuth, checkGmailAuthStatus } from "@saedgewell/actions";

export function GmailAuthButton() {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	// 認証状態を確認する
	useEffect(() => {
		const checkAuth = async () => {
			try {
				setIsLoading(true);
				const status = await checkGmailAuthStatus();
				setIsAuthenticated(status.authenticated);
				if (!status.authenticated && status.error) {
					setError(new Error(status.error));
				} else {
					setError(null);
				}
			} catch (err) {
				setError(
					err instanceof Error
						? err
						: new Error("認証状態の確認中にエラーが発生しました"),
				);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []);

	// 認証を開始する
	const handleStartAuth = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const result = await startGmailAuth();
			if (result.url) {
				// 認証URLにリダイレクト
				window.location.href = result.url;
			} else if (result.error) {
				setError(new Error(result.error));
			}
		} catch (err) {
			setError(
				err instanceof Error
					? err
					: new Error("認証の開始中にエラーが発生しました"),
			);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<Button disabled variant="outline">
				<Mail className="mr-2 h-4 w-4" />
				読み込み中...
			</Button>
		);
	}

	if (isAuthenticated) {
		return (
			<Button variant="outline" className="text-green-600">
				<Mail className="mr-2 h-4 w-4" />
				Gmail連携済み
			</Button>
		);
	}

	return (
		<Button onClick={handleStartAuth} variant="outline">
			<Mail className="mr-2 h-4 w-4" />
			{error ? "再認証" : "Gmailと連携"}
		</Button>
	);
}
