'use strict';

var chunkXKMXOZKR_js = require('./chunk-XKMXOZKR.js');
var chunkXE52ECJH_js = require('./chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('./chunk-GNZACLC7.js');
var SheetPrimitive = require('@radix-ui/react-dialog');
var classVarianceAuthority = require('class-variance-authority');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var SheetPrimitive__namespace = /*#__PURE__*/_interopNamespace(SheetPrimitive);

var Sheet = SheetPrimitive__namespace.Root;
var SheetTrigger = SheetPrimitive__namespace.Trigger;
var SheetClose = SheetPrimitive__namespace.Close;
var SheetPortal = SheetPrimitive__namespace.Portal;
var SheetOverlay = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    SheetPrimitive__namespace.Overlay,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
        className
      )
    }, props)
  );
};
SheetOverlay.displayName = SheetPrimitive__namespace.Overlay.displayName;
var sheetVariants = classVarianceAuthority.cva(
  "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 border-b",
        bottom: "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 border-t",
        left: "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
        right: "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
var SheetContent = (_a) => {
  var _b = _a, {
    side = "right",
    className,
    children
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "side",
    "className",
    "children"
  ]);
  return /* @__PURE__ */ React.createElement(SheetPortal, null, /* @__PURE__ */ React.createElement(SheetOverlay, null), /* @__PURE__ */ React.createElement(
    SheetPrimitive__namespace.Content,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(sheetVariants({ side }), className)
    }, props),
    /* @__PURE__ */ React.createElement(SheetPrimitive__namespace.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none" }, /* @__PURE__ */ React.createElement(chunkXKMXOZKR_js.Cross2Icon, { className: "h-4 w-4" }), /* @__PURE__ */ React.createElement("span", { className: "sr-only" }, "Close")),
    children
  ));
};
SheetContent.displayName = SheetPrimitive__namespace.Content.displayName;
var SheetHeader = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "div",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn("flex flex-col gap-y-3 text-center sm:text-left", className)
    }, props)
  );
};
SheetHeader.displayName = "SheetHeader";
var SheetFooter = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "div",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )
    }, props)
  );
};
SheetFooter.displayName = "SheetFooter";
var SheetTitle = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    SheetPrimitive__namespace.Title,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn("text-foreground text-lg font-semibold", className)
    }, props)
  );
};
SheetTitle.displayName = SheetPrimitive__namespace.Title.displayName;
var SheetDescription = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    SheetPrimitive__namespace.Description,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn("text-muted-foreground text-sm", className)
    }, props)
  );
};
SheetDescription.displayName = SheetPrimitive__namespace.Description.displayName;

exports.Sheet = Sheet;
exports.SheetClose = SheetClose;
exports.SheetContent = SheetContent;
exports.SheetDescription = SheetDescription;
exports.SheetFooter = SheetFooter;
exports.SheetHeader = SheetHeader;
exports.SheetOverlay = SheetOverlay;
exports.SheetPortal = SheetPortal;
exports.SheetTitle = SheetTitle;
exports.SheetTrigger = SheetTrigger;
//# sourceMappingURL=chunk-5GOUNTIN.js.map
//# sourceMappingURL=chunk-5GOUNTIN.js.map