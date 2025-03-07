'use strict';

var chunkXE52ECJH_js = require('../chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('../chunk-GNZACLC7.js');
var PopoverPrimitive = require('@radix-ui/react-popover');

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

var PopoverPrimitive__namespace = /*#__PURE__*/_interopNamespace(PopoverPrimitive);

var Popover = PopoverPrimitive__namespace.Root;
var PopoverTrigger = PopoverPrimitive__namespace.Trigger;
var PopoverAnchor = PopoverPrimitive__namespace.Anchor;
var PopoverContent = (_a) => {
  var _b = _a, { className, align = "center", sideOffset = 4 } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "align", "sideOffset"]);
  return /* @__PURE__ */ React.createElement(PopoverPrimitive__namespace.Portal, null, /* @__PURE__ */ React.createElement(
    PopoverPrimitive__namespace.Content,
    chunkGNZACLC7_js.__spreadValues({
      align,
      sideOffset,
      className: chunkXE52ECJH_js.cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md outline-hidden",
        className
      )
    }, props)
  ));
};
PopoverContent.displayName = PopoverPrimitive__namespace.Content.displayName;

exports.Popover = Popover;
exports.PopoverAnchor = PopoverAnchor;
exports.PopoverContent = PopoverContent;
exports.PopoverTrigger = PopoverTrigger;
//# sourceMappingURL=popover.js.map
//# sourceMappingURL=popover.js.map