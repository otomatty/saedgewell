"use client";

import { useEffect } from "react";
import { Button } from "@saedgewell/components/core/button";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main className="flex min-h-screen items-center justify-center bg-linear-to-b from-background to-muted">
			<div className="container relative z-10 py-20">
				<div className="mx-auto max-w-2xl text-center">
					<h1 className="mb-8 text-4xl font-bold tracking-tight md:text-6xl">
						エラーが発生しました
					</h1>
					<p className="mb-12 text-lg text-muted-foreground">
						申し訳ありません。予期せぬエラーが発生しました。
						<br />
						時間をおいて再度お試しください。
					</p>
					<div className="flex justify-center gap-4">
						<Button onClick={() => reset()}>再試行</Button>
						<Button variant="outline" onClick={() => window.location.reload()}>
							ページを再読み込み
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
}
