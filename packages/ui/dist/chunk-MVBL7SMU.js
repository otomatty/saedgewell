'use strict';

var chunk5GOUNTIN_js = require('./chunk-5GOUNTIN.js');
var chunkIO5EUWX4_js = require('./chunk-IO5EUWX4.js');
var chunkQ6QHVVRE_js = require('./chunk-Q6QHVVRE.js');
var chunkKRQPNMJ5_js = require('./chunk-KRQPNMJ5.js');
var chunkPQJZCJFN_js = require('./chunk-PQJZCJFN.js');
var chunkKJTOQEEZ_js = require('./chunk-KJTOQEEZ.js');
var chunk32ZXQSRB_js = require('./chunk-32ZXQSRB.js');
var chunkP64ZKZSK_js = require('./chunk-P64ZKZSK.js');
var chunkXE52ECJH_js = require('./chunk-XE52ECJH.js');
var chunkJMDHW6WM_js = require('./chunk-JMDHW6WM.js');
var chunkGNZACLC7_js = require('./chunk-GNZACLC7.js');
var React2 = require('react');
var Link = require('next/link');
var navigation = require('next/navigation');
var reactSlot = require('@radix-ui/react-slot');
var classVarianceAuthority = require('class-variance-authority');
var lucideReact = require('lucide-react');
var reactI18next = require('react-i18next');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

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

var React2__namespace = /*#__PURE__*/_interopNamespace(React2);
var Link__default = /*#__PURE__*/_interopDefault(Link);

var MOBILE_BREAKPOINT = 1024;
function useIsMobile() {
  const [isMobile, setIsMobile] = React2__namespace.useState(
    void 0
  );
  React2__namespace.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}

