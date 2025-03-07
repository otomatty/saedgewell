'use strict';

// src/hooks/use-csrf-token.ts
function useCsrfToken() {
  var _a;
  if (typeof document === "undefined") {
    return "";
  }
  const meta = document.querySelector('meta[name="csrf-token"]');
  if (!meta) {
    return "";
  }
  return (_a = meta.getAttribute("content")) != null ? _a : "";
}

exports.useCsrfToken = useCsrfToken;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map