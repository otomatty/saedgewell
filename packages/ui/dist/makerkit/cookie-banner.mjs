import { Heading } from '../chunk-MARFEKMV.mjs';
import { Trans } from '../chunk-IOTGEBOC.mjs';
import { Button } from '../chunk-BSMUWSCW.mjs';
import '../chunk-WKYHJYPA.mjs';
import '../chunk-C5AMXPVO.mjs';
import { useState, useCallback, useMemo } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

var COOKIE_CONSENT_STATUS = "cookie_consent_status";
function CookieBanner() {
  const { status, accept, reject } = useCookieConsent();
  if (!isBrowser()) {
    return null;
  }
  if (status !== "unknown" /* Unknown */) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(DialogPrimitive.Root, { open: true, modal: false }, /* @__PURE__ */ React.createElement(
    DialogPrimitive.Content,
    {
      onOpenAutoFocus: (e) => e.preventDefault(),
      className: "dark:shadow-primary-500/40 bg-background animate-in fade-in zoom-in-95 slide-in-from-bottom-16 fill-mode-both fixed bottom-0 w-full max-w-lg border p-6 shadow-2xl delay-1000 duration-1000 lg:bottom-[2rem] lg:left-[2rem] lg:h-48 lg:rounded-lg"
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex flex-col space-y-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Heading, { level: 3 }, /* @__PURE__ */ React.createElement(Trans, { i18nKey: "cookieBanner.title" }))), /* @__PURE__ */ React.createElement("div", { className: "text-gray-500 dark:text-gray-400" }, /* @__PURE__ */ React.createElement(Trans, { i18nKey: "cookieBanner.description" })), /* @__PURE__ */ React.createElement("div", { className: "flex justify-end space-x-2.5" }, /* @__PURE__ */ React.createElement(Button, { variant: "ghost", onClick: reject }, /* @__PURE__ */ React.createElement(Trans, { i18nKey: "cookieBanner.reject" })), /* @__PURE__ */ React.createElement(Button, { autoFocus: true, onClick: accept }, /* @__PURE__ */ React.createElement(Trans, { i18nKey: "cookieBanner.accept" }))))
  ));
}
function useCookieConsent() {
  const initialState = getStatusFromLocalStorage();
  const [status, setStatus] = useState(initialState);
  const accept = useCallback(() => {
    const status2 = "accepted" /* Accepted */;
    setStatus(status2);
    storeStatusInLocalStorage(status2);
  }, []);
  const reject = useCallback(() => {
    const status2 = "rejected" /* Rejected */;
    setStatus(status2);
    storeStatusInLocalStorage(status2);
  }, []);
  const clear = useCallback(() => {
    const status2 = "unknown" /* Unknown */;
    setStatus(status2);
    storeStatusInLocalStorage(status2);
  }, []);
  return useMemo(() => {
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

export { CookieBanner, useCookieConsent };
//# sourceMappingURL=cookie-banner.mjs.map
//# sourceMappingURL=cookie-banner.mjs.map