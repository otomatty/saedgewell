import { LoadingOverlay } from '../chunk-ZYFK4CU7.mjs';
import '../chunk-GVYZXRIL.mjs';
import '../chunk-WKYHJYPA.mjs';
import { If } from '../chunk-7AKVYG64.mjs';
import '../chunk-C5AMXPVO.mjs';
import { createRef, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';

var running = false;
function TopLoadingBarIndicator() {
  const ref = createRef();
  useEffect(() => {
    if (!ref.current || running) {
      return;
    }
    running = true;
    const loadingBarRef = ref.current;
    loadingBarRef.continuousStart(0, 300);
    return () => {
      loadingBarRef.complete();
      running = false;
    };
  }, [ref]);
  return /* @__PURE__ */ React.createElement(
    LoadingBar,
    {
      className: "bg-primary",
      height: 4,
      waitingTime: 0,
      shadow: true,
      color: "",
      ref
    }
  );
}

// src/makerkit/global-loader.tsx
function GlobalLoader({
  displayLogo = false,
  fullPage = false,
  displaySpinner = true,
  displayTopLoadingBar = true,
  children
}) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(If, { condition: displayTopLoadingBar }, /* @__PURE__ */ React.createElement(TopLoadingBarIndicator, null)), /* @__PURE__ */ React.createElement(If, { condition: displaySpinner }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "zoom-in-80 animate-in fade-in slide-in-from-bottom-12 flex flex-1 flex-col items-center justify-center duration-500"
    },
    /* @__PURE__ */ React.createElement(LoadingOverlay, { displayLogo, fullPage }),
    children
  )));
}

export { GlobalLoader };
//# sourceMappingURL=global-loader.mjs.map
//# sourceMappingURL=global-loader.mjs.map