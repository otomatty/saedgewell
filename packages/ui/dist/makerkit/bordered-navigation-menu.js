'use strict';

var chunkDAMI7BYK_js = require('../chunk-DAMI7BYK.js');
require('../chunk-XKMXOZKR.js');
var chunk32ZXQSRB_js = require('../chunk-32ZXQSRB.js');
var chunkP64ZKZSK_js = require('../chunk-P64ZKZSK.js');
var chunkXE52ECJH_js = require('../chunk-XE52ECJH.js');
require('../chunk-GNZACLC7.js');
var Link = require('next/link');
var navigation = require('next/navigation');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Link__default = /*#__PURE__*/_interopDefault(Link);

function BorderedNavigationMenu(props) {
  return /* @__PURE__ */ React.createElement(chunkDAMI7BYK_js.NavigationMenu, null, /* @__PURE__ */ React.createElement(chunkDAMI7BYK_js.NavigationMenuList, { className: "relative h-full space-x-2" }, props.children));
}
function BorderedNavigationMenuItem(props) {
  var _a;
  const pathname = navigation.usePathname();
  const active = (_a = props.active) != null ? _a : chunkXE52ECJH_js.isRouteActive(props.path, pathname, props.end);
  return /* @__PURE__ */ React.createElement(chunkDAMI7BYK_js.NavigationMenuItem, { className: props.className }, /* @__PURE__ */ React.createElement(
    chunkP64ZKZSK_js.Button,
    {
      asChild: true,
      variant: "ghost",
      className: chunkXE52ECJH_js.cn("relative active:shadow-xs", props.buttonClassName)
    },
    /* @__PURE__ */ React.createElement(
      Link__default.default,
      {
        href: props.path,
        className: chunkXE52ECJH_js.cn("text-sm", {
          "text-secondary-foreground": active,
          "text-secondary-foreground/80 hover:text-secondary-foreground": !active
        })
      },
      typeof props.label === "string" ? /* @__PURE__ */ React.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: props.label, defaults: props.label }) : props.label,
      active ? /* @__PURE__ */ React.createElement(
        "span",
        {
          className: chunkXE52ECJH_js.cn(
            "bg-primary animate-in fade-in zoom-in-90 absolute -bottom-2.5 left-0 h-0.5 w-full"
          )
        }
      ) : null
    )
  ));
}

exports.BorderedNavigationMenu = BorderedNavigationMenu;
exports.BorderedNavigationMenuItem = BorderedNavigationMenuItem;
//# sourceMappingURL=bordered-navigation-menu.js.map
//# sourceMappingURL=bordered-navigation-menu.js.map