'use strict';

var chunkRWQ4ARPY_js = require('./chunk-RWQ4ARPY.js');
var chunkXE52ECJH_js = require('./chunk-XE52ECJH.js');

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
      className: chunkXE52ECJH_js.cn(
        "flex flex-col items-center justify-center space-y-4",
        className,
        {
          "bg-background fixed top-0 left-0 z-100 h-screen w-screen": fullPage
        }
      )
    },
    /* @__PURE__ */ React.createElement(chunkRWQ4ARPY_js.Spinner, { className: spinnerClassName }),
    /* @__PURE__ */ React.createElement("div", { className: "text-muted-foreground text-sm" }, children)
  );
}

exports.LoadingOverlay = LoadingOverlay;
//# sourceMappingURL=chunk-HPQ4HARX.js.map
//# sourceMappingURL=chunk-HPQ4HARX.js.map