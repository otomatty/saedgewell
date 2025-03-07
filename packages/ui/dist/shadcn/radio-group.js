'use strict';

var chunkXKMXOZKR_js = require('../chunk-XKMXOZKR.js');
var chunkXE52ECJH_js = require('../chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('../chunk-GNZACLC7.js');
var RadioGroupPrimitive = require('@radix-ui/react-radio-group');

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

var RadioGroupPrimitive__namespace = /*#__PURE__*/_interopNamespace(RadioGroupPrimitive);

var RadioGroup = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    RadioGroupPrimitive__namespace.Root,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn("grid gap-2", className)
    }, props)
  );
};
RadioGroup.displayName = RadioGroupPrimitive__namespace.Root.displayName;
var RadioGroupItem = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    RadioGroupPrimitive__namespace.Item,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "border-primary text-primary focus-visible:ring-ring aspect-square h-4 w-4 rounded-full border shadow-xs focus:outline-hidden focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement(RadioGroupPrimitive__namespace.Indicator, { className: "flex items-center justify-center" }, /* @__PURE__ */ React.createElement(chunkXKMXOZKR_js.CheckIcon, { className: "fill-primary h-3.5 w-3.5" }))
  );
};
RadioGroupItem.displayName = RadioGroupPrimitive__namespace.Item.displayName;
var RadioGroupItemLabel = (props) => {
  return /* @__PURE__ */ React.createElement(
    "label",
    {
      htmlFor: props.htmlFor,
      className: chunkXE52ECJH_js.cn(
        props.className,
        "flex cursor-pointer rounded-md border-input items-center space-x-4 border transition-duration-500 focus-within:border-primary p-4 text-sm transition-all",
        {
          "bg-muted": props.selected,
          "hover:bg-muted": !props.selected
        }
      )
    },
    props.children
  );
};
RadioGroupItemLabel.displayName = "RadioGroupItemLabel";

exports.RadioGroup = RadioGroup;
exports.RadioGroupItem = RadioGroupItem;
exports.RadioGroupItemLabel = RadioGroupItemLabel;
//# sourceMappingURL=radio-group.js.map
//# sourceMappingURL=radio-group.js.map