// src/shadcn/sidebar.tsx
var SIDEBAR_COOKIE_NAME = "sidebar:state";
var SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "4rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SIDEBAR_MINIMIZED_WIDTH = SIDEBAR_WIDTH_ICON;
var SidebarContext = React2__namespace.createContext(null);
function useSidebar() {
  const context = React2__namespace.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
var SidebarProvider = (_a) => {
  var _b = _a, {
    ref,
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "ref",
    "defaultOpen",
    "open",
    "onOpenChange",
    "className",
    "style",
    "children"
  ]);
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React2__namespace.useState(false);
  const collapsibleStyle = process.env.NEXT_PUBLIC_SIDEBAR_COLLAPSIBLE_STYLE;
  const [_open, _setOpen] = React2__namespace.useState(defaultOpen);
  const open2 = openProp != null ? openProp : _open;
  const setOpen = React2__namespace.useCallback(
    (value) => {
      if (setOpenProp) {
        return setOpenProp == null ? void 0 : setOpenProp(typeof value === "function" ? value(open2) : value);
      }
      _setOpen(value);
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${open2}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open2]
  );
  const toggleSidebar = React2__namespace.useCallback(() => {
    return isMobile ? setOpenMobile((open3) => !open3) : setOpen((open3) => !open3);
  }, [isMobile, setOpen]);
  React2__namespace.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open2 ? "expanded" : "collapsed";
  const contextValue = React2__namespace.useMemo(
    () => ({
      state,
      open: open2,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open2, setOpen, isMobile, openMobile, toggleSidebar]
  );
  const sidebarWidth = !open2 ? collapsibleStyle === "icon" ? SIDEBAR_WIDTH_ICON : collapsibleStyle === "offcanvas" ? 0 : SIDEBAR_MINIMIZED_WIDTH : SIDEBAR_WIDTH;
  return /* @__PURE__ */ React2__namespace.createElement(SidebarContext.Provider, { value: contextValue }, /* @__PURE__ */ React2__namespace.createElement(chunkKJTOQEEZ_js.TooltipProvider, { delayDuration: 0 }, /* @__PURE__ */ React2__namespace.createElement(
    "div",
    chunkGNZACLC7_js.__spreadValues({
      style: chunkGNZACLC7_js.__spreadValues({
        "--sidebar-width": sidebarWidth,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON
      }, style),
      "data-minimized": !open2,
      className: chunkXE52ECJH_js.cn(
        "group text-sidebar-foreground has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
        className
      ),
      ref
    }, props),
    children
  )));
};
SidebarProvider.displayName = "SidebarProvider";
var Sidebar = (_a) => {
  var _b = _a, {
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className,
    children,
    ref
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "side",
    "variant",
    "collapsible",
    "className",
    "children",
    "ref"
  ]);
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ React2__namespace.createElement(
      "div",
      chunkGNZACLC7_js.__spreadValues({
        className: chunkXE52ECJH_js.cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className,
          {
            [SIDEBAR_MINIMIZED_WIDTH]: !open
          }
        ),
        ref
      }, props),
      children
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ React2__namespace.createElement(chunk5GOUNTIN_js.Sheet, chunkGNZACLC7_js.__spreadValues({ open: openMobile, onOpenChange: setOpenMobile }, props), /* @__PURE__ */ React2__namespace.createElement(
      chunk5GOUNTIN_js.SheetContent,
      {
        "data-sidebar": "sidebar",
        "data-mobile": "true",
        className: chunkXE52ECJH_js.cn(
          "text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
          {
            "bg-background": variant === "ghost",
            "bg-sidebar": variant !== "ghost"
          }
        ),
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        side
      },
      /* @__PURE__ */ React2__namespace.createElement("div", { className: "flex h-full w-full flex-col" }, children)
    ));
  }
  return /* @__PURE__ */ React2__namespace.createElement(
    "div",
    {
      ref,
      className: "group peer hidden md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side
    },
    /* @__PURE__ */ React2__namespace.createElement(
      "div",
      {
        className: chunkXE52ECJH_js.cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
          {
            "h-svh": variant !== "ghost"
          }
        )
      }
    ),
    /* @__PURE__ */ React2__namespace.createElement(
      "div",
      chunkGNZACLC7_js.__spreadValues({
        className: chunkXE52ECJH_js.cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )
      }, props),
      /* @__PURE__ */ React2__namespace.createElement(
        "div",
        {
          "data-sidebar": "sidebar",
          className: chunkXE52ECJH_js.cn(
            "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
            {
              "bg-transparent": variant === "ghost"
            }
          )
        },
        children
      )
    )
  );
};
Sidebar.displayName = "Sidebar";
var SidebarTrigger = (_a) => {
  var _b = _a, {
    className,
    onClick
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className",
    "onClick"
  ]);
  const context = React2__namespace.useContext(SidebarContext);
  if (!context) {
    return null;
  }
  const { toggleSidebar } = context;
  return /* @__PURE__ */ React2__namespace.createElement(
    chunkP64ZKZSK_js.Button,
    chunkGNZACLC7_js.__spreadValues({
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: chunkXE52ECJH_js.cn("h-7 w-7", className),
      onClick: (event) => {
        onClick == null ? void 0 : onClick(event);
        toggleSidebar();
      }
    }, props),
    /* @__PURE__ */ React2__namespace.createElement(lucideReact.PanelLeft, null),
    /* @__PURE__ */ React2__namespace.createElement("span", { className: "sr-only" }, "Toggle Sidebar")
  );
};
SidebarTrigger.displayName = "SidebarTrigger";
var SidebarRail = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ React2__namespace.createElement(
    "button",
    chunkGNZACLC7_js.__spreadValues({
      "data-sidebar": "rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: toggleSidebar,
      title: "Toggle Sidebar",
      className: chunkXE52ECJH_js.cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )
    }, props)
  );
};
SidebarRail.displayName = "SidebarRail";
var SidebarInset = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2__namespace.createElement(
    "main",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "bg-background relative flex min-h-svh flex-1 flex-col",
        "peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )
    }, props)
  );
};
SidebarInset.displayName = "SidebarInset";
var SidebarInput = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2__namespace.createElement(
    chunkQ6QHVVRE_js.Input,
    chunkGNZACLC7_js.__spreadValues({
      "data-sidebar": "input",
      className: chunkXE52ECJH_js.cn(
        "bg-background focus-visible:ring-sidebar-ring h-8 w-full shadow-none focus-visible:ring-2",
        className
      )
    }, props)
  );
};
SidebarInput.displayName = "SidebarInput";
var SidebarHeader = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2__namespace.createElement(
    "div",
    chunkGNZACLC7_js.__spreadValues({
      "data-sidebar": "header",
      className: chunkXE52ECJH_js.cn("flex flex-col gap-2 p-2", className)
    }, props)
  );
};
SidebarHeader.displayName = "SidebarHeader";
var SidebarFooter = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2__namespace.createElement(
    "div",
    chunkGNZACLC7_js.__spreadValues({
      "data-sidebar": "footer",
      className: chunkXE52ECJH_js.cn("flex flex-col gap-2 p-2", className)
    }, props)
  );
};
SidebarFooter.displayName = "SidebarFooter";
var SidebarSeparator = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2__namespace.createElement(
    chunkKRQPNMJ5_js.Separator,
    chunkGNZACLC7_js.__spreadValues({
      "data-sidebar": "separator",
      className: chunkXE52ECJH_js.cn("bg-sidebar-border mx-2 w-auto", className)
    }, props)
  );
};
SidebarSeparator.displayName = "SidebarSeparator";
var SidebarContent = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2__namespace.createElement(
    "div",
    chunkGNZACLC7_js.__spreadValues({
      "data-sidebar": "content",
      className: chunkXE52ECJH_js.cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )
    }, props)
  );
};
SidebarContent.displayName = "SidebarContent";
var SidebarGroup = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2__namespace.createElement(
    "div",
    chunkGNZACLC7_js.__spreadValues({
      "data-sidebar": "group",
      className: chunkXE52ECJH_js.cn("relative flex w-full min-w-0 flex-col p-2", className)
    }, props)
  );
};
SidebarGroup.displayName = "SidebarGroup";
var SidebarGroupLabel = (_a) => {
  var _b = _a, { className, asChild = false } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "asChild"]);
  const Comp = asChild ? reactSlot.Slot : "div";
  return /* @__PURE__ */ React2__namespace.createElement(
    Comp,
    chunkGNZACLC7_js.__spreadValues({
      "data-sidebar": "group-label",
      className: chunkXE52ECJH_js.cn(
        "text-muted-foreground ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )
    }, props)
  );
};
SidebarGroupLabel.displayName = "SidebarGroupLabel";
var SidebarGroupAction = (_a) => {
  var _b = _a, { className, asChild = false } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "asChild"]);
  const Comp = asChild ? reactSlot.Slot : "button";
  return /* @__PURE__ */ React2__namespace.createElement(
    Comp,
    chunkGNZACLC7_js.__spreadValues({
      "data-sidebar": "group-action",
      className: chunkXE52ECJH_js.cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )
    }, props)
  );
};
SidebarGroupAction.displayName = "SidebarGroupAction";
var SidebarGroupContent = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2__namespace.createElement(
    "div",
    chunkGNZACLC7_js.__spreadValues({
      "data-sidebar": "group-content",
      className: chunkXE52ECJH_js.cn("w-full text-sm", className)
    }, props)
  );
};
SidebarGroupContent.displayName = "SidebarGroupContent";
var SidebarMenu = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2__namespace.createElement(
    "ul",
    chunkGNZACLC7_js.__spreadValues({
      "data-sidebar": "menu",
      className: chunkXE52ECJH_js.cn(
        "flex w-full min-w-0 flex-col gap-1 group-data-[minimized=true]:items-center",
        className
      )
    }, props)
  );
};
SidebarMenu.displayName = "SidebarMenu";
var SidebarMenuItem = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2__namespace.createElement(
    "li",
    chunkGNZACLC7_js.__spreadValues({
      "data-sidebar": "menu-item",
      className: chunkXE52ECJH_js.cn(
        "group/menu-item relative group-data-[collapsible=icon]:justify-center",
        className
      )
    }, props)
  );
};
SidebarMenuItem.displayName = "SidebarMenuItem";
var sidebarMenuButtonVariants = classVarianceAuthority.cva(
  "peer/menu-button ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:ring-primary active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var SidebarMenuButton = (_a) => {
  var _b = _a, {
    asChild = false,
    isActive = false,
    variant = "default",
    size = "default",
    tooltip,
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "asChild",
    "isActive",
    "variant",
    "size",
    "tooltip",
    "className"
  ]);
  const Comp = asChild ? reactSlot.Slot : "button";
  const { isMobile, open: open2 } = useSidebar();
  const { t } = reactI18next.useTranslation();
  const button = /* @__PURE__ */ React2__namespace.createElement(
    Comp,
    chunkGNZACLC7_js.__spreadValues({
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: chunkXE52ECJH_js.cn(sidebarMenuButtonVariants({ variant, size }), className)
    }, props)
  );
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: t(tooltip, {
        defaultValue: tooltip
      })
    };
  }
  return /* @__PURE__ */ React2__namespace.createElement(chunkKJTOQEEZ_js.Tooltip, null, /* @__PURE__ */ React2__namespace.createElement(chunkKJTOQEEZ_js.TooltipTrigger, { asChild: true }, button), /* @__PURE__ */ React2__namespace.createElement(
    chunkKJTOQEEZ_js.TooltipContent,
    chunkGNZACLC7_js.__spreadValues({
      side: "right",
      align: "center",
      hidden: isMobile || open2
    }, tooltip)
  ));
};
SidebarMenuButton.displayName = "SidebarMenuButton";
var SidebarMenuAction = (_a) => {
  var _b = _a, { className, asChild = false, showOnHover = false } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "asChild", "showOnHover"]);
  const Comp = asChild ? reactSlot.Slot : "button";
  return /* @__PURE__ */ React2__namespace.createElement(
    Comp,
    chunkGNZACLC7_js.__spreadValues({
      "data-sidebar": "menu-action",
      className: chunkXE52ECJH_js.cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover && "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className
      )
    }, props)
  );
};
SidebarMenuAction.displayName = "SidebarMenuAction";
var SidebarMenuBadge = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2__namespace.createElement(
    "div",
    chunkGNZACLC7_js.__spreadValues({
      "data-sidebar": "menu-badge",
      className: chunkXE52ECJH_js.cn(
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )
    }, props)
  );
};
SidebarMenuBadge.displayName = "SidebarMenuBadge";
var SidebarMenuSkeleton = (_a) => {
  var _b = _a, { className, showIcon = false } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "showIcon"]);
  const width = React2__namespace.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);
  return /* @__PURE__ */ React2__namespace.createElement(
    "div",
    chunkGNZACLC7_js.__spreadValues({
      "data-sidebar": "menu-skeleton",
      className: chunkXE52ECJH_js.cn("flex h-8 items-center gap-2 rounded-md px-2", className)
    }, props),
    showIcon && /* @__PURE__ */ React2__namespace.createElement(
      chunkIO5EUWX4_js.Skeleton,
      {
        className: "size-4 rounded-md",
        "data-sidebar": "menu-skeleton-icon"
      }
    ),
    /* @__PURE__ */ React2__namespace.createElement(
      chunkIO5EUWX4_js.Skeleton,
      {
        className: "h-4 max-w-(--skeleton-width) flex-1",
        "data-sidebar": "menu-skeleton-text",
        style: {
          "--skeleton-width": width
        }
      }
    )
  );
};
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
var SidebarMenuSub = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2__namespace.createElement(
    "ul",
    chunkGNZACLC7_js.__spreadValues({
      "data-sidebar": "menu-sub",
      className: chunkXE52ECJH_js.cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )
    }, props)
  );
};
SidebarMenuSub.displayName = "SidebarMenuSub";
var SidebarMenuSubItem = React2__namespace.forwardRef((_a, ref) => {
  var props = chunkGNZACLC7_js.__objRest(_a, []);
  return /* @__PURE__ */ React2__namespace.createElement("li", chunkGNZACLC7_js.__spreadValues({ ref }, props));
});
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
var SidebarMenuSubButton = (_a) => {
  var _b = _a, { asChild = false, size = "md", isActive, className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["asChild", "size", "isActive", "className"]);
  const Comp = asChild ? reactSlot.Slot : "a";
  return /* @__PURE__ */ React2__namespace.createElement(
    Comp,
    chunkGNZACLC7_js.__spreadValues({
      "data-sidebar": "menu-sub-button",
      "data-size": size,
      "data-active": isActive,
      className: chunkXE52ECJH_js.cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )
    }, props)
  );
};
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
function SidebarNavigation({
  config
}) {
  var _a;
  const currentPath = (_a = navigation.usePathname()) != null ? _a : "";
  const { open: open2 } = useSidebar();
  return /* @__PURE__ */ React2__namespace.createElement(React2__namespace.Fragment, null, config.routes.map((item, index) => {
    const isLast = index === config.routes.length - 1;
    if ("divider" in item) {
      return /* @__PURE__ */ React2__namespace.createElement(SidebarSeparator, { key: crypto.randomUUID() });
    }
    if ("children" in item) {
      const Container = (props) => {
        if (item.collapsible) {
          return /* @__PURE__ */ React2__namespace.createElement(
            chunkPQJZCJFN_js.Collapsible,
            {
              defaultOpen: !item.collapsed,
              className: "group/collapsible"
            },
            props.children
          );
        }
        return props.children;
      };
      const ContentContainer = (props) => {
        if (item.collapsible) {
          return /* @__PURE__ */ React2__namespace.createElement(chunkPQJZCJFN_js.CollapsibleContent, null, props.children);
        }
        return props.children;
      };
      return /* @__PURE__ */ React2__namespace.createElement(Container, { key: crypto.randomUUID() }, /* @__PURE__ */ React2__namespace.createElement(SidebarGroup, { key: item.label }, /* @__PURE__ */ React2__namespace.createElement(
        chunkJMDHW6WM_js.If,
        {
          condition: item.collapsible,
          fallback: /* @__PURE__ */ React2__namespace.createElement(SidebarGroupLabel, { className: chunkXE52ECJH_js.cn({ hidden: !open2 }) }, /* @__PURE__ */ React2__namespace.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: item.label, defaults: item.label }))
        },
        /* @__PURE__ */ React2__namespace.createElement(SidebarGroupLabel, { className: chunkXE52ECJH_js.cn({ hidden: !open2 }), asChild: true }, /* @__PURE__ */ React2__namespace.createElement(chunkPQJZCJFN_js.CollapsibleTrigger, null, /* @__PURE__ */ React2__namespace.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: item.label, defaults: item.label }), /* @__PURE__ */ React2__namespace.createElement(lucideReact.ChevronDown, { className: "ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" })))
      ), /* @__PURE__ */ React2__namespace.createElement(chunkJMDHW6WM_js.If, { condition: item.renderAction }, /* @__PURE__ */ React2__namespace.createElement(SidebarGroupAction, { title: item.label }, item.renderAction)), /* @__PURE__ */ React2__namespace.createElement(SidebarGroupContent, null, /* @__PURE__ */ React2__namespace.createElement(SidebarMenu, null, /* @__PURE__ */ React2__namespace.createElement(ContentContainer, null, item.children.map((child, childIndex) => {
        const Container2 = (props) => {
          if ("collapsible" in child && child.collapsible) {
            return /* @__PURE__ */ React2__namespace.createElement(
              chunkPQJZCJFN_js.Collapsible,
              {
                defaultOpen: !child.collapsed,
                className: "group/collapsible"
              },
              props.children
            );
          }
          return props.children;
        };
        const ContentContainer2 = (props) => {
          if ("collapsible" in child && child.collapsible) {
            return /* @__PURE__ */ React2__namespace.createElement(chunkPQJZCJFN_js.CollapsibleContent, null, props.children);
          }
          return props.children;
        };
        const TriggerItem = () => {
          if ("collapsible" in child && child.collapsible) {
            return /* @__PURE__ */ React2__namespace.createElement(chunkPQJZCJFN_js.CollapsibleTrigger, { asChild: true }, /* @__PURE__ */ React2__namespace.createElement(SidebarMenuButton, { tooltip: child.label }, /* @__PURE__ */ React2__namespace.createElement(
              "div",
              {
                className: chunkXE52ECJH_js.cn("flex items-center gap-2", {
                  "mx-auto w-full gap-0 [&>svg]:flex-1 [&>svg]:shrink-0": !open2
                })
              },
              child.Icon,
              /* @__PURE__ */ React2__namespace.createElement(
                "span",
                {
                  className: chunkXE52ECJH_js.cn(
                    "transition-width w-auto transition-opacity duration-500",
                    {
                      "w-0 opacity-0": !open2
                    }
                  )
                },
                /* @__PURE__ */ React2__namespace.createElement(
                  chunk32ZXQSRB_js.Trans,
                  {
                    i18nKey: child.label,
                    defaults: child.label
                  }
                )
              ),
              /* @__PURE__ */ React2__namespace.createElement(
                lucideReact.ChevronDown,
                {
                  className: chunkXE52ECJH_js.cn(
                    "ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180",
                    {
                      "hidden size-0": !open2
                    }
                  )
                }
              )
            )));
          }
          const path = "path" in child ? child.path : "";
          const end = "end" in child ? child.end : false;
          const isActive = chunkXE52ECJH_js.isRouteActive(
            path,
            currentPath,
            end
          );
          return /* @__PURE__ */ React2__namespace.createElement(
            SidebarMenuButton,
            {
              asChild: true,
              isActive,
              tooltip: child.label
            },
            /* @__PURE__ */ React2__namespace.createElement(
              Link__default.default,
              {
                className: chunkXE52ECJH_js.cn("flex items-center", {
                  "mx-auto w-full gap-0! [&>svg]:flex-1": !open2
                }),
                href: path
              },
              child.Icon,
              /* @__PURE__ */ React2__namespace.createElement(
                "span",
                {
                  className: chunkXE52ECJH_js.cn(
                    "w-auto transition-opacity duration-300",
                    {
                      "w-0 opacity-0": !open2
                    }
                  )
                },
                /* @__PURE__ */ React2__namespace.createElement(
                  chunk32ZXQSRB_js.Trans,
                  {
                    i18nKey: child.label,
                    defaults: child.label
                  }
                )
              )
            )
          );
        };
        return /* @__PURE__ */ React2__namespace.createElement(Container2, { key: crypto.randomUUID() }, /* @__PURE__ */ React2__namespace.createElement(SidebarMenuItem, null, /* @__PURE__ */ React2__namespace.createElement(TriggerItem, null), /* @__PURE__ */ React2__namespace.createElement(ContentContainer2, null, /* @__PURE__ */ React2__namespace.createElement(chunkJMDHW6WM_js.If, { condition: child.children }, (children) => /* @__PURE__ */ React2__namespace.createElement(
          SidebarMenuSub,
          {
            className: chunkXE52ECJH_js.cn({
              "mx-0 px-1.5": !open2
            })
          },
          children.map((child2) => {
            const isActive = chunkXE52ECJH_js.isRouteActive(
              child2.path,
              currentPath,
              child2.end
            );
            const linkClassName = chunkXE52ECJH_js.cn(
              "flex items-center",
              {
                "mx-auto w-full gap-0! [&>svg]:flex-1": !open2
              }
            );
            const spanClassName = chunkXE52ECJH_js.cn(
              "w-auto transition-opacity duration-300",
              {
                "w-0 opacity-0": !open2
              }
            );
            return /* @__PURE__ */ React2__namespace.createElement(SidebarMenuSubItem, { key: child2.path }, /* @__PURE__ */ React2__namespace.createElement(
              SidebarMenuSubButton,
              {
                isActive,
                asChild: true
              },
              /* @__PURE__ */ React2__namespace.createElement(
                Link__default.default,
                {
                  className: linkClassName,
                  href: child2.path
                },
                child2.Icon,
                /* @__PURE__ */ React2__namespace.createElement("span", { className: spanClassName }, /* @__PURE__ */ React2__namespace.createElement(
                  chunk32ZXQSRB_js.Trans,
                  {
                    i18nKey: child2.label,
                    defaults: child2.label
                  }
                ))
              )
            ));
          })
        ))), /* @__PURE__ */ React2__namespace.createElement(SidebarMenuAction, null, child.renderAction)));
      }))))), /* @__PURE__ */ React2__namespace.createElement(chunkJMDHW6WM_js.If, { condition: !open2 && !isLast }, /* @__PURE__ */ React2__namespace.createElement(SidebarSeparator, null)));
    }
  }));
}

