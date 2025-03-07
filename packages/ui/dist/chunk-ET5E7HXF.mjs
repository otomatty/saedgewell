import { cn } from './chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from './chunk-C5AMXPVO.mjs';

// src/shadcn/input.tsx
var Input = (_a) => {
  var _b = _a, {
    className,
    type = "text"
  } = _b, props = __objRest(_b, [
    "className",
    "type"
  ]);
  return /* @__PURE__ */ React.createElement(
    "input",
    __spreadValues({
      type,
      className: cn(
        "border-input file:text-foreground hover:border-ring/50 placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-2xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )
    }, props)
  );
};
Input.displayName = "Input";

export { Input };
//# sourceMappingURL=chunk-ET5E7HXF.mjs.map
//# sourceMappingURL=chunk-ET5E7HXF.mjs.map