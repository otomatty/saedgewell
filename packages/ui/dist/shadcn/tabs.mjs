import { cn } from '../chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from '../chunk-C5AMXPVO.mjs';
import * as TabsPrimitive from '@radix-ui/react-tabs';

var Tabs = TabsPrimitive.Root;
var TabsList = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    TabsPrimitive.List,
    __spreadValues({
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1",
        className
      )
    }, props)
  );
};
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    TabsPrimitive.Trigger,
    __spreadValues({
      className: cn(
        "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center rounded-xs px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-xs",
        className
      )
    }, props)
  );
};
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    TabsPrimitive.Content,
    __spreadValues({
      className: cn(
        "ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
        className
      )
    }, props)
  );
};
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
//# sourceMappingURL=tabs.mjs.map
//# sourceMappingURL=tabs.mjs.map