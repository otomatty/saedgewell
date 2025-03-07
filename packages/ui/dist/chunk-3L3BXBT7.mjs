import { ChevronRightIcon, DotsHorizontalIcon } from './chunk-3F2QG6WC.mjs';
import { cn } from './chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from './chunk-C5AMXPVO.mjs';
import { Slot } from '@radix-ui/react-slot';

var Breadcrumb = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ React.createElement("nav", __spreadValues({ "aria-label": "breadcrumb" }, props));
};
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbList = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "ol",
    __spreadValues({
      className: cn(
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
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "li",
    __spreadValues({
      className: cn("inline-flex items-center gap-1.5", className)
    }, props)
  );
};
BreadcrumbItem.displayName = "BreadcrumbItem";
var BreadcrumbLink = (_a) => {
  var _b = _a, { asChild, className } = _b, props = __objRest(_b, ["asChild", "className"]);
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ React.createElement(
    Comp,
    __spreadValues({
      className: cn(
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
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "span",
    __spreadValues({
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      tabIndex: 0,
      className: cn("text-foreground font-normal", className)
    }, props)
  );
};
BreadcrumbPage.displayName = "BreadcrumbPage";
var BreadcrumbSeparator = (_a) => {
  var _b = _a, {
    children,
    className
  } = _b, props = __objRest(_b, [
    "children",
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "li",
    __spreadValues({
      role: "presentation",
      "aria-hidden": "true",
      className: cn("[&>svg]:size-3.5", className)
    }, props),
    children != null ? children : /* @__PURE__ */ React.createElement(ChevronRightIcon, null)
  );
};
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
var BreadcrumbEllipsis = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "span",
    __spreadValues({
      role: "presentation",
      "aria-hidden": "true",
      className: cn("flex h-9 w-9 items-center justify-center", className)
    }, props),
    /* @__PURE__ */ React.createElement(DotsHorizontalIcon, { className: "h-4 w-4" }),
    /* @__PURE__ */ React.createElement("span", { className: "sr-only" }, "More")
  );
};
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator };
//# sourceMappingURL=chunk-3L3BXBT7.mjs.map
//# sourceMappingURL=chunk-3L3BXBT7.mjs.map