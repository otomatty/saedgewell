'use strict';

var chunkEQ7YWY7A_js = require('../chunk-EQ7YWY7A.js');
var chunkURSPJPCS_js = require('../chunk-URSPJPCS.js');
var chunk32ZXQSRB_js = require('../chunk-32ZXQSRB.js');
require('../chunk-XE52ECJH.js');
require('../chunk-GNZACLC7.js');

// src/shadcn/data-table.tsx
function DataTable({
  columns,
  data
}) {
  "use no memo";
  var _a;
  const table = chunkEQ7YWY7A_js.useReactTable({
    data,
    columns,
    getCoreRowModel: chunkEQ7YWY7A_js.getCoreRowModel()
  });
  return /* @__PURE__ */ React.createElement("div", { className: "rounded-md border" }, /* @__PURE__ */ React.createElement(chunkURSPJPCS_js.Table, null, /* @__PURE__ */ React.createElement(chunkURSPJPCS_js.TableHeader, null, table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ React.createElement(chunkURSPJPCS_js.TableRow, { key: headerGroup.id }, headerGroup.headers.map((header) => {
    return /* @__PURE__ */ React.createElement(chunkURSPJPCS_js.TableHead, { key: header.id }, header.isPlaceholder ? null : chunkEQ7YWY7A_js.flexRender(
      header.column.columnDef.header,
      header.getContext()
    ));
  })))), /* @__PURE__ */ React.createElement(chunkURSPJPCS_js.TableBody, null, ((_a = table.getRowModel().rows) == null ? void 0 : _a.length) ? table.getRowModel().rows.map((row) => /* @__PURE__ */ React.createElement(
    chunkURSPJPCS_js.TableRow,
    {
      key: row.id,
      "data-row-id": row.id,
      "data-state": row.getIsSelected() && "selected"
    },
    row.getVisibleCells().map((cell) => /* @__PURE__ */ React.createElement(chunkURSPJPCS_js.TableCell, { key: cell.id }, chunkEQ7YWY7A_js.flexRender(cell.column.columnDef.cell, cell.getContext())))
  )) : /* @__PURE__ */ React.createElement(chunkURSPJPCS_js.TableRow, null, /* @__PURE__ */ React.createElement(chunkURSPJPCS_js.TableCell, { colSpan: columns.length, className: "h-24 text-center" }, /* @__PURE__ */ React.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: "common:noData" }))))));
}

exports.DataTable = DataTable;
//# sourceMappingURL=data-table.js.map
//# sourceMappingURL=data-table.js.map