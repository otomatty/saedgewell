'use strict';

var chunkXE52ECJH_js = require('./chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('./chunk-GNZACLC7.js');
var LabelPrimitive = require('@radix-ui/react-label');
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

var LabelPrimitive__namespace = /*#__PURE__*/_interopNamespace(LabelPrimitive);

var labelVariants = classVarianceAuthority.cva(
  "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
var Label = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(LabelPrimitive__namespace.Root, chunkGNZACLC7_js.__spreadValues({ className: chunkXE52ECJH_js.cn(labelVariants(), className) }, props));
};
Label.displayName = LabelPrimitive__namespace.Root.displayName;

exports.Label = Label;
//# sourceMappingURL=chunk-LSUHT4FP.js.map
//# sourceMappingURL=chunk-LSUHT4FP.js.map