'use strict';

var chunkXKMXOZKR_js = require('../chunk-XKMXOZKR.js');
var chunkXE52ECJH_js = require('../chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('../chunk-GNZACLC7.js');
var AccordionPrimitive = require('@radix-ui/react-accordion');

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

var AccordionPrimitive__namespace = /*#__PURE__*/_interopNamespace(AccordionPrimitive);

var Accordion = AccordionPrimitive__namespace.Root;
var AccordionItem = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(AccordionPrimitive__namespace.Item, chunkGNZACLC7_js.__spreadValues({ className: chunkXE52ECJH_js.cn("border-b", className) }, props));
};
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = (_a) => {
  var _b = _a, { className, children } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ React.createElement(AccordionPrimitive__namespace.Header, { className: "flex" }, /* @__PURE__ */ React.createElement(
    AccordionPrimitive__namespace.Trigger,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )
    }, props),
    children,
    /* @__PURE__ */ React.createElement(chunkXKMXOZKR_js.ChevronDownIcon, { className: "text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200" })
  ));
};
AccordionTrigger.displayName = AccordionPrimitive__namespace.Trigger.displayName;
var AccordionContent = (_a) => {
  var _b = _a, { className, children } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ React.createElement(
    AccordionPrimitive__namespace.Content,
    chunkGNZACLC7_js.__spreadValues({
      className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
    }, props),
    /* @__PURE__ */ React.createElement("div", { className: chunkXE52ECJH_js.cn("pt-0 pb-4", className) }, children)
  );
};
AccordionContent.displayName = AccordionPrimitive__namespace.Content.displayName;

exports.Accordion = Accordion;
exports.AccordionContent = AccordionContent;
exports.AccordionItem = AccordionItem;
exports.AccordionTrigger = AccordionTrigger;
//# sourceMappingURL=accordion.js.map
//# sourceMappingURL=accordion.js.map