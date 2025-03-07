import { SidebarTrigger } from '../chunk-RMDCU6VK.mjs';
import '../chunk-W33DKHG5.mjs';
import '../chunk-T7ZRAWU6.mjs';
import '../chunk-ET5E7HXF.mjs';
import { Separator } from '../chunk-HG774IB5.mjs';
import '../chunk-Z6CMMLPJ.mjs';
import '../chunk-FYNAGJAI.mjs';
import '../chunk-3F2QG6WC.mjs';
import '../chunk-IOTGEBOC.mjs';
import '../chunk-BSMUWSCW.mjs';
import { cn } from '../chunk-WKYHJYPA.mjs';
import { If } from '../chunk-7AKVYG64.mjs';
import { __spreadValues } from '../chunk-C5AMXPVO.mjs';
import * as React from 'react';

var ENABLE_SIDEBAR_TRIGGER = process.env.NEXT_PUBLIC_ENABLE_SIDEBAR_TRIGGER ? process.env.NEXT_PUBLIC_ENABLE_SIDEBAR_TRIGGER === "true" : true;
function Page(props) {
  switch (props.style) {
    case "header":
      return /* @__PURE__ */ React.createElement(PageWithHeader, __spreadValues({}, props));
    case "custom":
      return props.children;
    default:
      return /* @__PURE__ */ React.createElement(PageWithSidebar, __spreadValues({}, props));
  }
}
function PageWithSidebar(props) {
  var _a;
  const { Navigation, Children: Children2, MobileNavigation } = getSlotsFromPage(props);
  return /* @__PURE__ */ React.createElement("div", { className: cn("flex min-w-0 flex-1", props.className) }, Navigation, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: (_a = props.contentContainerClassName) != null ? _a : "mx-auto flex h-screen w-full flex-col overflow-y-auto bg-inherit"
    },
    MobileNavigation,
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "bg-background flex flex-1 flex-col overflow-y-auto px-4 lg:px-0"
      },
      Children2
    )
  ));
}
function PageMobileNavigation(props) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: cn(
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
  return /* @__PURE__ */ React.createElement("div", { className: cn("flex h-screen flex-1 flex-col", props.className) }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: (_a = props.contentContainerClassName) != null ? _a : "flex flex-1 flex-col space-y-4"
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: cn(
          "bg-muted/40 dark:border-border dark:shadow-primary/10 flex h-14 items-center justify-between px-4 lg:justify-start lg:shadow-xs",
          {
            "sticky top-0 z-10 backdrop-blur-md": (_b = props.sticky) != null ? _b : true
          }
        )
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "hidden w-full flex-1 items-center space-x-8 lg:flex"
        },
        Navigation
      ),
      MobileNavigation
    ),
    /* @__PURE__ */ React.createElement("div", { className: "container flex flex-1 flex-col" }, Children2)
  ));
}
function PageBody(props) {
  const className = cn("flex w-full flex-1 flex-col lg:px-4", props.className);
  return /* @__PURE__ */ React.createElement("div", { className }, props.children);
}
function PageNavigation(props) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex-1 bg-inherit" }, props.children);
}
function PageDescription(props) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex h-6 items-center" }, /* @__PURE__ */ React.createElement("div", { className: "text-muted-foreground text-xs leading-none font-normal" }, props.children));
}
function PageTitle(props) {
  return /* @__PURE__ */ React.createElement(
    "h1",
    {
      className: "font-heading text-base leading-none font-bold tracking-tight dark:text-white"
    },
    props.children
  );
}
function PageHeaderActions(props) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-2" }, props.children);
}
function PageHeader({
  children,
  title,
  description,
  className,
  displaySidebarTrigger = ENABLE_SIDEBAR_TRIGGER
}) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: cn(
        "flex items-center justify-between py-5 lg:px-4",
        className
      )
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-x-2.5" }, displaySidebarTrigger ? /* @__PURE__ */ React.createElement(SidebarTrigger, { className: "text-muted-foreground hover:text-secondary-foreground hidden h-4.5 w-4.5 cursor-pointer lg:inline-flex" }) : null, /* @__PURE__ */ React.createElement(If, { condition: description }, /* @__PURE__ */ React.createElement(If, { condition: displaySidebarTrigger }, /* @__PURE__ */ React.createElement(
      Separator,
      {
        orientation: "vertical",
        className: "hidden h-4 w-px lg:group-data-[minimized]:block"
      }
    )), /* @__PURE__ */ React.createElement(PageDescription, null, description))), /* @__PURE__ */ React.createElement(If, { condition: title }, /* @__PURE__ */ React.createElement(PageTitle, null, title))),
    children
  );
}
function getSlotsFromPage(props) {
  return React.Children.toArray(props.children).reduce(
    (acc, child) => {
      if (!React.isValidElement(child)) {
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

export { Page, PageBody, PageDescription, PageHeader, PageHeaderActions, PageMobileNavigation, PageNavigation, PageTitle };
//# sourceMappingURL=page.mjs.map
//# sourceMappingURL=page.mjs.map