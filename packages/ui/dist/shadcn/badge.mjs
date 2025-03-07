import { cn } from '../chunk-WKYHJYPA.mjs';
import { __objRest, __spreadValues } from '../chunk-C5AMXPVO.mjs';
import { cva } from 'class-variance-authority';

var badgeVariants = cva(
  "focus:ring-ring inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80 border-transparent shadow-xs",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent shadow-xs",
        outline: "text-foreground",
        success: "border-transparent bg-green-50 text-green-500 hover:bg-green-50 dark:bg-green-500/20 dark:hover:bg-green-500/20",
        warning: "border-transparent bg-orange-50 text-orange-500 hover:bg-orange-50 dark:bg-orange-500/20 dark:hover:bg-orange-500/20",
        info: "border-transparent bg-blue-50 text-blue-500 hover:bg-blue-50 dark:bg-blue-500/20 dark:hover:bg-blue-500/20"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge(_a) {
  var _b = _a, { className, variant } = _b, props = __objRest(_b, ["className", "variant"]);
  return /* @__PURE__ */ React.createElement("div", __spreadValues({ className: cn(badgeVariants({ variant }), className) }, props));
}

export { Badge, badgeVariants };
//# sourceMappingURL=badge.mjs.map
//# sourceMappingURL=badge.mjs.map