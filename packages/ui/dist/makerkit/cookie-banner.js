'use strict';

var chunkQMJZHES6_js = require('../chunk-QMJZHES6.js');
var chunk32ZXQSRB_js = require('../chunk-32ZXQSRB.js');
var chunkP64ZKZSK_js = require('../chunk-P64ZKZSK.js');
require('../chunk-XE52ECJH.js');
require('../chunk-GNZACLC7.js');
var react = require('react');
var DialogPrimitive = require('@radix-ui/react-dialog');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var DialogPrimitive__namespace = /*#__PURE__*/_interopNamespace(DialogPrimitive);

var COOKIE_CONSENT_STATUS = "cookie_consent_status";
function CookieBanner() {
  const { status, accept, reject } = useCookieConsent();
  if (!isBrowser()) {
    return null;
  }
  if (status !== "unknown" /* Unknown */) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(DialogPrimitive__namespace.Root, { open: true, modal: false }, /* @__PURE__ */ React.createElement(
    DialogPrimitive__namespace.Content,
    {
      onOpenAutoFocus: (e) => e.preventDefault(),
      className: "dark:shadow-primary-500/40 bg-background animate-in fade-in zoom-in-95 slide-in-from-bottom-16 fill-mode-both fixed bottom-0 w-full max-w-lg border p-6 shadow-2xl delay-1000 duration-1000 lg:bottom-[2rem] lg:left-[2rem] lg:h-48 lg:rounded-lg"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(chunkQMJZHES6_js.Heading, { level: 3 }, /* @__PURE__ */ React.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: "cookieBanner.title" }))), /* @__PURE__ */ React.createElement("div", { className: "text-gray-500 dark:text-gray-400" }, /* @__PURE__ */ React.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: "cookieBanner.description" })), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end space-x-2.5" }, /* @__PURE__ */ React.createElement(chunkP64ZKZSK_js.Button, { variant: "ghost", onClick: reject }, /* @__PURE__ */ React.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: "cookieBanner.reject" })), /* @__PURE__ */ React.createElement(chunkP64ZKZSK_js.Button, { autoFocus: true, onClick: accept }, /* @__PURE__ */ React.createElement(chunk32ZXQSRB_js.Trans, { i18nKey: "cookieBanner.accept" }))))
  ));
}
function useCookieConsent() {
  const initialState = getStatusFromLocalStorage();
  const [status, setStatus] = react.useState(initialState);
  const accept = react.useCallback(() => {
    const status2 = "accepted" /* Accepted */;
    setStatus(status2);
    storeStatusInLocalStorage(status2);
  }, []);
  const reject = react.useCallback(() => {
    const status2 = "rejected" /* Rejected */;
    setStatus(status2);
    storeStatusInLocalStorage(status2);
  }, []);
  const clear = react.useCallback(() => {
    const status2 = "unknown" /* Unknown */;
    setStatus(status2);
    storeStatusInLocalStorage(status2);
  }, []);
  return react.useMemo(() => {
    return {
      clear,
      status,
      accept,
      reject
    };
  }, [clear, status, accept, reject]);
}
function storeStatusInLocalStorage(status) {
  if (!isBrowser()) {
    return;
  }
  localStorage.setItem(COOKIE_CONSENT_STATUS, status);
}
function getStatusFromLocalStorage() {
  if (!isBrowser()) {
    return "unknown" /* Unknown */;
  }
  const status = localStorage.getItem(COOKIE_CONSENT_STATUS);
  return status != null ? status : "unknown" /* Unknown */;
}
function isBrowser() {
  return typeof window !== "undefined";
}

exports.CookieBanner = CookieBanner;
exports.useCookieConsent = useCookieConsent;
//# sourceMappingURL=cookie-banner.js.map
//# sourceMappingURL=cookie-banner.js.map