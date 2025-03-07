'use strict';

var chunkXE52ECJH_js = require('../chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('../chunk-GNZACLC7.js');
var TabsPrimitive = require('@radix-ui/react-tabs');

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

var TabsPrimitive__namespace = /*#__PURE__*/_interopNamespace(TabsPrimitive);

var Tabs = TabsPrimitive__namespace.Root;
var TabsList = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    TabsPrimitive__namespace.List,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1",
        className
      )
    }, props)
  );
};
TabsList.displayName = TabsPrimitive__namespace.List.displayName;
var TabsTrigger = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    TabsPrimitive__namespace.Trigger,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center rounded-xs px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-xs",
        className
      )
    }, props)
  );
};
TabsTrigger.displayName = TabsPrimitive__namespace.Trigger.displayName;
var TabsContent = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    TabsPrimitive__namespace.Content,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
        className
      )
    }, props)
  );
};
TabsContent.displayName = TabsPrimitive__namespace.Content.displayName;

exports.Tabs = Tabs;
exports.TabsContent = TabsContent;
exports.TabsList = TabsList;
exports.TabsTrigger = TabsTrigger;
//# sourceMappingURL=tabs.js.map
//# sourceMappingURL=tabs.js.map