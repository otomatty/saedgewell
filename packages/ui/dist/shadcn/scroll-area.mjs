import { cn } from '../chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from '../chunk-C5AMXPVO.mjs';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

var ScrollArea = (_a) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ React.createElement(
    ScrollAreaPrimitive.Root,
    __spreadValues({
      className: cn("relative overflow-hidden", className)
    }, props),
    /* @__PURE__ */ React.createElement(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]" }, children),
    /* @__PURE__ */ React.createElement(ScrollBar, null),
    /* @__PURE__ */ React.createElement(ScrollAreaPrimitive.Corner, null)
  );
};
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
var ScrollBar = (_a) => {
  var _b = _a, { className, orientation = "vertical" } = _b, props = __objRest(_b, ["className", "orientation"]);
  return /* @__PURE__ */ React.createElement(
    ScrollAreaPrimitive.ScrollAreaScrollbar,
    __spreadValues({
      orientation,
      className: cn(
        "flex touch-none transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
        orientation === "horizontal" && "h-2.5 border-t border-t-transparent p-[1px]",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement(ScrollAreaPrimitive.ScrollAreaThumb, { className: "bg-border relative flex-1 rounded-full" })
  );
};
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
//# sourceMappingURL=scroll-area.mjs.map
//# sourceMappingURL=scroll-area.mjs.map