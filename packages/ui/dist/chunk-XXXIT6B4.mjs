import { cn } from './chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from './chunk-C5AMXPVO.mjs';
import { cva } from 'class-variance-authority';

var alertVariants = cva(
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
  var _b = _a, { className, variant } = _b, props = __objRest(_b, ["className", "variant"]);
  return /* @__PURE__ */ React.createElement(
    "div",
    __spreadValues({
      role: "alert",
      className: cn(alertVariants({ variant }), className)
    }, props)
  );
};
Alert.displayName = "Alert";
var AlertTitle = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "h5",
    __spreadValues({
      className: cn("leading-none font-bold tracking-tight", className)
    }, props)
  );
};
AlertTitle.displayName = "AlertTitle";
var AlertDescription = (_a) => {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ React.createElement(
    "div",
    __spreadValues({
      className: cn("text-sm font-normal [&_p]:leading-relaxed", className)
    }, props)
  );
};
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };
//# sourceMappingURL=chunk-XXXIT6B4.mjs.map
//# sourceMappingURL=chunk-XXXIT6B4.mjs.map