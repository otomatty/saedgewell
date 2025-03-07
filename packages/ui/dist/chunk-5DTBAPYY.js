'use strict';

var chunkXKMXOZKR_js = require('./chunk-XKMXOZKR.js');
var chunkXE52ECJH_js = require('./chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('./chunk-GNZACLC7.js');
var reactSlot = require('@radix-ui/react-slot');

var Breadcrumb = (_a) => {
  var props = chunkGNZACLC7_js.__objRest(_a, []);
  return /* @__PURE__ */ React.createElement("nav", chunkGNZACLC7_js.__spreadValues({ "aria-label": "breadcrumb" }, props));
};
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbList = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "ol",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words",
        className
      )
    }, props)
  );
};
BreadcrumbList.displayName = "BreadcrumbList";
var BreadcrumbItem = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "li",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn("inline-flex items-center gap-1.5", className)
    }, props)
  );
};
BreadcrumbItem.displayName = "BreadcrumbItem";
var BreadcrumbLink = (_a) => {
  var _b = _a, { asChild, className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["asChild", "className"]);
  const Comp = asChild ? reactSlot.Slot : "a";
  return /* @__PURE__ */ React.createElement(
    Comp,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "text-foreground transition-colors hover:underline",
        className
      )
    }, props)
  );
};
BreadcrumbLink.displayName = "BreadcrumbLink";
var BreadcrumbPage = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "span",
    chunkGNZACLC7_js.__spreadValues({
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      tabIndex: 0,
      className: chunkXE52ECJH_js.cn("text-foreground font-normal", className)
    }, props)
  );
};
BreadcrumbPage.displayName = "BreadcrumbPage";
var BreadcrumbSeparator = (_a) => {
  var _b = _a, {
    children,
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "children",
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "li",
    chunkGNZACLC7_js.__spreadValues({
      role: "presentation",
      "aria-hidden": "true",
      className: chunkXE52ECJH_js.cn("[&>svg]:size-3.5", className)
    }, props),
    children != null ? children : /* @__PURE__ */ React.createElement(chunkXKMXOZKR_js.ChevronRightIcon, null)
  );
};
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
var BreadcrumbEllipsis = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "span",
    chunkGNZACLC7_js.__spreadValues({
      role: "presentation",
      "aria-hidden": "true",
      className: chunkXE52ECJH_js.cn("flex h-9 w-9 items-center justify-center", className)
    }, props),
    /* @__PURE__ */ React.createElement(chunkXKMXOZKR_js.DotsHorizontalIcon, { className: "h-4 w-4" }),
    /* @__PURE__ */ React.createElement("span", { className: "sr-only" }, "More")
  );
};
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

exports.Breadcrumb = Breadcrumb;
exports.BreadcrumbEllipsis = BreadcrumbEllipsis;
exports.BreadcrumbItem = BreadcrumbItem;
exports.BreadcrumbLink = BreadcrumbLink;
exports.BreadcrumbList = BreadcrumbList;
exports.BreadcrumbPage = BreadcrumbPage;
exports.BreadcrumbSeparator = BreadcrumbSeparator;
//# sourceMappingURL=chunk-5DTBAPYY.js.map
//# sourceMappingURL=chunk-5DTBAPYY.js.map