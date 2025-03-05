"use client";

import { useEffect, useState } from "react";

interface Props {
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

/**
 * エラーバウンダリーコンポーネント
 * 子コンポーネントで発生したエラーをキャッチし、フォールバックUIを表示する
 */
export function ErrorBoundary({ children, fallback }: Props) {
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const handleError = (error: Error) => {
			console.error("エラーが発生しました:", error);
			setError(error);
		};

		window.addEventListener("error", (event) => handleError(event.error));
		window.addEventListener("unhandledrejection", (event) =>
			handleError(event.reason),
		);

		return () => {
			window.removeEventListener("error", (event) => handleError(event.error));
			window.removeEventListener("unhandledrejection", (event) =>
				handleError(event.reason),
			);
		};
	}, []);

	if (error) {
		return fallback ? (
			<>{fallback}</>
		) : (
			<div className="p-4 bg-red-50 border border-red-200 rounded-md">
				<h2 className="text-lg font-semibold text-red-800">
					エラーが発生しました
				</h2>
				<p className="mt-2 text-sm text-red-600">{error.message}</p>
			</div>
		);
	}

	return <>{children}</>;
}
