import { Button } from '../chunk-BSMUWSCW.mjs';
import { cn } from '../chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from '../chunk-C5AMXPVO.mjs';
import React from 'react';

var EmptyStateHeading = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "h3",
    __spreadValues({
      className: cn("text-2xl font-bold tracking-tight", className)
    }, props)
  );
};
EmptyStateHeading.displayName = "EmptyStateHeading";
var EmptyStateText = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement("p", __spreadValues({ className: cn("text-muted-foreground text-sm", className) }, props));
};
EmptyStateText.displayName = "EmptyStateText";
var EmptyStateButton = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(Button, __spreadValues({ className: cn("mt-4", className) }, props));
};
EmptyStateButton.displayName = "EmptyStateButton";
var EmptyState = (_a) => {
  var _b = _a, {
    children,
    className
  } = _b, props = __objRest(_b, [
    "children",
    "className"
  ]);
  const childrenArray = React.Children.toArray(children);
  const heading = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === EmptyStateHeading
  );
  const text = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === EmptyStateText
  );
  const button = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === EmptyStateButton
  );
  const cmps = [EmptyStateHeading, EmptyStateText, EmptyStateButton];
  const otherChildren = childrenArray.filter(
    (child) => React.isValidElement(child) && !cmps.includes(child.type)
  );
  return /* @__PURE__ */ React.createElement(
    "div",
    __spreadValues({
      className: cn(
        "flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-xs",
        className
      )
    }, props),
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center gap-1 text-center" }, heading, text, button, otherChildren)
  );
};
EmptyState.displayName = "EmptyState";

export { EmptyState, EmptyStateButton, EmptyStateHeading, EmptyStateText };
//# sourceMappingURL=empty-state.mjs.map
//# sourceMappingURL=empty-state.mjs.map