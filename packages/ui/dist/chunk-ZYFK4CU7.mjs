import { Spinner } from './chunk-GVYZXRIL.mjs';
import { cn } from './chunk-WKYHJYPA.mjs';

// src/makerkit/loading-overlay.tsx
function LoadingOverlay({
  children,
  className,
  fullPage = true,
  spinnerClassName
}) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: cn(
        "flex flex-col items-center justify-center space-y-4",
        className,
        {
          "bg-background fixed top-0 left-0 z-100 h-screen w-screen": fullPage
        }
      )
    },
    /* @__PURE__ */ React.createElement(Spinner, { className: spinnerClassName }),
    /* @__PURE__ */ React.createElement("div", { className: "text-muted-foreground text-sm" }, children)
  );
}

export { LoadingOverlay };
//# sourceMappingURL=chunk-ZYFK4CU7.mjs.map
//# sourceMappingURL=chunk-ZYFK4CU7.mjs.map