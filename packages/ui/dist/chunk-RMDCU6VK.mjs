import { Sheet, SheetContent } from './chunk-W33DKHG5.mjs';
import { Skeleton } from './chunk-T7ZRAWU6.mjs';
import { Input } from './chunk-ET5E7HXF.mjs';
import { Separator } from './chunk-HG774IB5.mjs';
import { CollapsibleTrigger, Collapsible, CollapsibleContent } from './chunk-Z6CMMLPJ.mjs';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './chunk-FYNAGJAI.mjs';
import { Trans } from './chunk-IOTGEBOC.mjs';
import { Button } from './chunk-BSMUWSCW.mjs';
import { cn, isRouteActive } from './chunk-WKYHJYPA.mjs';
import { If } from './chunk-7AKVYG64.mjs';
import { __objRest, __spreadValues } from './chunk-C5AMXPVO.mjs';
import * as React2 from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { PanelLeft, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

var MOBILE_BREAKPOINT = 1024;
function useIsMobile() {
  const [isMobile, setIsMobile] = React2.useState(
    void 0
  );
  React2.useEffect(() => {
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
var SidebarContext = React2.createContext(null);
function useSidebar() {
  const context = React2.useContext(SidebarContext);
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
  } = _b, props = __objRest(_b, [
    "ref",
    "defaultOpen",
    "open",
    "onOpenChange",
    "className",
    "style",
    "children"
  ]);
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React2.useState(false);
  const collapsibleStyle = process.env.NEXT_PUBLIC_SIDEBAR_COLLAPSIBLE_STYLE;
  const [_open, _setOpen] = React2.useState(defaultOpen);
  const open2 = openProp != null ? openProp : _open;
  const setOpen = React2.useCallback(
    (value) => {
      if (setOpenProp) {
        return setOpenProp == null ? void 0 : setOpenProp(typeof value === "function" ? value(open2) : value);
      }
      _setOpen(value);
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${open2}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open2]
  );
  const toggleSidebar = React2.useCallback(() => {
    return isMobile ? setOpenMobile((open3) => !open3) : setOpen((open3) => !open3);
  }, [isMobile, setOpen]);
  React2.useEffect(() => {
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
  const contextValue = React2.useMemo(
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
  return /* @__PURE__ */ React2.createElement(SidebarContext.Provider, { value: contextValue }, /* @__PURE__ */ React2.createElement(TooltipProvider, { delayDuration: 0 }, /* @__PURE__ */ React2.createElement(
    "div",
    __spreadValues({
      style: __spreadValues({
        "--sidebar-width": sidebarWidth,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON
      }, style),
      "data-minimized": !open2,
      className: cn(
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
  } = _b, props = __objRest(_b, [
    "side",
    "variant",
    "collapsible",
    "className",
    "children",
    "ref"
  ]);
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ React2.createElement(
      "div",
      __spreadValues({
        className: cn(
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
    return /* @__PURE__ */ React2.createElement(Sheet, __spreadValues({ open: openMobile, onOpenChange: setOpenMobile }, props), /* @__PURE__ */ React2.createElement(
      SheetContent,
      {
        "data-sidebar": "sidebar",
        "data-mobile": "true",
        className: cn(
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
      /* @__PURE__ */ React2.createElement("div", { className: "flex h-full w-full flex-col" }, children)
    ));
  }
  return /* @__PURE__ */ React2.createElement(
    "div",
    {
      ref,
      className: "group peer hidden md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side
    },
    /* @__PURE__ */ React2.createElement(
      "div",
      {
        className: cn(
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
    /* @__PURE__ */ React2.createElement(
      "div",
      __spreadValues({
        className: cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )
      }, props),
      /* @__PURE__ */ React2.createElement(
        "div",
        {
          "data-sidebar": "sidebar",
          className: cn(
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
  } = _b, props = __objRest(_b, [
    "className",
    "onClick"
  ]);
  const context = React2.useContext(SidebarContext);
  if (!context) {
    return null;
  }
  const { toggleSidebar } = context;
  return /* @__PURE__ */ React2.createElement(
    Button,
    __spreadValues({
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: cn("h-7 w-7", className),
      onClick: (event) => {
        onClick == null ? void 0 : onClick(event);
        toggleSidebar();
      }
    }, props),
    /* @__PURE__ */ React2.createElement(PanelLeft, null),
    /* @__PURE__ */ React2.createElement("span", { className: "sr-only" }, "Toggle Sidebar")
  );
};
SidebarTrigger.displayName = "SidebarTrigger";
var SidebarRail = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ React2.createElement(
    "button",
    __spreadValues({
      "data-sidebar": "rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: toggleSidebar,
      title: "Toggle Sidebar",
      className: cn(
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
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2.createElement(
    "main",
    __spreadValues({
      className: cn(
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
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2.createElement(
    Input,
    __spreadValues({
      "data-sidebar": "input",
      className: cn(
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
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2.createElement(
    "div",
    __spreadValues({
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-2", className)
    }, props)
  );
};
SidebarHeader.displayName = "SidebarHeader";
var SidebarFooter = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2.createElement(
    "div",
    __spreadValues({
      "data-sidebar": "footer",
      className: cn("flex flex-col gap-2 p-2", className)
    }, props)
  );
};
SidebarFooter.displayName = "SidebarFooter";
var SidebarSeparator = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2.createElement(
    Separator,
    __spreadValues({
      "data-sidebar": "separator",
      className: cn("bg-sidebar-border mx-2 w-auto", className)
    }, props)
  );
};
SidebarSeparator.displayName = "SidebarSeparator";
var SidebarContent = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2.createElement(
    "div",
    __spreadValues({
      "data-sidebar": "content",
      className: cn(
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
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2.createElement(
    "div",
    __spreadValues({
      "data-sidebar": "group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className)
    }, props)
  );
};
SidebarGroup.displayName = "SidebarGroup";
var SidebarGroupLabel = (_a) => {
  var _b = _a, { className, asChild = false } = _b, props = __objRest(_b, ["className", "asChild"]);
  const Comp = asChild ? Slot : "div";
  return /* @__PURE__ */ React2.createElement(
    Comp,
    __spreadValues({
      "data-sidebar": "group-label",
      className: cn(
        "text-muted-foreground ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )
    }, props)
  );
};
SidebarGroupLabel.displayName = "SidebarGroupLabel";
var SidebarGroupAction = (_a) => {
  var _b = _a, { className, asChild = false } = _b, props = __objRest(_b, ["className", "asChild"]);
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ React2.createElement(
    Comp,
    __spreadValues({
      "data-sidebar": "group-action",
      className: cn(
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
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2.createElement(
    "div",
    __spreadValues({
      "data-sidebar": "group-content",
      className: cn("w-full text-sm", className)
    }, props)
  );
};
SidebarGroupContent.displayName = "SidebarGroupContent";
var SidebarMenu = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2.createElement(
    "ul",
    __spreadValues({
      "data-sidebar": "menu",
      className: cn(
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
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2.createElement(
    "li",
    __spreadValues({
      "data-sidebar": "menu-item",
      className: cn(
        "group/menu-item relative group-data-[collapsible=icon]:justify-center",
        className
      )
    }, props)
  );
};
SidebarMenuItem.displayName = "SidebarMenuItem";
var sidebarMenuButtonVariants = cva(
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
  } = _b, props = __objRest(_b, [
    "asChild",
    "isActive",
    "variant",
    "size",
    "tooltip",
    "className"
  ]);
  const Comp = asChild ? Slot : "button";
  const { isMobile, open: open2 } = useSidebar();
  const { t } = useTranslation();
  const button = /* @__PURE__ */ React2.createElement(
    Comp,
    __spreadValues({
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(sidebarMenuButtonVariants({ variant, size }), className)
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
  return /* @__PURE__ */ React2.createElement(Tooltip, null, /* @__PURE__ */ React2.createElement(TooltipTrigger, { asChild: true }, button), /* @__PURE__ */ React2.createElement(
    TooltipContent,
    __spreadValues({
      side: "right",
      align: "center",
      hidden: isMobile || open2
    }, tooltip)
  ));
};
SidebarMenuButton.displayName = "SidebarMenuButton";
var SidebarMenuAction = (_a) => {
  var _b = _a, { className, asChild = false, showOnHover = false } = _b, props = __objRest(_b, ["className", "asChild", "showOnHover"]);
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ React2.createElement(
    Comp,
    __spreadValues({
      "data-sidebar": "menu-action",
      className: cn(
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
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2.createElement(
    "div",
    __spreadValues({
      "data-sidebar": "menu-badge",
      className: cn(
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
  var _b = _a, { className, showIcon = false } = _b, props = __objRest(_b, ["className", "showIcon"]);
  const width = React2.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);
  return /* @__PURE__ */ React2.createElement(
    "div",
    __spreadValues({
      "data-sidebar": "menu-skeleton",
      className: cn("flex h-8 items-center gap-2 rounded-md px-2", className)
    }, props),
    showIcon && /* @__PURE__ */ React2.createElement(
      Skeleton,
      {
        className: "size-4 rounded-md",
        "data-sidebar": "menu-skeleton-icon"
      }
    ),
    /* @__PURE__ */ React2.createElement(
      Skeleton,
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
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React2.createElement(
    "ul",
    __spreadValues({
      "data-sidebar": "menu-sub",
      className: cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )
    }, props)
  );
};
SidebarMenuSub.displayName = "SidebarMenuSub";
var SidebarMenuSubItem = React2.forwardRef((_a, ref) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ React2.createElement("li", __spreadValues({ ref }, props));
});
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
var SidebarMenuSubButton = (_a) => {
  var _b = _a, { asChild = false, size = "md", isActive, className } = _b, props = __objRest(_b, ["asChild", "size", "isActive", "className"]);
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ React2.createElement(
    Comp,
    __spreadValues({
      "data-sidebar": "menu-sub-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(
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
  const currentPath = (_a = usePathname()) != null ? _a : "";
  const { open: open2 } = useSidebar();
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, config.routes.map((item, index) => {
    const isLast = index === config.routes.length - 1;
    if ("divider" in item) {
      return /* @__PURE__ */ React2.createElement(SidebarSeparator, { key: crypto.randomUUID() });
    }
    if ("children" in item) {
      const Container = (props) => {
        if (item.collapsible) {
          return /* @__PURE__ */ React2.createElement(
            Collapsible,
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
          return /* @__PURE__ */ React2.createElement(CollapsibleContent, null, props.children);
        }
        return props.children;
      };
      return /* @__PURE__ */ React2.createElement(Container, { key: crypto.randomUUID() }, /* @__PURE__ */ React2.createElement(SidebarGroup, { key: item.label }, /* @__PURE__ */ React2.createElement(
        If,
        {
          condition: item.collapsible,
          fallback: /* @__PURE__ */ React2.createElement(SidebarGroupLabel, { className: cn({ hidden: !open2 }) }, /* @__PURE__ */ React2.createElement(Trans, { i18nKey: item.label, defaults: item.label }))
        },
        /* @__PURE__ */ React2.createElement(SidebarGroupLabel, { className: cn({ hidden: !open2 }), asChild: true }, /* @__PURE__ */ React2.createElement(CollapsibleTrigger, null, /* @__PURE__ */ React2.createElement(Trans, { i18nKey: item.label, defaults: item.label }), /* @__PURE__ */ React2.createElement(ChevronDown, { className: "ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" })))
      ), /* @__PURE__ */ React2.createElement(If, { condition: item.renderAction }, /* @__PURE__ */ React2.createElement(SidebarGroupAction, { title: item.label }, item.renderAction)), /* @__PURE__ */ React2.createElement(SidebarGroupContent, null, /* @__PURE__ */ React2.createElement(SidebarMenu, null, /* @__PURE__ */ React2.createElement(ContentContainer, null, item.children.map((child, childIndex) => {
        const Container2 = (props) => {
          if ("collapsible" in child && child.collapsible) {
            return /* @__PURE__ */ React2.createElement(
              Collapsible,
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
            return /* @__PURE__ */ React2.createElement(CollapsibleContent, null, props.children);
          }
          return props.children;
        };
        const TriggerItem = () => {
          if ("collapsible" in child && child.collapsible) {
            return /* @__PURE__ */ React2.createElement(CollapsibleTrigger, { asChild: true }, /* @__PURE__ */ React2.createElement(SidebarMenuButton, { tooltip: child.label }, /* @__PURE__ */ React2.createElement(
              "div",
              {
                className: cn("flex items-center gap-2", {
                  "mx-auto w-full gap-0 [&>svg]:flex-1 [&>svg]:shrink-0": !open2
                })
              },
              child.Icon,
              /* @__PURE__ */ React2.createElement(
                "span",
                {
                  className: cn(
                    "transition-width w-auto transition-opacity duration-500",
                    {
                      "w-0 opacity-0": !open2
                    }
                  )
                },
                /* @__PURE__ */ React2.createElement(
                  Trans,
                  {
                    i18nKey: child.label,
                    defaults: child.label
                  }
                )
              ),
              /* @__PURE__ */ React2.createElement(
                ChevronDown,
                {
                  className: cn(
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
          const isActive = isRouteActive(
            path,
            currentPath,
            end
          );
          return /* @__PURE__ */ React2.createElement(
            SidebarMenuButton,
            {
              asChild: true,
              isActive,
              tooltip: child.label
            },
            /* @__PURE__ */ React2.createElement(
              Link,
              {
                className: cn("flex items-center", {
                  "mx-auto w-full gap-0! [&>svg]:flex-1": !open2
                }),
                href: path
              },
              child.Icon,
              /* @__PURE__ */ React2.createElement(
                "span",
                {
                  className: cn(
                    "w-auto transition-opacity duration-300",
                    {
                      "w-0 opacity-0": !open2
                    }
                  )
                },
                /* @__PURE__ */ React2.createElement(
                  Trans,
                  {
                    i18nKey: child.label,
                    defaults: child.label
                  }
                )
              )
            )
          );
        };
        return /* @__PURE__ */ React2.createElement(Container2, { key: crypto.randomUUID() }, /* @__PURE__ */ React2.createElement(SidebarMenuItem, null, /* @__PURE__ */ React2.createElement(TriggerItem, null), /* @__PURE__ */ React2.createElement(ContentContainer2, null, /* @__PURE__ */ React2.createElement(If, { condition: child.children }, (children) => /* @__PURE__ */ React2.createElement(
          SidebarMenuSub,
          {
            className: cn({
              "mx-0 px-1.5": !open2
            })
          },
          children.map((child2) => {
            const isActive = isRouteActive(
              child2.path,
              currentPath,
              child2.end
            );
            const linkClassName = cn(
              "flex items-center",
              {
                "mx-auto w-full gap-0! [&>svg]:flex-1": !open2
              }
            );
            const spanClassName = cn(
              "w-auto transition-opacity duration-300",
              {
                "w-0 opacity-0": !open2
              }
            );
            return /* @__PURE__ */ React2.createElement(SidebarMenuSubItem, { key: child2.path }, /* @__PURE__ */ React2.createElement(
              SidebarMenuSubButton,
              {
                isActive,
                asChild: true
              },
              /* @__PURE__ */ React2.createElement(
                Link,
                {
                  className: linkClassName,
                  href: child2.path
                },
                child2.Icon,
                /* @__PURE__ */ React2.createElement("span", { className: spanClassName }, /* @__PURE__ */ React2.createElement(
                  Trans,
                  {
                    i18nKey: child2.label,
                    defaults: child2.label
                  }
                ))
              )
            ));
          })
        ))), /* @__PURE__ */ React2.createElement(SidebarMenuAction, null, child.renderAction)));
      }))))), /* @__PURE__ */ React2.createElement(If, { condition: !open2 && !isLast }, /* @__PURE__ */ React2.createElement(SidebarSeparator, null)));
    }
  }));
}

export { Sidebar, SidebarContent, SidebarContext, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarNavigation, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar };
//# sourceMappingURL=chunk-RMDCU6VK.mjs.map
//# sourceMappingURL=chunk-RMDCU6VK.mjs.map