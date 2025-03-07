'use strict';

var chunkEQ7YWY7A_js = require('../chunk-EQ7YWY7A.js');
var chunkURSPJPCS_js = require('../chunk-URSPJPCS.js');
var chunk32ZXQSRB_js = require('../chunk-32ZXQSRB.js');
var chunkP64ZKZSK_js = require('../chunk-P64ZKZSK.js');
require('../chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('../chunk-GNZACLC7.js');
var react = require('react');
var navigation = require('next/navigation');
var lucideReact = require('lucide-react');

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
  const [pagination, setPagination] = react.useState({
    pageIndex: pageIndex != null ? pageIndex : 0,
    pageSize: pageSize != null ? pageSize : 15
  });
  const [sorting, setSorting] = react.useState(initialSorting != null ? initialSorting : []);
  const [columnFilters, setColumnFilters] = react.useState([]);
  const [columnVisibility, setColumnVisibility] = react.useState({});
  const [rowSelection, setRowSelection] = react.useState({});
  const navigateToPage = useNavigateToNewPage();
  const table = chunkEQ7YWY7A_js.useReactTable({
    data,
    columns,
    getCoreRowModel: chunkEQ7YWY7A_js.getCoreRowModel(),
    getSortedRowModel: chunkEQ7YWY7A_js.getSortedRowModel(),
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
  return /* @__PURE__ */ React.createElement("div", { className: "rounded-lg border" }, /* @__PURE__ */ React.createElement(chunkURSPJPCS_js.Table, chunkGNZACLC7_js.__spreadValues({}, tableProps), /* @__PURE__ */ React.createElement(chunkURSPJPCS_js.TableHeader, null, table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ React.createElement(chunkURSPJPCS_js.TableRow, { key: headerGroup.id }, headerGroup.headers.map((header) => /* @__PURE__ */ React.createElement(
    chunkURSPJPCS_js.TableHead,
    {
      colSpan: header.colSpan,
      style: {
        width: header.column.getSize()
      },
      key: header.id
    },
    header.isPlaceholder ? null : chunkEQ7YWY7A_js.flexRender(
      header.column.columnDef.header,
      header.getContext()
    )
  ))))), /* @__PURE__ */ React.createElement(chunkURSPJPCS_js.TableBody, null, ((_a = table.getRowModel().rows) == null ? void 0 : _a.length) ? table.getRowModel().rows.map((row) => /* @__PURE__ */ React.createElement(
    chunkURSPJPCS_js.TableRow,
    {
      key: row.id,
      "data-state": row.getIsSelected() && "selected"
    },
    row.getVisibleCells().map((cell) => /* @__PURE__ */ React.createElement(chunkURSPJPCS_js.TableCell, { key: cell.id }, chunkEQ7YWY7A_js.flexRender(cell.column.columnDef.cell, cell.getContext())))
  )) : /* @__PURE__ */ React.createElement(chunkURSPJPCS_js.TableRow, null, /* @__PURE__ */ React.createElement(chunkURSPJPCS_js.TableCell, { colSpan: columns.length, className: "h-24 text-center" }, /* @__PURE__ */ React.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: "common:noData" })))), /* @__PURE__ */ React.createElement(chunkURSPJPCS_js.TableFooter, { className: "bg-background" }, /* @__PURE__ */ React.createElement(chunkURSPJPCS_js.TableRow, null, /* @__PURE__ */ React.createElement(chunkURSPJPCS_js.TableCell, { colSpan: columns.length }, /* @__PURE__ */ React.createElement(Pagination, { table }))))));
}
function Pagination({
  table
}) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-x-4" }, /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground flex items-center text-sm" }, /* @__PURE__ */ React.createElement(
    chunk32ZXQSRB_js.Trans,
    {
      i18nKey: "common:pageOfPages",
      values: {
        page: table.getState().pagination.pageIndex + 1,
        total: table.getPageCount()
      }
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-x-1" }, /* @__PURE__ */ React.createElement(
    chunkP64ZKZSK_js.Button,
    {
      size: "icon",
      variant: "ghost",
      onClick: () => table.setPageIndex(0),
      disabled: !table.getCanPreviousPage()
    },
    /* @__PURE__ */ React.createElement(lucideReact.ChevronsLeft, { className: "h-4" })
  ), /* @__PURE__ */ React.createElement(
    chunkP64ZKZSK_js.Button,
    {
      size: "icon",
      variant: "ghost",
      onClick: () => table.previousPage(),
      disabled: !table.getCanPreviousPage()
    },
    /* @__PURE__ */ React.createElement(lucideReact.ChevronLeft, { className: "h-4" })
  ), /* @__PURE__ */ React.createElement(
    chunkP64ZKZSK_js.Button,
    {
      size: "icon",
      variant: "ghost",
      onClick: () => table.nextPage(),
      disabled: !table.getCanNextPage()
    },
    /* @__PURE__ */ React.createElement(lucideReact.ChevronRight, { className: "h-4" })
  ), /* @__PURE__ */ React.createElement(
    chunkP64ZKZSK_js.Button,
    {
      size: "icon",
      variant: "ghost",
      onClick: () => table.setPageIndex(table.getPageCount() - 1),
      disabled: !table.getCanNextPage()
    },
    /* @__PURE__ */ React.createElement(lucideReact.ChevronsRight, { className: "h-4" })
  )));
}
function useNavigateToNewPage(props = {
  pageParam: "page"
}) {
  var _a;
  const router = navigation.useRouter();
  const param = (_a = props.pageParam) != null ? _a : "page";
  return react.useCallback(
    (pageIndex) => {
      const url = new URL(window.location.href);
      url.searchParams.set(param, String(pageIndex + 1));
      router.push(url.pathname + url.search);
    },
    [param, router]
  );
}

exports.DataTable = DataTable;
//# sourceMappingURL=data-table.js.map
//# sourceMappingURL=data-table.js.map