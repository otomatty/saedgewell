import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '../chunk-FYNAGJAI.mjs';
import { Trans } from '../chunk-IOTGEBOC.mjs';
import { Button } from '../chunk-BSMUWSCW.mjs';
import { cn, isRouteActive } from '../chunk-WKYHJYPA.mjs';
import { If } from '../chunk-7AKVYG64.mjs';
import '../chunk-C5AMXPVO.mjs';
import { createContext, useState, useRef, useContext, useId } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';

var SidebarContext = createContext({
  collapsed: false,
  setCollapsed: (_) => _
});

// src/makerkit/sidebar.tsx
function Sidebar(props) {
  var _a, _b, _c;
  const [collapsed, setCollapsed] = useState((_a = props.collapsed) != null ? _a : false);
  const isExpandedRef = useRef(false);
  const expandOnHover = (_b = props.expandOnHover) != null ? _b : process.env.NEXT_PUBLIC_EXPAND_SIDEBAR_ON_HOVER === "true";
  const sidebarSizeClassName = getSidebarSizeClassName(
    collapsed,
    isExpandedRef.current
  );
  const className = getClassNameBuilder(
    cn((_c = props.className) != null ? _c : "", sidebarSizeClassName, {})
  )();
  const containerClassName = cn(sidebarSizeClassName, "bg-inherit", {
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
  const { collapsed } = useContext(SidebarContext);
  const className = cn(
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
  const { collapsed: sidebarCollapsed } = useContext(SidebarContext);
  const [isGroupCollapsed, setIsGroupCollapsed] = useState(collapsed);
  const id = useId();
  const Title = (props) => {
    if (sidebarCollapsed) {
      return null;
    }
    return /* @__PURE__ */ React.createElement("span", { className: "text-muted-foreground text-xs font-semibold uppercase" }, props.children);
  };
  const Wrapper = () => {
    const className = cn(
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
        /* @__PURE__ */ React.createElement(If, { condition: collapsible }, /* @__PURE__ */ React.createElement(
          ChevronDown,
          {
            className: cn("h-3 transition duration-300", {
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
      className: cn("flex flex-col", {
        "gap-y-2 py-1": !collapsed
      })
    },
    /* @__PURE__ */ React.createElement(Wrapper, null),
    /* @__PURE__ */ React.createElement(If, { condition: collapsible ? !isGroupCollapsed : true }, /* @__PURE__ */ React.createElement("div", { id, className: "flex flex-col space-y-1.5" }, children))
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
  const { collapsed } = useContext(SidebarContext);
  const currentPath = (_a = usePathname()) != null ? _a : "";
  const active = isRouteActive(path, currentPath, end != null ? end : false);
  const variant = active ? "secondary" : "ghost";
  return /* @__PURE__ */ React.createElement(TooltipProvider, { delayDuration: 0 }, /* @__PURE__ */ React.createElement(Tooltip, { disableHoverableContent: true }, /* @__PURE__ */ React.createElement(TooltipTrigger, { asChild: true }, /* @__PURE__ */ React.createElement(
    Button,
    {
      asChild: true,
      className: cn(
        "active:bg-secondary/60 flex w-full text-sm shadow-none",
        {
          "justify-start space-x-2.5": !collapsed,
          "hover:bg-initial": active
        }
      ),
      size: "sm",
      variant
    },
    /* @__PURE__ */ React.createElement(Link, { href: path }, Icon, /* @__PURE__ */ React.createElement(
      "span",
      {
        className: cn("w-auto transition-opacity duration-300", {
          "w-0 opacity-0": collapsed
        })
      },
      children
    ))
  )), /* @__PURE__ */ React.createElement(If, { condition: collapsed }, /* @__PURE__ */ React.createElement(TooltipContent, { side: "right", sideOffset: 10 }, children))));
}
function getClassNameBuilder(className) {
  return cva([
    cn(
      "group/sidebar transition-width fixed box-content flex h-screen w-2/12 flex-col bg-inherit backdrop-blur-xs duration-200",
      className
    )
  ]);
}
function getSidebarSizeClassName(collapsed, isExpanded) {
  return cn(["z-50 flex w-full flex-col"], {
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
          label: /* @__PURE__ */ React.createElement(Trans, { i18nKey: item.label, defaults: item.label }),
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
              /* @__PURE__ */ React.createElement(Trans, { i18nKey: child.label, defaults: child.label })
            );
          }
        })
      );
    }
  }));
}

export { Sidebar, SidebarContent, SidebarContext, SidebarDivider, SidebarGroup, SidebarItem, SidebarNavigation };
//# sourceMappingURL=sidebar.mjs.map
//# sourceMappingURL=sidebar.mjs.map