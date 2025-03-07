'use strict';

var chunkXE52ECJH_js = require('./chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('./chunk-GNZACLC7.js');
var SeparatorPrimitive = require('@radix-ui/react-separator');

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

var SeparatorPrimitive__namespace = /*#__PURE__*/_interopNamespace(SeparatorPrimitive);

var Separator = (_a) => {
  var _b = _a, {
    className,
    orientation = "horizontal",
    decorative = true
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className",
    "orientation",
    "decorative"
  ]);
  return /* @__PURE__ */ React.createElement(
    SeparatorPrimitive__namespace.Root,
    chunkGNZACLC7_js.__spreadValues({
      decorative,
      orientation,
      className: chunkXE52ECJH_js.cn(
        "bg-border shrink-0",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )
    }, props)
  );
};
Separator.displayName = SeparatorPrimitive__namespace.Root.displayName;

exports.Separator = Separator;
//# sourceMappingURL=chunk-KRQPNMJ5.js.map
//# sourceMappingURL=chunk-KRQPNMJ5.js.map