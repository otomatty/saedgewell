import { useMemo } from 'react';

// src/makerkit/if.tsx
function If({
  condition,
  children,
  fallback
}) {
  return useMemo(() => {
    if (condition) {
      if (typeof children === "function") {
        return /* @__PURE__ */ React.createElement(React.Fragment, null, children(condition));
      }
      return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
    }
    if (fallback) {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, fallback);
    }
    return null;
  }, [condition, fallback, children]);
}

export { If };
//# sourceMappingURL=chunk-7AKVYG64.mjs.map
//# sourceMappingURL=chunk-7AKVYG64.mjs.map