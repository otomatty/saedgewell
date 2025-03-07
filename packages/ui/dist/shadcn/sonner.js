'use strict';

var chunkGNZACLC7_js = require('../chunk-GNZACLC7.js');
var nextThemes = require('next-themes');
var sonner = require('sonner');

var Toaster = (_a) => {
  var props = chunkGNZACLC7_js.__objRest(_a, []);
  const { theme = "system" } = nextThemes.useTheme();
  return /* @__PURE__ */ React.createElement(
    sonner.Toaster,
    chunkGNZACLC7_js.__spreadValues({
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

Object.defineProperty(exports, "toast", {
  enumerable: true,
  get: function () { return sonner.toast; }
});
exports.Toaster = Toaster;
//# sourceMappingURL=sonner.js.map
//# sourceMappingURL=sonner.js.map