/**
 * Check if the code is running in a browser environment.
 */
declare function isBrowser(): boolean;
/**
 * @name formatCurrency
 * @description Format the currency based on the currency code
 */
declare function formatCurrency(params: {
    currencyCode: string;
    locale: string;
    value: string | number;
}): string;

export { formatCurrency, isBrowser };
