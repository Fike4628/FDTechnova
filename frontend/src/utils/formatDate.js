/**
 * Format a date string or Date object into a human-readable string.
 * @param {string|Date} date
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string}
 */
export function formatDate(date, options = {}) {
  if (!date) return '—'
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return '—'

  const defaults = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Intl.DateTimeFormat('en-US', { ...defaults, ...options }).format(d)
}

/**
 * Format a date into a short relative label (e.g. "Today", "Yesterday", or the date).
 */
export function formatRelativeDate(date) {
  if (!date) return '—'
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  return formatDate(d)
}
