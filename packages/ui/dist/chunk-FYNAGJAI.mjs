import { cn } from './chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from './chunk-C5AMXPVO.mjs';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

var TooltipProvider = TooltipPrimitive.Provider;
var Tooltip = TooltipPrimitive.Root;
var TooltipTrigger = TooltipPrimitive.Trigger;
var TooltipContent = (_a) => {
  var _b = _a, { className, sideOffset = 4 } = _b, props = __objRest(_b, ["className", "sideOffset"]);
  return /* @__PURE__ */ React.createElement(
    TooltipPrimitive.Content,
    __spreadValues({
      sideOffset,
      className: cn(
        "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs",
        className
      )
    }, props)
  );
};
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
//# sourceMappingURL=chunk-FYNAGJAI.mjs.map
//# sourceMappingURL=chunk-FYNAGJAI.mjs.map