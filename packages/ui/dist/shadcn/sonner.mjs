import { __objRest, __spreadValues } from '../chunk-C5AMXPVO.mjs';
import { useTheme } from 'next-themes';
import { Toaster as Toaster$1 } from 'sonner';
export { toast } from 'sonner';

var Toaster = (_a) => {
  var props = __objRest(_a, []);
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ React.createElement(
    Toaster$1,
    __spreadValues({
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      }
    }, props)
  );
};

export { Toaster };
//# sourceMappingURL=sonner.mjs.map
//# sourceMappingURL=sonner.mjs.map