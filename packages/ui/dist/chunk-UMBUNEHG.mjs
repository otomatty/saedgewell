import { cn } from './chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from './chunk-C5AMXPVO.mjs';

// src/shadcn/table.tsx
var Table = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement("div", { className: "relative w-full overflow-auto" }, /* @__PURE__ */ React.createElement(
    "table",
    __spreadValues({
      className: cn("w-full caption-bottom text-sm", className)
    }, props)
  ));
};
Table.displayName = "Table";
var TableHeader = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement("thead", __spreadValues({ className: cn("[&_tr]:border-b", className) }, props));
};
TableHeader.displayName = "TableHeader";
var TableBody = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement("tbody", __spreadValues({ className: cn("[&_tr:last-child]:border-0", className) }, props));
};
TableBody.displayName = "TableBody";
var TableFooter = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "tfoot",
    __spreadValues({
      className: cn(
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
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "tr",
    __spreadValues({
      className: cn(
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
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "th",
    __spreadValues({
      className: cn(
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
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "td",
    __spreadValues({
      className: cn(
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
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "caption",
    __spreadValues({
      className: cn("text-muted-foreground mt-4 text-sm", className)
    }, props)
  );
};
TableCaption.displayName = "TableCaption";

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
//# sourceMappingURL=chunk-UMBUNEHG.mjs.map
//# sourceMappingURL=chunk-UMBUNEHG.mjs.map