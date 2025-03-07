import { cn } from '../chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from '../chunk-C5AMXPVO.mjs';
import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';

var InputOTP = (_a) => {
  var _b = _a, {
    className,
    containerClassName
  } = _b, props = __objRest(_b, [
    "className",
    "containerClassName"
  ]);
  return /* @__PURE__ */ React.createElement(
    OTPInput,
    __spreadValues({
      containerClassName: cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      ),
      className: cn("disabled:cursor-not-allowed", className)
    }, props)
  );
};
InputOTP.displayName = "InputOTP";
var InputOTPGroup = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement("div", __spreadValues({ className: cn("flex items-center", className) }, props));
};
InputOTPGroup.displayName = "InputOTPGroup";
var InputOTPSlot = (_a) => {
  var _b = _a, { index, className } = _b, props = __objRest(_b, ["index", "className"]);
  const inputOTPContext = React.useContext(OTPInputContext);
  const slot = inputOTPContext.slots[index];
  if (!slot) {
    return null;
  }
  const { char, isActive, hasFakeCaret } = slot;
  return /* @__PURE__ */ React.createElement(
    "div",
    __spreadValues({
      className: cn(
        "border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "ring-ring z-10 ring-1",
        className
      )
    }, props),
    char,
    hasFakeCaret && /* @__PURE__ */ React.createElement("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center" }, /* @__PURE__ */ React.createElement("div", { className: "animate-caret-blink bg-foreground h-4 w-px duration-1000" }))
  );
};
InputOTPSlot.displayName = "InputOTPSlot";
var InputOTPSeparator = (_a) => {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ React.createElement("hr", __spreadValues({ className: "flex items-center border-0 p-0 m-0" }, props));
};
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
//# sourceMappingURL=input-otp.mjs.map
//# sourceMappingURL=input-otp.mjs.map