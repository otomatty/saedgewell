import { CheckIcon } from '../chunk-3F2QG6WC.mjs';
import { cn } from '../chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from '../chunk-C5AMXPVO.mjs';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

var RadioGroup = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    RadioGroupPrimitive.Root,
    __spreadValues({
      className: cn("grid gap-2", className)
    }, props)
  );
};
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
var RadioGroupItem = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    RadioGroupPrimitive.Item,
    __spreadValues({
      className: cn(
        "border-primary text-primary focus-visible:ring-ring aspect-square h-4 w-4 rounded-full border shadow-xs focus:outline-hidden focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckIcon, { className: "fill-primary h-3.5 w-3.5" }))
  );
};
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
var RadioGroupItemLabel = (props) => {
  return /* @__PURE__ */ React.createElement(
    "label",
    {
      htmlFor: props.htmlFor,
      className: cn(
        props.className,
        "flex cursor-pointer rounded-md border-input items-center space-x-4 border transition-duration-500 focus-within:border-primary p-4 text-sm transition-all",
        {
          "bg-muted": props.selected,
          "hover:bg-muted": !props.selected
        }
      )
    },
    props.children
  );
};
RadioGroupItemLabel.displayName = "RadioGroupItemLabel";

export { RadioGroup, RadioGroupItem, RadioGroupItemLabel };
//# sourceMappingURL=radio-group.mjs.map
//# sourceMappingURL=radio-group.mjs.map