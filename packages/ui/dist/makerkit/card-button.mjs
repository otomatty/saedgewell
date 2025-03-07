import { cn } from '../chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from '../chunk-C5AMXPVO.mjs';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { ChevronRight } from 'lucide-react';

var CardButton = function CardButton2(_a) {
  var _b = _a, { className, asChild } = _b, props = __objRest(_b, ["className", "asChild"]);
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ React.createElement(
    Comp,
    __spreadValues({
      className: cn(
        "group hover:bg-secondary/20 active:bg-secondary active:bg-secondary/50 dark:shadow-primary/20 relative flex h-36 flex-col rounded-lg border transition-all hover:shadow-xs active:shadow-lg",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement(Slottable, null, props.children)
  );
};
var CardButtonTitle = function CardButtonTitle2(_a) {
  var _b = _a, { className, asChild } = _b, props = __objRest(_b, ["className", "asChild"]);
  const Comp = asChild ? Slot : "div";
  return /* @__PURE__ */ React.createElement(
    Comp,
    __spreadValues({
      className: cn(
        className,
        "text-muted-foreground group-hover:text-secondary-foreground align-super text-sm font-medium transition-colors"
      )
    }, props),
    /* @__PURE__ */ React.createElement(Slottable, null, props.children)
  );
};
var CardButtonHeader = function CardButtonHeader2(_a) {
  var _b = _a, {
    className,
    asChild,
    displayArrow = true
  } = _b, props = __objRest(_b, [
    "className",
    "asChild",
    "displayArrow"
  ]);
  const Comp = asChild ? Slot : "div";
  return /* @__PURE__ */ React.createElement(Comp, __spreadValues({ className: cn(className, "p-4") }, props), /* @__PURE__ */ React.createElement(Slottable, null, props.children, /* @__PURE__ */ React.createElement(
    ChevronRight,
    {
      className: cn(
        "text-muted-foreground group-hover:text-secondary-foreground absolute top-4 right-2 h-4 transition-colors",
        {
          hidden: !displayArrow
        }
      )
    }
  )));
};
var CardButtonContent = function CardButtonContent2(_a) {
  var _b = _a, { className, asChild } = _b, props = __objRest(_b, ["className", "asChild"]);
  const Comp = asChild ? Slot : "div";
  return /* @__PURE__ */ React.createElement(Comp, __spreadValues({ className: cn(className, "flex flex-1 flex-col px-4") }, props), /* @__PURE__ */ React.createElement(Slottable, null, props.children));
};
var CardButtonFooter = function CardButtonFooter2(_a) {
  var _b = _a, { className, asChild } = _b, props = __objRest(_b, ["className", "asChild"]);
  const Comp = asChild ? Slot : "div";
  return /* @__PURE__ */ React.createElement(
    Comp,
    __spreadValues({
      className: cn(
        className,
        "mt-auto flex h-0 w-full flex-col justify-center border-t px-4"
      )
    }, props),
    /* @__PURE__ */ React.createElement(Slottable, null, props.children)
  );
};

export { CardButton, CardButtonContent, CardButtonFooter, CardButtonHeader, CardButtonTitle };
//# sourceMappingURL=card-button.mjs.map
//# sourceMappingURL=card-button.mjs.map