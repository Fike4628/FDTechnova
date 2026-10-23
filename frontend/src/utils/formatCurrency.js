/**
 * Format a number as a currency string.
 * @param {number} amount
 * @param {string} currency - ISO 4217 currency code (default: 'USD')
 * @param {string} locale - BCP 47 locale (default: 'en-US')
 * @returns {string}
 */
export function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
  if (amount === null || amount === undefined) return '—'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}
