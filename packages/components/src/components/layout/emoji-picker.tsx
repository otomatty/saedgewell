import { useState } from "react";
import { Button } from "../core/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../core/dialog";
import { Input } from "../core/input";
import { suggestEmojis } from "@saedgewell/actions";
import { Sparkles } from "lucide-react";
import { useToast } from "@saedgewell/hooks";

interface EmojiPickerProps {
	value: string;
	onChange: (emoji: string) => void;
}

export function EmojiPicker({ value, onChange }: EmojiPickerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();

	// AIによる絵文字提案
	const handleSuggest = async () => {
		if (!searchTerm) return;

		setIsLoading(true);
		try {
			const { emojis, error } = await suggestEmojis(searchTerm);
			if (error) {
				toast({
					title: "エラー",
					description: "絵文字の提案中にエラーが発生しました",
					variant: "destructive",
				});
			} else {
				setSuggestions(emojis);
			}
		} catch (error) {
			toast({
				title: "エラー",
				description: "絵文字の提案中にエラーが発生しました",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleSelect = (emoji: string) => {
		onChange(emoji);
		setIsOpen(false);
		setSearchTerm("");
		setSuggestions([]);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" className="w-[60px] text-2xl">
					{value || "😀"}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[400px]">
				<DialogHeader>
					<DialogTitle>絵文字を選択</DialogTitle>
				</DialogHeader>
				<div className="space-y-4 pt-4">
					<div className="flex gap-2">
						<Input
							placeholder="テキストを入力して絵文字を提案..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									handleSuggest();
								}
							}}
						/>
						<Button
							variant="secondary"
							size="icon"
							className="shrink-0"
							onClick={handleSuggest}
							disabled={!searchTerm || isLoading}
						>
							<Sparkles className="h-4 w-4" />
						</Button>
					</div>

					{isLoading ? (
						<div className="text-center py-8 text-muted-foreground">
							絵文字を提案中...
						</div>
					) : suggestions.length > 0 ? (
						<div className="grid grid-cols-5 gap-3">
							{suggestions.map((emoji) => (
								<Button
									key={emoji}
									variant="outline"
									className="h-12 text-2xl hover:bg-muted"
									onClick={() => handleSelect(emoji)}
								>
									{emoji}
								</Button>
							))}
						</div>
					) : searchTerm ? (
						<div className="text-center py-8 text-muted-foreground">
							✨ボタンをクリックして絵文字を提案
						</div>
					) : (
						<div className="text-center py-8 text-muted-foreground">
							テキストを入力して絵文字を提案してもらいましょう
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
