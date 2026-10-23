/**
 * Validate an email address format.
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Validate a password (min 8 chars, at least one letter and one number).
 */
export function isValidPassword(password) {
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)
}

/**
 * Validate that a string is not empty or whitespace-only.
 */
export function isNotEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0
}

/**
 * Validate a phone number (basic international format).
 */
export function isValidPhone(phone) {
  return /^\+?[0-9\s\-().]{7,20}$/.test(phone)
}

/**
 * Run a set of validator functions against a form values object.
 * @param {object} values - { fieldName: value }
 * @param {object} rules  - { fieldName: (value) => errorString | null }
 * @returns {object} errors - { fieldName: errorString }
 */
export function validate(values, rules) {
  const errors = {}
  for (const [field, rule] of Object.entries(rules)) {
    const error = rule(values[field], values)
    if (error) errors[field] = error
  }
  return errors
}
