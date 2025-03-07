'use strict';

var chunkXE52ECJH_js = require('./chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('./chunk-GNZACLC7.js');

// src/shadcn/table.tsx
var Table = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement("div", { className: "relative w-full overflow-auto" }, /* @__PURE__ */ React.createElement(
    "table",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn("w-full caption-bottom text-sm", className)
    }, props)
  ));
};
Table.displayName = "Table";
var TableHeader = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement("thead", chunkGNZACLC7_js.__spreadValues({ className: chunkXE52ECJH_js.cn("[&_tr]:border-b", className) }, props));
};
TableHeader.displayName = "TableHeader";
var TableBody = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement("tbody", chunkGNZACLC7_js.__spreadValues({ className: chunkXE52ECJH_js.cn("[&_tr:last-child]:border-0", className) }, props));
};
TableBody.displayName = "TableBody";
var TableFooter = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "tfoot",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "bg-muted/50 border-t font-medium last:[&>tr]:border-b-0",
        className
      )
    }, props)
  );
};
TableFooter.displayName = "TableFooter";
var TableRow = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "tr",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )
    }, props)
  );
};
TableRow.displayName = "TableRow";
var TableHead = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "th",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "text-muted-foreground h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )
    }, props)
  );
};
TableHead.displayName = "TableHead";
var TableCell = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "td",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )
    }, props)
  );
};
TableCell.displayName = "TableCell";
var TableCaption = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "caption",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn("text-muted-foreground mt-4 text-sm", className)
    }, props)
  );
};
TableCaption.displayName = "TableCaption";

exports.Table = Table;
exports.TableBody = TableBody;
exports.TableCaption = TableCaption;
exports.TableCell = TableCell;
exports.TableFooter = TableFooter;
exports.TableHead = TableHead;
exports.TableHeader = TableHeader;
exports.TableRow = TableRow;
//# sourceMappingURL=chunk-URSPJPCS.js.map
//# sourceMappingURL=chunk-URSPJPCS.js.map