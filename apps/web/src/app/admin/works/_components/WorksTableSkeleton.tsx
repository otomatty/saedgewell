import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../../../../../../packages/components/src/components/core/table";
import { Skeleton } from "../../../../../../../packages/components/src/components/core/skeleton";
import { Checkbox } from "../../../../../../../packages/components/src/components/core/checkbox";
import { v4 as uuidv4 } from "uuid";

export function WorksTableSkeleton() {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-12">
							<Checkbox disabled />
						</TableHead>
						<TableHead>タイトル</TableHead>
						<TableHead>カテゴリー</TableHead>
						<TableHead>ステータス</TableHead>
						<TableHead>作成日時</TableHead>
						<TableHead>更新日時</TableHead>
						<TableHead className="w-12" />
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: 5 }).map(() => (
						<TableRow key={uuidv4()}>
							<TableCell>
								<Checkbox disabled />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-[200px]" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-[100px]" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-[80px]" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-[100px]" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-[100px]" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-8 w-8" />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
