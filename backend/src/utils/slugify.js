/**
 * slugify — tiny dependency-free slug generator.
 *
 * Mirrors the common `slugify` package API enough for our use:
 *   slugify('Web Design!', { lower: true, strict: true }) -> 'web-design'
 *
 * `strict` strips everything but word chars, spaces and hyphens; `lower`
 * lowercases the result. A fallback guarantees a non-empty slug.
 */
function slugify(input, options = {}) {
  const { lower = true, strict = false } = options
  if (input == null) return 'item'

  let slug = String(input)
    .normalize('NFKD')
    // Strip combining diacritics so café -> cafe.
    .replace(/[\u0300-\u036f]/g, '')
    .trim()

  if (strict) {
    slug = slug.replace(/[^a-zA-Z0-9\s-]/g, '')
  }

  slug = slug
    .replace(/[^a-zA-Z0-9]+/g, '-') // collapse separators to a hyphen
    .replace(/^-+|-+$/g, '') // trim leading/trailing hyphens

  if (lower) slug = slug.toLowerCase()

  return slug || 'item'
}

module.exports = slugify
