'use strict';

var chunkP64ZKZSK_js = require('./chunk-P64ZKZSK.js');
var chunkXE52ECJH_js = require('./chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('./chunk-GNZACLC7.js');
var AlertDialogPrimitive = require('@radix-ui/react-alert-dialog');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var AlertDialogPrimitive__namespace = /*#__PURE__*/_interopNamespace(AlertDialogPrimitive);

var AlertDialog = AlertDialogPrimitive__namespace.Root;
var AlertDialogTrigger = AlertDialogPrimitive__namespace.Trigger;
var AlertDialogPortal = AlertDialogPrimitive__namespace.Portal;
var AlertDialogOverlay = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    AlertDialogPrimitive__namespace.Overlay,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
        className
      )
    }, props)
  );
};
AlertDialogOverlay.displayName = AlertDialogPrimitive__namespace.Overlay.displayName;
var AlertDialogContent = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(AlertDialogPortal, null, /* @__PURE__ */ React.createElement(AlertDialogOverlay, null), /* @__PURE__ */ React.createElement(
    AlertDialogPrimitive__namespace.Content,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg",
        className
      )
    }, props)
  ));
};
AlertDialogContent.displayName = AlertDialogPrimitive__namespace.Content.displayName;
var AlertDialogHeader = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "div",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn("flex flex-col gap-y-3 text-center sm:text-left", className)
    }, props)
  );
};
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "div",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )
    }, props)
  );
};
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    AlertDialogPrimitive__namespace.Title,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn("text-lg font-semibold", className)
    }, props)
  );
};
AlertDialogTitle.displayName = AlertDialogPrimitive__namespace.Title.displayName;
var AlertDialogDescription = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    AlertDialogPrimitive__namespace.Description,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn("text-muted-foreground text-sm", className)
    }, props)
  );
};
AlertDialogDescription.displayName = AlertDialogPrimitive__namespace.Description.displayName;
var AlertDialogAction = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    AlertDialogPrimitive__namespace.Action,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(chunkP64ZKZSK_js.buttonVariants(), className)
    }, props)
  );
};
AlertDialogAction.displayName = AlertDialogPrimitive__namespace.Action.displayName;
var AlertDialogCancel = (_a) => {
  var _b = _a, { className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className"]);
  return /* @__PURE__ */ React.createElement(
    AlertDialogPrimitive__namespace.Cancel,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        chunkP64ZKZSK_js.buttonVariants({ variant: "outline" }),
        "mt-2 sm:mt-0",
        className
      )
    }, props)
  );
};
AlertDialogCancel.displayName = AlertDialogPrimitive__namespace.Cancel.displayName;

exports.AlertDialog = AlertDialog;
exports.AlertDialogAction = AlertDialogAction;
exports.AlertDialogCancel = AlertDialogCancel;
exports.AlertDialogContent = AlertDialogContent;
exports.AlertDialogDescription = AlertDialogDescription;
exports.AlertDialogFooter = AlertDialogFooter;
exports.AlertDialogHeader = AlertDialogHeader;
exports.AlertDialogOverlay = AlertDialogOverlay;
exports.AlertDialogPortal = AlertDialogPortal;
exports.AlertDialogTitle = AlertDialogTitle;
exports.AlertDialogTrigger = AlertDialogTrigger;
//# sourceMappingURL=chunk-T6MHWQHO.js.map
//# sourceMappingURL=chunk-T6MHWQHO.js.map