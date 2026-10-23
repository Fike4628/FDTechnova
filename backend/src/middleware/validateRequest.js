/**
 * validateRequest — runs express-validator chains on a route and, if any
 * check fails, surfaces a 422 with the field-level errors so the client can
 * show inline form errors.
 *
 * Place it after the `body(...)` / `query(...)` checks:
 *
 *   router.post('/', body('email').isEmail(), validateRequest, handler)
 */
const { validationResult } = require('express-validator')
const ApiError = require('../utils/ApiError')

const validateRequest = (req, _res, next) => {
  const result = validationResult(req)
  if (result.isEmpty()) return next()

  const details = result.array().reduce((acc, err) => {
    const key = err.type === 'field' ? err.path : err.type
    ;(acc[key] ||= []).push(err.msg)
    return acc
  }, {})

  next(ApiError.unprocessable('Validation failed', details))
}

module.exports = validateRequest
