import { cn } from './chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from './chunk-C5AMXPVO.mjs';

// src/shadcn/card.tsx
var Card = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "div",
    __spreadValues({
      className: cn("bg-card text-card-foreground rounded-xl border", className)
    }, props)
  );
};
Card.displayName = "Card";
var CardHeader = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement("div", __spreadValues({ className: cn("flex flex-col space-y-1.5 p-6", className) }, props));
};
CardHeader.displayName = "CardHeader";
var CardTitle = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "h3",
    __spreadValues({
      className: cn("leading-none font-semibold tracking-tight", className)
    }, props)
  );
};
CardTitle.displayName = "CardTitle";
var CardDescription = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement("p", __spreadValues({ className: cn("text-muted-foreground text-sm", className) }, props));
};
CardDescription.displayName = "CardDescription";
var CardContent = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement("div", __spreadValues({ className: cn("p-6 pt-0", className) }, props));
};
CardContent.displayName = "CardContent";
var CardFooter = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement("div", __spreadValues({ className: cn("flex items-center p-6 pt-0", className) }, props));
};
CardFooter.displayName = "CardFooter";

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
//# sourceMappingURL=chunk-V7DJTX2I.mjs.map
//# sourceMappingURL=chunk-V7DJTX2I.mjs.map