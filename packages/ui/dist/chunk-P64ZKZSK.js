'use strict';

var chunkXE52ECJH_js = require('./chunk-XE52ECJH.js');
var chunkGNZACLC7_js = require('./chunk-GNZACLC7.js');
var reactSlot = require('@radix-ui/react-slot');
var classVarianceAuthority = require('class-variance-authority');

var buttonVariants = classVarianceAuthority.cva(
  "focus-visible:ring-ring inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-xs",
        outline: "border-input bg-background hover:bg-accent hover:text-accent-foreground border shadow-xs",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "decoration-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = (_a) => {
  var _b = _a, {
    className,
    variant,
    size,
    asChild = false
  } = _b, props = chunkGNZACLC7_js.__objRest(_b, [
    "className",
    "variant",
    "size",
    "asChild"
  ]);
  const Comp = asChild ? reactSlot.Slot : "button";
  return /* @__PURE__ */ React.createElement(
    Comp,
    chunkGNZACLC7_js.__spreadValues({
      className: chunkXE52ECJH_js.cn(buttonVariants({ variant, size, className }))
    }, props)
  );
};
Button.displayName = "Button";

exports.Button = Button;
exports.buttonVariants = buttonVariants;
//# sourceMappingURL=chunk-P64ZKZSK.js.map
//# sourceMappingURL=chunk-P64ZKZSK.js.map