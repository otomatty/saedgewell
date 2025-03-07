import { CaretSortIcon, ChevronUpIcon, ChevronDownIcon, CheckIcon } from './chunk-3F2QG6WC.mjs';
import { cn } from './chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from './chunk-C5AMXPVO.mjs';
import * as SelectPrimitive from '@radix-ui/react-select';

var Select = SelectPrimitive.Root;
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = (_a) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ React.createElement(
    SelectPrimitive.Trigger,
    __spreadValues({
      className: cn(
        "border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-2xs focus:ring-1 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      )
    }, props),
    children,
    /* @__PURE__ */ React.createElement(SelectPrimitive.Icon, { asChild: true }, /* @__PURE__ */ React.createElement(CaretSortIcon, { className: "h-4 w-4 opacity-50" }))
  );
};
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButton = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    SelectPrimitive.ScrollUpButton,
    __spreadValues({
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement(ChevronUpIcon, null)
  );
};
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButton = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    SelectPrimitive.ScrollDownButton,
    __spreadValues({
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement(ChevronDownIcon, null)
  );
};
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContent = (_a) => {
  var _b = _a, { className, children, position = "popper" } = _b, props = __objRest(_b, ["className", "children", "position"]);
  return /* @__PURE__ */ React.createElement(SelectPrimitive.Portal, null, /* @__PURE__ */ React.createElement(
    SelectPrimitive.Content,
    __spreadValues({
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position
    }, props),
    /* @__PURE__ */ React.createElement(SelectScrollUpButton, null),
    /* @__PURE__ */ React.createElement(
      SelectPrimitive.Viewport,
      {
        className: cn(
          "p-1",
          position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )
      },
      children
    ),
    /* @__PURE__ */ React.createElement(SelectScrollDownButton, null)
  ));
};
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    SelectPrimitive.Label,
    __spreadValues({
      className: cn("px-2 py-1.5 text-sm font-semibold", className)
    }, props)
  );
};
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = (_a) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ React.createElement(
    SelectPrimitive.Item,
    __spreadValues({
      className: cn(
        "focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center rounded-xs py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center" }, /* @__PURE__ */ React.createElement(SelectPrimitive.ItemIndicator, null, /* @__PURE__ */ React.createElement(CheckIcon, { className: "h-4 w-4" }))),
    /* @__PURE__ */ React.createElement(SelectPrimitive.ItemText, null, children)
  );
};
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    SelectPrimitive.Separator,
    __spreadValues({
      className: cn("bg-muted -mx-1 my-1 h-px", className)
    }, props)
  );
};
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue };
//# sourceMappingURL=chunk-MTTMPZ3H.mjs.map
//# sourceMappingURL=chunk-MTTMPZ3H.mjs.map