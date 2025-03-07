import { cn } from '../chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from '../chunk-C5AMXPVO.mjs';
import * as SwitchPrimitives from '@radix-ui/react-switch';

var Switch = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    SwitchPrimitives.Root,
    __spreadValues({
      className: cn(
        "peer focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "bg-background pointer-events-none block h-4 w-4 rounded-full ring-0 shadow-lg transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  );
};
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
//# sourceMappingURL=switch.mjs.map
//# sourceMappingURL=switch.mjs.map