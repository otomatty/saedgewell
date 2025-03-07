'use strict';

var chunkHPQ4HARX_js = require('../chunk-HPQ4HARX.js');
require('../chunk-RWQ4ARPY.js');
require('../chunk-XE52ECJH.js');
var chunkJMDHW6WM_js = require('../chunk-JMDHW6WM.js');
require('../chunk-GNZACLC7.js');
var react = require('react');
var LoadingBar = require('react-top-loading-bar');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var LoadingBar__default = /*#__PURE__*/_interopDefault(LoadingBar);

var running = false;
function TopLoadingBarIndicator() {
  const ref = react.createRef();
  react.useEffect(() => {
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
    LoadingBar__default.default,
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
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(chunkJMDHW6WM_js.If, { condition: displayTopLoadingBar }, /* @__PURE__ */ React.createElement(TopLoadingBarIndicator, null)), /* @__PURE__ */ React.createElement(chunkJMDHW6WM_js.If, { condition: displaySpinner }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "zoom-in-80 animate-in fade-in slide-in-from-bottom-12 flex flex-1 flex-col items-center justify-center duration-500"
    },
    /* @__PURE__ */ React.createElement(chunkHPQ4HARX_js.LoadingOverlay, { displayLogo, fullPage }),
    children
  )));
}

exports.GlobalLoader = GlobalLoader;
//# sourceMappingURL=global-loader.js.map
//# sourceMappingURL=global-loader.js.map