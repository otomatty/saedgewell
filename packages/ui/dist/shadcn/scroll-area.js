'use strict';

var chunkXE52ECJH_js = require('../chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('../chunk-GNZACLC7.js');
var ScrollAreaPrimitive = require('@radix-ui/react-scroll-area');

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

var ScrollAreaPrimitive__namespace = /*#__PURE__*/_interopNamespace(ScrollAreaPrimitive);

var ScrollArea = (_a) => {
  var _b = _a, { className, children } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ React.createElement(
    ScrollAreaPrimitive__namespace.Root,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn("relative overflow-hidden", className)
    }, props),
    /* @__PURE__ */ React.createElement(ScrollAreaPrimitive__namespace.Viewport, { className: "h-full w-full rounded-[inherit]" }, children),
    /* @__PURE__ */ React.createElement(ScrollBar, null),
    /* @__PURE__ */ React.createElement(ScrollAreaPrimitive__namespace.Corner, null)
  );
};
ScrollArea.displayName = ScrollAreaPrimitive__namespace.Root.displayName;
var ScrollBar = (_a) => {
  var _b = _a, { className, orientation = "vertical" } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "orientation"]);
  return /* @__PURE__ */ React.createElement(
    ScrollAreaPrimitive__namespace.ScrollAreaScrollbar,
    chunkGNZACLC7_js.__spreadValues({
      orientation,
      className: chunkXE52ECJH_js.cn(
        "flex touch-none transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
        orientation === "horizontal" && "h-2.5 border-t border-t-transparent p-[1px]",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement(ScrollAreaPrimitive__namespace.ScrollAreaThumb, { className: "bg-border relative flex-1 rounded-full" })
  );
};
ScrollBar.displayName = ScrollAreaPrimitive__namespace.ScrollAreaScrollbar.displayName;

exports.ScrollArea = ScrollArea;
exports.ScrollBar = ScrollBar;
//# sourceMappingURL=scroll-area.js.map
//# sourceMappingURL=scroll-area.js.map