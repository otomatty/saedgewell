import './chunk-FJBZBVPE.mjs';

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

export { formatCurrency, isBrowser };
//# sourceMappingURL=utils.mjs.map
//# sourceMappingURL=utils.mjs.map