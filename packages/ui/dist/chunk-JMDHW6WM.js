'use strict';

var react = require('react');

// src/makerkit/if.tsx
function If({
  condition,
  children,
  fallback
}) {
  return react.useMemo(() => {
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

exports.If = If;
//# sourceMappingURL=chunk-JMDHW6WM.js.map
//# sourceMappingURL=chunk-JMDHW6WM.js.map