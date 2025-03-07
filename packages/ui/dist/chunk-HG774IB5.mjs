import { cn } from './chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from './chunk-C5AMXPVO.mjs';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

var Separator = (_a) => {
  var _b = _a, {
    className,
    orientation = "horizontal",
    decorative = true
  } = _b, props = __objRest(_b, [
    "className",
    "orientation",
    "decorative"
  ]);
  return /* @__PURE__ */ React.createElement(
    SeparatorPrimitive.Root,
    __spreadValues({
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )
    }, props)
  );
};
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
//# sourceMappingURL=chunk-HG774IB5.mjs.map
//# sourceMappingURL=chunk-HG774IB5.mjs.map