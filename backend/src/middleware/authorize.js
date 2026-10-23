/**
 * authorize — role-based access control.
 *
 * Usage: `router.use(authorize('admin'))` or `authorize('admin', 'instructor')`.
 * Requires `authenticate` to have run first (so `req.user` is populated).
 */
const ApiError = require('../utils/ApiError')

const authorize =
  (...allowedRoles) =>
  (req, _res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized())
    }
    if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
      return next(ApiError.forbidden('You do not have permission to do that'))
    }
    next()
  }

module.exports = authorize
