import * as React$1 from 'react';
import { ColumnDef, Row, PaginationState, SortingState } from '@tanstack/react-table';
import { Table } from '../shadcn/table.js';

interface ReactTableProps<T extends object> {
    data: T[];
    columns: ColumnDef<T>[];
    renderSubComponent?: (props: {
        row: Row<T>;
    }) => React.ReactElement;
    pageIndex?: number;
    pageSize?: number;
    pageCount?: number;
    onPaginationChange?: (pagination: PaginationState) => void;
    onSortingChange?: (sorting: SortingState) => void;
    manualPagination?: boolean;
    manualSorting?: boolean;
    sorting?: SortingState;
    tableProps?: React.ComponentProps<typeof Table> & Record<`data-${string}`, string>;
}
declare function DataTable<T extends object>({ data, columns, pageIndex, pageSize, pageCount, onPaginationChange, onSortingChange, tableProps, manualPagination, manualSorting, sorting: initialSorting, }: ReactTableProps<T>): React$1.JSX.Element;

export { DataTable };
