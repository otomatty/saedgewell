'use strict';

var chunkKJTOQEEZ_js = require('../chunk-KJTOQEEZ.js');
var chunk32ZXQSRB_js = require('../chunk-32ZXQSRB.js');
var chunkP64ZKZSK_js = require('../chunk-P64ZKZSK.js');
var chunkXE52ECJH_js = require('../chunk-XE52ECJH.js');
var chunkJMDHW6WM_js = require('../chunk-JMDHW6WM.js');
require('../chunk-GNZACLC7.js');
var react = require('react');
var Link = require('next/link');
var navigation = require('next/navigation');
var classVarianceAuthority = require('class-variance-authority');
var lucideReact = require('lucide-react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var Link__default = /*#__PURE__*/_interopDefault(Link);

var SidebarContext = react.createContext({
  collapsed: false,
  setCollapsed: (_) => _
});

// src/makerkit/sidebar.tsx
function Sidebar(props) {
  var _a, _b, _c;
  const [collapsed, setCollapsed] = react.useState((_a = props.collapsed) != null ? _a : false);
  const isExpandedRef = react.useRef(false);
  const expandOnHover = (_b = props.expandOnHover) != null ? _b : process.env.NEXT_PUBLIC_EXPAND_SIDEBAR_ON_HOVER === "true";
  const sidebarSizeClassName = getSidebarSizeClassName(
    collapsed,
    isExpandedRef.current
  );
  const className = getClassNameBuilder(
    chunkXE52ECJH_js.cn((_c = props.className) != null ? _c : "", sidebarSizeClassName, {})
  )();
  const containerClassName = chunkXE52ECJH_js.cn(sidebarSizeClassName, "bg-inherit", {
    "max-w-[4rem]": expandOnHover && isExpandedRef.current
  });
  const ctx = { collapsed, setCollapsed };
  const onMouseEnter = props.collapsed && expandOnHover ? () => {
    setCollapsed(false);
    isExpandedRef.current = true;
  } : void 0;
  const onMouseLeave = props.collapsed && expandOnHover ? () => {
    if (!isRadixPopupOpen()) {
      setCollapsed(true);
      isExpandedRef.current = false;
    } else {
      onRadixPopupClose(() => {
        setCollapsed(true);
        isExpandedRef.current = false;
      });
    }
  } : void 0;
  return /* @__PURE__ */ React.createElement(SidebarContext.Provider, { value: ctx }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: containerClassName,
      onMouseEnter,
      onMouseLeave
    },
    /* @__PURE__ */ React.createElement("div", { "aria-expanded": !collapsed, className }, typeof props.children === "function" ? props.children(ctx) : props.children)
  ));
}
function SidebarContent({
  children,
  className: customClassName
}) {
  const { collapsed } = react.useContext(SidebarContext);
  const className = chunkXE52ECJH_js.cn(
    "flex w-full flex-col space-y-1.5 py-1",
    customClassName,
    {
      "px-4": !collapsed,
      "px-2": collapsed
    }
  );
  return /* @__PURE__ */ React.createElement("div", { className }, children);
}
function SidebarGroup({
  label,
  collapsed = false,
  collapsible = true,
  children
}) {
  const { collapsed: sidebarCollapsed } = react.useContext(SidebarContext);
  const [isGroupCollapsed, setIsGroupCollapsed] = react.useState(collapsed);
  const id = react.useId();
  const Title = (props) => {
    if (sidebarCollapsed) {
      return null;
    }
    return /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground text-xs font-semibold uppercase" }, props.children);
  };
  const Wrapper = () => {
    const className = chunkXE52ECJH_js.cn(
      "px-container group flex items-center justify-between space-x-2.5",
      {
        "py-2.5": !sidebarCollapsed
      }
    );
    if (collapsible) {
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          "aria-expanded": !isGroupCollapsed,
          "aria-controls": id,
          onClick: () => setIsGroupCollapsed(!isGroupCollapsed),
          className
        },
        /* @__PURE__ */ React.createElement(Title, null, label),
        /* @__PURE__ */ React.createElement(chunkJMDHW6WM_js.If, { condition: collapsible }, /* @__PURE__ */ React.createElement(
          lucideReact.ChevronDown,
          {
            className: chunkXE52ECJH_js.cn("h-3 transition duration-300", {
              "rotate-180": !isGroupCollapsed
            })
          }
        ))
      );
    }
    return /* @__PURE__ */ React.createElement("div", { className }, /* @__PURE__ */ React.createElement(Title, null, label));
  };
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: chunkXE52ECJH_js.cn("flex flex-col", {
        "gap-y-2 py-1": !collapsed
      })
    },
    /* @__PURE__ */ React.createElement(Wrapper, null),
    /* @__PURE__ */ React.createElement(chunkJMDHW6WM_js.If, { condition: collapsible ? !isGroupCollapsed : true }, /* @__PURE__ */ React.createElement("div", { id, className: "flex flex-col space-y-1.5" }, children))
  );
}
function SidebarDivider() {
  return /* @__PURE__ */ React.createElement("div", { className: "dark:border-dark-800 my-2 border-t border-gray-100" });
}
function SidebarItem({
  end,
  path,
  children,
  Icon
}) {
  var _a;
  const { collapsed } = react.useContext(SidebarContext);
  const currentPath = (_a = navigation.usePathname()) != null ? _a : "";
  const active = chunkXE52ECJH_js.isRouteActive(path, currentPath, end != null ? end : false);
  const variant = active ? "secondary" : "ghost";
  return /* @__PURE__ */ React.createElement(chunkKJTOQEEZ_js.TooltipProvider, { delayDuration: 0 }, /* @__PURE__ */ React.createElement(chunkKJTOQEEZ_js.Tooltip, { disableHoverableContent: true }, /* @__PURE__ */ React.createElement(chunkKJTOQEEZ_js.TooltipTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(
    chunkP64ZKZSK_js.Button,
    {
      asChild: true,
      className: chunkXE52ECJH_js.cn(
        "active:bg-secondary/60 flex w-full text-sm shadow-none",
        {
          "justify-start space-x-2.5": !collapsed,
          "hover:bg-initial": active
        }
      ),
      size: "sm",
      variant
    },
    /* @__PURE__ */ React.createElement(Link__default.default, { href: path }, Icon, /* @__PURE__ */ React.createElement(
      "span",
      {
        className: chunkXE52ECJH_js.cn("w-auto transition-opacity duration-300", {
          "w-0 opacity-0": collapsed
        })
      },
      children
    ))
  )), /* @__PURE__ */ React.createElement(chunkJMDHW6WM_js.If, { condition: collapsed }, /* @__PURE__ */ React.createElement(chunkKJTOQEEZ_js.TooltipContent, { side: "right", sideOffset: 10 }, children))));
}
function getClassNameBuilder(className) {
  return classVarianceAuthority.cva([
    chunkXE52ECJH_js.cn(
      "group/sidebar transition-width fixed box-content flex h-screen w-2/12 flex-col bg-inherit backdrop-blur-xs duration-200",
      className
    )
  ]);
}
function getSidebarSizeClassName(collapsed, isExpanded) {
  return chunkXE52ECJH_js.cn(["z-50 flex w-full flex-col"], {
    "dark:shadow-primary/20 lg:w-[17rem]": !collapsed,
    "lg:w-[4rem]": collapsed,
    shadow: isExpanded
  });
}
function getRadixPopup() {
  return document.querySelector("[data-radix-popper-content-wrapper]");
}
function isRadixPopupOpen() {
  return getRadixPopup() !== null;
}
function onRadixPopupClose(callback) {
  const element = getRadixPopup();
  if (element) {
    const observer = new MutationObserver(() => {
      if (!getRadixPopup()) {
        callback();
        if (element.parentElement) {
          observer.disconnect();
        }
      }
    });
    if (element.parentElement) {
      observer.observe(element.parentElement, {
        childList: true,
        subtree: true
      });
    }
  }
}
function SidebarNavigation({
  config
}) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, config.routes.map((item) => {
    if ("divider" in item) {
      return /* @__PURE__ */ React.createElement(SidebarDivider, { key: crypto.randomUUID() });
    }
    if ("children" in item) {
      return /* @__PURE__ */ React.createElement(
        SidebarGroup,
        {
          key: item.label,
          label: /* @__PURE__ */ React.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: item.label, defaults: item.label }),
          collapsible: item.collapsible,
          collapsed: item.collapsed
        },
        item.children.map((child) => {
          if ("collapsible" in child && child.collapsible) {
            throw new Error(
              "Collapsible groups are not supported in the old Sidebar. Please migrate to the new Sidebar."
            );
          }
          if ("path" in child) {
            return /* @__PURE__ */ React.createElement(
              SidebarItem,
              {
                key: child.path,
                end: child.end,
                path: child.path,
                Icon: child.Icon
              },
              /* @__PURE__ */ React.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: child.label, defaults: child.label })
            );
          }
        })
      );
    }
  }));
}

exports.Sidebar = Sidebar;
exports.SidebarContent = SidebarContent;
exports.SidebarContext = SidebarContext;
exports.SidebarDivider = SidebarDivider;
exports.SidebarGroup = SidebarGroup;
exports.SidebarItem = SidebarItem;
exports.SidebarNavigation = SidebarNavigation;
//# sourceMappingURL=sidebar.js.map
//# sourceMappingURL=sidebar.js.map