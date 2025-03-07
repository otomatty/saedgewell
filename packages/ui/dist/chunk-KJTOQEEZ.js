'use strict';

var chunkXE52ECJH_js = require('./chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('./chunk-GNZACLC7.js');
var TooltipPrimitive = require('@radix-ui/react-tooltip');

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

var TooltipPrimitive__namespace = /*#__PURE__*/_interopNamespace(TooltipPrimitive);

var TooltipProvider = TooltipPrimitive__namespace.Provider;
var Tooltip = TooltipPrimitive__namespace.Root;
var TooltipTrigger = TooltipPrimitive__namespace.Trigger;
var TooltipContent = (_a) => {
  var _b = _a, { className, sideOffset = 4 } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "sideOffset"]);
  return /* @__PURE__ */ React.createElement(
    TooltipPrimitive__namespace.Content,
    chunkGNZACLC7_js.__spreadValues({
      sideOffset,
      className: chunkXE52ECJH_js.cn(
        "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs",
        className
      )
    }, props)
  );
};
TooltipContent.displayName = TooltipPrimitive__namespace.Content.displayName;

exports.Tooltip = Tooltip;
exports.TooltipContent = TooltipContent;
exports.TooltipProvider = TooltipProvider;
exports.TooltipTrigger = TooltipTrigger;
//# sourceMappingURL=chunk-KJTOQEEZ.js.map
//# sourceMappingURL=chunk-KJTOQEEZ.js.map