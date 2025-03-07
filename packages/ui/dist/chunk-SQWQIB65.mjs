import { buttonVariants } from './chunk-BSMUWSCW.mjs';
import { cn } from './chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from './chunk-C5AMXPVO.mjs';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

var AlertDialog = AlertDialogPrimitive.Root;
var AlertDialogTrigger = AlertDialogPrimitive.Trigger;
var AlertDialogPortal = AlertDialogPrimitive.Portal;
var AlertDialogOverlay = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    AlertDialogPrimitive.Overlay,
    __spreadValues({
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
        className
      )
    }, props)
  );
};
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
var AlertDialogContent = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(AlertDialogPortal, null, /* @__PURE__ */ React.createElement(AlertDialogOverlay, null), /* @__PURE__ */ React.createElement(
    AlertDialogPrimitive.Content,
    __spreadValues({
      className: cn(
        "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg",
        className
      )
    }, props)
  ));
};
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
var AlertDialogHeader = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "div",
    __spreadValues({
      className: cn("flex flex-col gap-y-3 text-center sm:text-left", className)
    }, props)
  );
};
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "div",
    __spreadValues({
      className: cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )
    }, props)
  );
};
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    AlertDialogPrimitive.Title,
    __spreadValues({
      className: cn("text-lg font-semibold", className)
    }, props)
  );
};
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
var AlertDialogDescription = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    AlertDialogPrimitive.Description,
    __spreadValues({
      className: cn("text-muted-foreground text-sm", className)
    }, props)
  );
};
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
var AlertDialogAction = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    AlertDialogPrimitive.Action,
    __spreadValues({
      className: cn(buttonVariants(), className)
    }, props)
  );
};
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
var AlertDialogCancel = (_a) => {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    AlertDialogPrimitive.Cancel,
    __spreadValues({
      className: cn(
        buttonVariants({ variant: "outline" }),
        "mt-2 sm:mt-0",
        className
      )
    }, props)
  );
};
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger };
//# sourceMappingURL=chunk-SQWQIB65.mjs.map
//# sourceMappingURL=chunk-SQWQIB65.mjs.map