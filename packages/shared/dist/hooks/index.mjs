import '../chunk-FJBZBVPE.mjs';

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

export { useCsrfToken };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map