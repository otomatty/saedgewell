'use strict';

var chunkMVBL7SMU_js = require('../chunk-MVBL7SMU.js');
require('../chunk-5GOUNTIN.js');
require('../chunk-IO5EUWX4.js');
require('../chunk-Q6QHVVRE.js');
var chunkKRQPNMJ5_js = require('../chunk-KRQPNMJ5.js');
require('../chunk-PQJZCJFN.js');
require('../chunk-KJTOQEEZ.js');
require('../chunk-XKMXOZKR.js');
require('../chunk-32ZXQSRB.js');
require('../chunk-P64ZKZSK.js');
var chunkXE52ECJH_js = require('../chunk-XE52ECJH.js');
var chunkJMDHW6WM_js = require('../chunk-JMDHW6WM.js');
var chunkGNZACLC7_js = require('../chunk-GNZACLC7.js');
var React = require('react');

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

var React__namespace = /*#__PURE__*/_interopNamespace(React);

var ENABLE_SIDEBAR_TRIGGER = process.env.NEXT_PUBLIC_ENABLE_SIDEBAR_TRIGGER ? process.env.NEXT_PUBLIC_ENABLE_SIDEBAR_TRIGGER === "true" : true;
function Page(props) {
  switch (props.style) {
    case "header":
      return /* @__PURE__ */ React__namespace.createElement(PageWithHeader, chunkGNZACLC7_js.__spreadValues({}, props));
    case "custom":
      return props.children;
    default:
      return /* @__PURE__ */ React__namespace.createElement(PageWithSidebar, chunkGNZACLC7_js.__spreadValues({}, props));
  }
}
function PageWithSidebar(props) {
  var _a;
  const { Navigation, Children: Children2, MobileNavigation } = getSlotsFromPage(props);
  return /* @__PURE__ */ React__namespace.createElement("div", { className: chunkXE52ECJH_js.cn("flex min-w-0 flex-1", props.className) }, Navigation, /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: (_a = props.contentContainerClassName) != null ? _a : "mx-auto flex h-screen w-full flex-col overflow-y-auto bg-inherit"
    },
    MobileNavigation,
    /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        className: "bg-background flex flex-1 flex-col overflow-y-auto px-4 lg:px-0"
      },
      Children2
    )
  ));
}
function PageMobileNavigation(props) {
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: chunkXE52ECJH_js.cn(
        "flex w-full items-center border-b px-4 py-2 lg:hidden lg:px-0",
        props.className
      )
    },
    props.children
  );
}
function PageWithHeader(props) {
  var _a, _b;
  const { Navigation, Children: Children2, MobileNavigation } = getSlotsFromPage(props);
  return /* @__PURE__ */ React__namespace.createElement("div", { className: chunkXE52ECJH_js.cn("flex h-screen flex-1 flex-col", props.className) }, /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: (_a = props.contentContainerClassName) != null ? _a : "flex flex-1 flex-col space-y-4"
    },
    /* @__PURE__ */ React__namespace.createElement(
      "div",
      {
        className: chunkXE52ECJH_js.cn(
          "bg-muted/40 dark:border-border dark:shadow-primary/10 flex h-14 items-center justify-between px-4 lg:justify-start lg:shadow-xs",
          {
            "sticky top-0 z-10 backdrop-blur-md": (_b = props.sticky) != null ? _b : true
          }
        )
      },
      /* @__PURE__ */ React__namespace.createElement(
        "div",
        {
          className: "hidden w-full flex-1 items-center space-x-8 lg:flex"
        },
        Navigation
      ),
      MobileNavigation
    ),
    /* @__PURE__ */ React__namespace.createElement("div", { className: "container flex flex-1 flex-col" }, Children2)
  ));
}
function PageBody(props) {
  const className = chunkXE52ECJH_js.cn("flex w-full flex-1 flex-col lg:px-4", props.className);
  return /* @__PURE__ */ React__namespace.createElement("div", { className }, props.children);
}
function PageNavigation(props) {
  return /* @__PURE__ */ React__namespace.createElement("div", { className: "flex-1 bg-inherit" }, props.children);
}
function PageDescription(props) {
  return /* @__PURE__ */ React__namespace.createElement("div", { className: "flex h-6 items-center" }, /* @__PURE__ */ React__namespace.createElement("div", { className: "text-muted-foreground text-xs leading-none font-normal" }, props.children));
}
function PageTitle(props) {
  return /* @__PURE__ */ React__namespace.createElement(
    "h1",
    {
      className: "font-heading text-base leading-none font-bold tracking-tight dark:text-white"
    },
    props.children
  );
}
function PageHeaderActions(props) {
  return /* @__PURE__ */ React__namespace.createElement("div", { className: "flex items-center space-x-2" }, props.children);
}
function PageHeader({
  children,
  title,
  description,
  className,
  displaySidebarTrigger = ENABLE_SIDEBAR_TRIGGER
}) {
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    {
      className: chunkXE52ECJH_js.cn(
        "flex items-center justify-between py-5 lg:px-4",
        className
      )
    },
    /* @__PURE__ */ React__namespace.createElement("div", { className: "flex flex-col gap-y-2" }, /* @__PURE__ */ React__namespace.createElement("div", { className: "flex items-center gap-x-2.5" }, displaySidebarTrigger ? /* @__PURE__ */ React__namespace.createElement(chunkMVBL7SMU_js.SidebarTrigger, { className: "text-muted-foreground hover:text-secondary-foreground hidden h-4.5 w-4.5 cursor-pointer lg:inline-flex" }) : null, /* @__PURE__ */ React__namespace.createElement(chunkJMDHW6WM_js.If, { condition: description }, /* @__PURE__ */ React__namespace.createElement(chunkJMDHW6WM_js.If, { condition: displaySidebarTrigger }, /* @__PURE__ */ React__namespace.createElement(
      chunkKRQPNMJ5_js.Separator,
      {
        orientation: "vertical",
        className: "hidden h-4 w-px lg:group-data-[minimized]:block"
      }
    )), /* @__PURE__ */ React__namespace.createElement(PageDescription, null, description))), /* @__PURE__ */ React__namespace.createElement(chunkJMDHW6WM_js.If, { condition: title }, /* @__PURE__ */ React__namespace.createElement(PageTitle, null, title))),
    children
  );
}
function getSlotsFromPage(props) {
  return React__namespace.Children.toArray(props.children).reduce(
    (acc, child) => {
      if (!React__namespace.isValidElement(child)) {
        return acc;
      }
      if (child.type === PageNavigation) {
        acc.Navigation = child;
        return acc;
      }
      if (child.type === PageMobileNavigation) {
        acc.MobileNavigation = child;
        return acc;
      }
      acc.Children = child;
      return acc;
    },
    {
      Children: null,
      Navigation: null,
      MobileNavigation: null
    }
  );
}

exports.Page = Page;
exports.PageBody = PageBody;
exports.PageDescription = PageDescription;
exports.PageHeader = PageHeader;
exports.PageHeaderActions = PageHeaderActions;
exports.PageMobileNavigation = PageMobileNavigation;
exports.PageNavigation = PageNavigation;
exports.PageTitle = PageTitle;
//# sourceMappingURL=page.js.map
//# sourceMappingURL=page.js.map