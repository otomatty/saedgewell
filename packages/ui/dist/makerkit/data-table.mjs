import { useReactTable, getSortedRowModel, getCoreRowModel, flexRender } from '../chunk-RR3VKBDK.mjs';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '../chunk-UMBUNEHG.mjs';
import { Trans } from '../chunk-IOTGEBOC.mjs';
import { Button } from '../chunk-BSMUWSCW.mjs';
import '../chunk-WKYHJYPA.mjs';
import { __spreadValues } from '../chunk-C5AMXPVO.mjs';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

function DataTable({
  data,
  columns,
  pageIndex,
  pageSize,
  pageCount,
  onPaginationChange,
  onSortingChange,
  tableProps,
  manualPagination = true,
  manualSorting = false,
  sorting: initialSorting
}) {
  var _a;
  const [pagination, setPagination] = useState({
    pageIndex: pageIndex != null ? pageIndex : 0,
    pageSize: pageSize != null ? pageSize : 15
  });
  const [sorting, setSorting] = useState(initialSorting != null ? initialSorting : []);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const navigateToPage = useNavigateToNewPage();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination,
    manualSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    pageCount,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    },
    onSortingChange: (updater) => {
      if (typeof updater === "function") {
        const nextState = updater(sorting);
        setSorting(nextState);
        if (onSortingChange) {
          onSortingChange(nextState);
        }
      } else {
        setSorting(updater);
        if (onSortingChange) {
          onSortingChange(updater);
        }
      }
    },
    onPaginationChange: (updater) => {
      const navigate = (page) => setTimeout(() => navigateToPage(page));
      if (typeof updater === "function") {
        setPagination((prevState) => {
          const nextState = updater(prevState);
          if (onPaginationChange) {
            onPaginationChange(nextState);
          } else {
            navigate(nextState.pageIndex);
          }
          return nextState;
        });
      } else {
        setPagination(updater);
        if (onPaginationChange) {
          onPaginationChange(updater);
        } else {
          navigate(updater.pageIndex);
        }
      }
    }
  });
  return /* @__PURE__ */ React.createElement("div", { className: "rounded-lg border" }, /* @__PURE__ */ React.createElement(Table, __spreadValues({}, tableProps), /* @__PURE__ */ React.createElement(TableHeader, null, table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ React.createElement(TableRow, { key: headerGroup.id }, headerGroup.headers.map((header) => /* @__PURE__ */ React.createElement(
    TableHead,
    {
      colSpan: header.colSpan,
      style: {
        width: header.column.getSize()
      },
      key: header.id
    },
    header.isPlaceholder ? null : flexRender(
      header.column.columnDef.header,
      header.getContext()
    )
  ))))), /* @__PURE__ */ React.createElement(TableBody, null, ((_a = table.getRowModel().rows) == null ? void 0 : _a.length) ? table.getRowModel().rows.map((row) => /* @__PURE__ */ React.createElement(
    TableRow,
    {
      key: row.id,
      "data-state": row.getIsSelected() && "selected"
    },
    row.getVisibleCells().map((cell) => /* @__PURE__ */ React.createElement(TableCell, { key: cell.id }, flexRender(cell.column.columnDef.cell, cell.getContext())))
  )) : /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableCell, { colSpan: columns.length, className: "h-24 text-center" }, /* @__PURE__ */ React.createElement(Trans, { i18nKey: "common:noData" })))), /* @__PURE__ */ React.createElement(TableFooter, { className: "bg-background" }, /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableCell, { colSpan: columns.length }, /* @__PURE__ */ React.createElement(Pagination, { table }))))));
}
function Pagination({
  table
}) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-x-4" }, /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground flex items-center text-sm" }, /* @__PURE__ */ React.createElement(
    Trans,
    {
      i18nKey: "common:pageOfPages",
      values: {
        page: table.getState().pagination.pageIndex + 1,
        total: table.getPageCount()
      }
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-x-1" }, /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "icon",
      variant: "ghost",
      onClick: () => table.setPageIndex(0),
      disabled: !table.getCanPreviousPage()
    },
    /* @__PURE__ */ React.createElement(ChevronsLeft, { className: "h-4" })
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "icon",
      variant: "ghost",
      onClick: () => table.previousPage(),
      disabled: !table.getCanPreviousPage()
    },
    /* @__PURE__ */ React.createElement(ChevronLeft, { className: "h-4" })
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "icon",
      variant: "ghost",
      onClick: () => table.nextPage(),
      disabled: !table.getCanNextPage()
    },
    /* @__PURE__ */ React.createElement(ChevronRight, { className: "h-4" })
  ), /* @__PURE__ */ React.createElement(
    Button,
    {
      size: "icon",
      variant: "ghost",
      onClick: () => table.setPageIndex(table.getPageCount() - 1),
      disabled: !table.getCanNextPage()
    },
    /* @__PURE__ */ React.createElement(ChevronsRight, { className: "h-4" })
  )));
}
function useNavigateToNewPage(props = {
  pageParam: "page"
}) {
  var _a;
  const router = useRouter();
  const param = (_a = props.pageParam) != null ? _a : "page";
  return useCallback(
    (pageIndex) => {
      const url = new URL(window.location.href);
      url.searchParams.set(param, String(pageIndex + 1));
      router.push(url.pathname + url.search);
    },
    [param, router]
  );
}

export { DataTable };
//# sourceMappingURL=data-table.mjs.map
//# sourceMappingURL=data-table.mjs.map