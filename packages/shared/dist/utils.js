'use strict';

// src/utils.ts
function isBrowser() {
  return typeof window !== "undefined";
}
function formatCurrency(params) {
  return new Intl.NumberFormat(params.locale, {
    style: "currency",
    currency: params.currencyCode
  }).format(Number(params.value));
}

exports.formatCurrency = formatCurrency;
exports.isBrowser = isBrowser;
//# sourceMappingURL=utils.js.map
//# sourceMappingURL=utils.js.map