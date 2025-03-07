'use strict';

var chunkXE52ECJH_js = require('./chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('./chunk-GNZACLC7.js');
var classVarianceAuthority = require('class-variance-authority');

var alertVariants = classVarianceAuthority.cva(
  "[&>svg]:text-foreground relative flex w-full flex-col gap-y-2 rounded-lg border bg-linear-to-r px-4 py-3.5 text-sm [&>svg]:absolute [&>svg]:top-4 [&>svg]:left-4 [&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: "border-green-600/50 text-green-600 dark:border-green-600 [&>svg]:text-green-600",
        warning: "border-orange-600/50 text-orange-600 dark:border-orange-600 [&>svg]:text-orange-600",
        info: "border-blue-600/50 text-blue-600 dark:border-blue-600 [&>svg]:text-blue-600"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Alert = (_a) => {
  var _b = _a, { className, variant } = _b, props = chunkGNZACLC7_js.__objRest(_b, ["className", "variant"]);
  return /* @__PURE__ */ React.createElement(
    "div",
    chunkGNZACLC7_js.__spreadValues({
      role: "alert",
      className: chunkXE52ECJH_js.cn(alertVariants({ variant }), className)
    }, props)
  );
};
Alert.displayName = "Alert";
var AlertTitle = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "h5",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn("leading-none font-bold tracking-tight", className)
    }, props)
  );
};
AlertTitle.displayName = "AlertTitle";
var AlertDescription = (_a) => {
  var _b = _a, {
    className
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "div",
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn("text-sm font-normal [&_p]:leading-relaxed", className)
    }, props)
  );
};
AlertDescription.displayName = "AlertDescription";

exports.Alert = Alert;
exports.AlertDescription = AlertDescription;
exports.AlertTitle = AlertTitle;
//# sourceMappingURL=chunk-PDBCVDEM.js.map
//# sourceMappingURL=chunk-PDBCVDEM.js.map