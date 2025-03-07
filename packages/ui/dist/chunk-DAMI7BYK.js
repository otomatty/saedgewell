'use strict';

var chunkXKMXOZKR_js = require('./chunk-XKMXOZKR.js');
var chunkXE52ECJH_js = require('./chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('./chunk-GNZACLC7.js');
var NavigationMenuPrimitive = require('@radix-ui/react-navigation-menu');
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

var NavigationMenuPrimitive__namespace = /*#__PURE__*/_interopNamespace(NavigationMenuPrimitive);

var NavigationMenu = (_a) => {
  var _b = _a, { className, children } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ React.createElement(
    NavigationMenuPrimitive__namespace.Root,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "relative z-10 flex max-w-max flex-1 items-center justify-center",
        className
      )
    }, props),
    children,
    /* @__PURE__ */ React.createElement(NavigationMenuViewport, null)
  );
};
NavigationMenu.displayName = NavigationMenuPrimitive__namespace.Root.displayName;
var NavigationMenuList = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    NavigationMenuPrimitive__namespace.List,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "group flex flex-1 list-none items-center justify-center space-x-1",
        className
      )
    }, props)
  );
};
NavigationMenuList.displayName = NavigationMenuPrimitive__namespace.List.displayName;
var NavigationMenuItem = NavigationMenuPrimitive__namespace.Item;
var navigationMenuTriggerStyle = classVarianceAuthority.cva(
  "group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-active:bg-accent/50 data-[state=open]:bg-accent/50 inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
);
var NavigationMenuTrigger = (_a) => {
  var _b = _a, { className, children } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ React.createElement(
    NavigationMenuPrimitive__namespace.Trigger,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(navigationMenuTriggerStyle(), "group", className)
    }, props),
    children,
    " ",
    /* @__PURE__ */ React.createElement(
      chunkXKMXOZKR_js.ChevronDownIcon,
      {
        className: "relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180",
        "aria-hidden": "true"
      }
    )
  );
};
NavigationMenuTrigger.displayName = NavigationMenuPrimitive__namespace.Trigger.displayName;
var NavigationMenuContent = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    NavigationMenuPrimitive__namespace.Content,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full md:absolute md:w-auto",
        className
      )
    }, props)
  );
};
NavigationMenuContent.displayName = NavigationMenuPrimitive__namespace.Content.displayName;
var NavigationMenuLink = NavigationMenuPrimitive__namespace.Link;
var NavigationMenuViewport = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement("div", { className: chunkXE52ECJH_js.cn("absolute top-full left-0 flex justify-center") }, /* @__PURE__ */ React.createElement(
    NavigationMenuPrimitive__namespace.Viewport,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow-xs md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )
    }, props)
  ));
};
NavigationMenuViewport.displayName = NavigationMenuPrimitive__namespace.Viewport.displayName;
var NavigationMenuIndicator = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    NavigationMenuPrimitive__namespace.Indicator,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-1 flex h-1.5 items-end justify-center overflow-hidden",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement("div", { className: "bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" })
  );
};
NavigationMenuIndicator.displayName = NavigationMenuPrimitive__namespace.Indicator.displayName;

exports.NavigationMenu = NavigationMenu;
exports.NavigationMenuContent = NavigationMenuContent;
exports.NavigationMenuIndicator = NavigationMenuIndicator;
exports.NavigationMenuItem = NavigationMenuItem;
exports.NavigationMenuLink = NavigationMenuLink;
exports.NavigationMenuList = NavigationMenuList;
exports.NavigationMenuTrigger = NavigationMenuTrigger;
exports.NavigationMenuViewport = NavigationMenuViewport;
exports.navigationMenuTriggerStyle = navigationMenuTriggerStyle;
//# sourceMappingURL=chunk-DAMI7BYK.js.map
//# sourceMappingURL=chunk-DAMI7BYK.js.map