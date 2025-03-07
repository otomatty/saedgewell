'use strict';

var chunkXE52ECJH_js = require('../chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('../chunk-GNZACLC7.js');
var React = require('react');
var inputOtp = require('input-otp');

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

var React__namespace = /*#__PURE__*/_interopNamespace(React);

var InputOTP = (_a) => {
  var _b = _a, {
    className,
    containerClassName
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className",
    "containerClassName"
  ]);
  return /* @__PURE__ */ React__namespace.createElement(
    inputOtp.OTPInput,
    chunkGNZACLC7_js.__spreadValues({
      containerClassName: chunkXE52ECJH_js.cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      ),
      className: chunkXE52ECJH_js.cn("disabled:cursor-not-allowed", className)
    }, props)
  );
};
InputOTP.displayName = "InputOTP";
var InputOTPGroup = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React__namespace.createElement("div", chunkGNZACLC7_js.__spreadValues({ className: chunkXE52ECJH_js.cn("flex items-center", className) }, props));
};
InputOTPGroup.displayName = "InputOTPGroup";
var InputOTPSlot = (_a) => {
  var _b = _a, { index, className } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["index", "className"]);
  const inputOTPContext = React__namespace.useContext(inputOtp.OTPInputContext);
  const slot = inputOTPContext.slots[index];
  if (!slot) {
    return null;
  }
  const { char, isActive, hasFakeCaret } = slot;
  return /* @__PURE__ */ React__namespace.createElement(
    "div",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(
        "border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "ring-ring z-10 ring-1",
        className
      )
    }, props),
    char,
    hasFakeCaret && /* @__PURE__ */ React__namespace.createElement("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center" }, /* @__PURE__ */ React__namespace.createElement("div", { className: "animate-caret-blink bg-foreground h-4 w-px duration-1000" }))
  );
};
InputOTPSlot.displayName = "InputOTPSlot";
var InputOTPSeparator = (_a) => {
  var props = chunkGNZACLC7_js.__objRest(_a, []);
  return /* @__PURE__ */ React__namespace.createElement("hr", chunkGNZACLC7_js.__spreadValues({ className: "flex items-center border-0 p-0 m-0" }, props));
};
InputOTPSeparator.displayName = "InputOTPSeparator";

exports.InputOTP = InputOTP;
exports.InputOTPGroup = InputOTPGroup;
exports.InputOTPSeparator = InputOTPSeparator;
exports.InputOTPSlot = InputOTPSlot;
//# sourceMappingURL=input-otp.js.map
//# sourceMappingURL=input-otp.js.map