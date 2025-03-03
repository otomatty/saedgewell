"use client";

import { useToast } from "@saedgewell/hooks";
import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "../toast";

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider>
			{toasts.map(
				({
					id,
					title,
					description,
					action,
					variant,
					className,
					open,
					onOpenChange,
				}) => {
					// variant を "default" | "destructive" に制限
					const toastVariant =
						variant === "default" || variant === "destructive"
							? variant
							: "default";

					return (
						<Toast
							key={id}
							variant={toastVariant}
							className={className}
							open={open}
							onOpenChange={onOpenChange}
						>
							<div className="grid gap-1">
								{title && <ToastTitle>{title}</ToastTitle>}
								{description && (
									<ToastDescription>
										{typeof description === "string"
											? description
											: String(description)}
									</ToastDescription>
								)}
							</div>
							{action}
							<ToastClose />
						</Toast>
					);
				},
			)}
			<ToastViewport />
		</ToastProvider>
	);
}
