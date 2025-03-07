'use strict';

var chunkXKMXOZKR_js = require('../chunk-XKMXOZKR.js');
var chunkXE52ECJH_js = require('../chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('../chunk-GNZACLC7.js');
var CheckboxPrimitive = require('@radix-ui/react-checkbox');

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

var CheckboxPrimitive__namespace = /*#__PURE__*/_interopNamespace(CheckboxPrimitive);

var Checkbox = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    CheckboxPrimitive__namespace.Root,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "peer border-primary focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-4 w-4 shrink-0 rounded-xs border shadow-xs focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement(
      CheckboxPrimitive__namespace.Indicator,
      {
        className: chunkXE52ECJH_js.cn("flex items-center justify-center text-current")
      },
      /* @__PURE__ */ React.createElement(chunkXKMXOZKR_js.CheckIcon, { className: "h-4 w-4" })
    )
  );
};
Checkbox.displayName = CheckboxPrimitive__namespace.Root.displayName;

exports.Checkbox = Checkbox;
//# sourceMappingURL=checkbox.js.map
//# sourceMappingURL=checkbox.js.map