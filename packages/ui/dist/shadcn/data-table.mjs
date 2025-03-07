import { useReactTable, getCoreRowModel, flexRender } from '../chunk-RR3VKBDK.mjs';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../chunk-UMBUNEHG.mjs';
import { Trans } from '../chunk-IOTGEBOC.mjs';
import '../chunk-WKYHJYPA.mjs';
import '../chunk-C5AMXPVO.mjs';

// src/shadcn/data-table.tsx
function DataTable({
  columns,
  data
}) {
  "use no memo";
  var _a;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  return /* @__PURE__ */ React.createElement("div", { className: "rounded-md border" }, /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement(TableHeader, null, table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ React.createElement(TableRow, { key: headerGroup.id }, headerGroup.headers.map((header) => {
    return /* @__PURE__ */ React.createElement(TableHead, { key: header.id }, header.isPlaceholder ? null : flexRender(
      header.column.columnDef.header,
      header.getContext()
    ));
  })))), /* @__PURE__ */ React.createElement(TableBody, null, ((_a = table.getRowModel().rows) == null ? void 0 : _a.length) ? table.getRowModel().rows.map((row) => /* @__PURE__ */ React.createElement(
    TableRow,
    {
      key: row.id,
      "data-row-id": row.id,
      "data-state": row.getIsSelected() && "selected"
    },
    row.getVisibleCells().map((cell) => /* @__PURE__ */ React.createElement(TableCell, { key: cell.id }, flexRender(cell.column.columnDef.cell, cell.getContext())))
  )) : /* @__PURE__ */ React.createElement(TableRow, null, /* @__PURE__ */ React.createElement(TableCell, { colSpan: columns.length, className: "h-24 text-center" }, /* @__PURE__ */ React.createElement(Trans, { i18nKey: "common:noData" }))))));
}

export { DataTable };
//# sourceMappingURL=data-table.mjs.map
//# sourceMappingURL=data-table.mjs.map