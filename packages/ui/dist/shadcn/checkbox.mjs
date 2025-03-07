import { CheckIcon } from '../chunk-3F2QG6WC.mjs';
import { cn } from '../chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from '../chunk-C5AMXPVO.mjs';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

var Checkbox = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    CheckboxPrimitive.Root,
    __spreadValues({
      className: cn(
        "peer border-primary focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-4 w-4 shrink-0 rounded-xs border shadow-xs focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement(
      CheckboxPrimitive.Indicator,
      {
        className: cn("flex items-center justify-center text-current")
      },
      /* @__PURE__ */ React.createElement(CheckIcon, { className: "h-4 w-4" })
    )
  );
};
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
//# sourceMappingURL=checkbox.mjs.map
//# sourceMappingURL=checkbox.mjs.map