'use strict';

var chunkXE52ECJH_js = require('../chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('../chunk-GNZACLC7.js');
var reactSlot = require('@radix-ui/react-slot');
var lucideReact = require('lucide-react');

var CardButton = function CardButton2(_a) {
  var _b = _a, { className, asChild } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "asChild"]);
  const Comp = asChild ? reactSlot.Slot : "button";
  return /* @__PURE__ */ React.createElement(
    Comp,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "group hover:bg-secondary/20 active:bg-secondary active:bg-secondary/50 dark:shadow-primary/20 relative flex h-36 flex-col rounded-lg border transition-all hover:shadow-xs active:shadow-lg",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement(reactSlot.Slottable, null, props.children)
  );
};
var CardButtonTitle = function CardButtonTitle2(_a) {
  var _b = _a, { className, asChild } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "asChild"]);
  const Comp = asChild ? reactSlot.Slot : "div";
  return /* @__PURE__ */ React.createElement(
    Comp,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        className,
        "text-muted-foreground group-hover:text-secondary-foreground align-super text-sm font-medium transition-colors"
      )
    }, props),
    /* @__PURE__ */ React.createElement(reactSlot.Slottable, null, props.children)
  );
};
var CardButtonHeader = function CardButtonHeader2(_a) {
  var _b = _a, {
    className,
    asChild,
    displayArrow = true
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className",
    "asChild",
    "displayArrow"
  ]);
  const Comp = asChild ? reactSlot.Slot : "div";
  return /* @__PURE__ */ React.createElement(Comp, chunkGNZACLC7_js.__spreadValues({ className: chunkXE52ECJH_js.cn(className, "p-4") }, props), /* @__PURE__ */ React.createElement(reactSlot.Slottable, null, props.children, /* @__PURE__ */ React.createElement(
    lucideReact.ChevronRight,
    {
      className: chunkXE52ECJH_js.cn(
        "text-muted-foreground group-hover:text-secondary-foreground absolute top-4 right-2 h-4 transition-colors",
        {
          hidden: !displayArrow
        }
      )
    }
  )));
};
var CardButtonContent = function CardButtonContent2(_a) {
  var _b = _a, { className, asChild } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "asChild"]);
  const Comp = asChild ? reactSlot.Slot : "div";
  return /* @__PURE__ */ React.createElement(Comp, chunkGNZACLC7_js.__spreadValues({ className: chunkXE52ECJH_js.cn(className, "flex flex-1 flex-col px-4") }, props), /* @__PURE__ */ React.createElement(reactSlot.Slottable, null, props.children));
};
var CardButtonFooter = function CardButtonFooter2(_a) {
  var _b = _a, { className, asChild } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "asChild"]);
  const Comp = asChild ? reactSlot.Slot : "div";
  return /* @__PURE__ */ React.createElement(
    Comp,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        className,
        "mt-auto flex h-0 w-full flex-col justify-center border-t px-4"
      )
    }, props),
    /* @__PURE__ */ React.createElement(reactSlot.Slottable, null, props.children)
  );
};

exports.CardButton = CardButton;
exports.CardButtonContent = CardButtonContent;
exports.CardButtonFooter = CardButtonFooter;
exports.CardButtonHeader = CardButtonHeader;
exports.CardButtonTitle = CardButtonTitle;
//# sourceMappingURL=card-button.js.map
//# sourceMappingURL=card-button.js.map