exports.Sidebar = Sidebar;
exports.SidebarContent = SidebarContent;
exports.SidebarContext = SidebarContext;
exports.SidebarFooter = SidebarFooter;
exports.SidebarGroup = SidebarGroup;
exports.SidebarGroupAction = SidebarGroupAction;
exports.SidebarGroupContent = SidebarGroupContent;
exports.SidebarGroupLabel = SidebarGroupLabel;
exports.SidebarHeader = SidebarHeader;
exports.SidebarInput = SidebarInput;
exports.SidebarInset = SidebarInset;
exports.SidebarMenu = SidebarMenu;
exports.SidebarMenuAction = SidebarMenuAction;
exports.SidebarMenuBadge = SidebarMenuBadge;
exports.SidebarMenuButton = SidebarMenuButton;
exports.SidebarMenuItem = SidebarMenuItem;
exports.SidebarMenuSkeleton = SidebarMenuSkeleton;
exports.SidebarMenuSub = SidebarMenuSub;
exports.SidebarMenuSubButton = SidebarMenuSubButton;
exports.SidebarMenuSubItem = SidebarMenuSubItem;
exports.SidebarNavigation = SidebarNavigation;
exports.SidebarProvider = SidebarProvider;
exports.SidebarRail = SidebarRail;
exports.SidebarSeparator = SidebarSeparator;
exports.SidebarTrigger = SidebarTrigger;
exports.useSidebar = useSidebar;
//# sourceMappingURL=chunk-MVBL7SMU.js.map
//# sourceMappingURL=chunk-MVBL7SMU.js.map