/**
 * authenticate — verifies the `Authorization: Bearer <token>` header and
 * attaches the decoded user (with role) to `req.user`.
 *
 * On missing/invalid/expired tokens it yields a 401 ApiError, which the
 * frontend interceptor turns into a redirect to /login.
 */
const jwt = require('jsonwebtoken')
const config = require('../config/env')
const ApiError = require('../utils/ApiError')
const { User } = require('../models')

module.exports = async (req, _res, next) => {
  try {
    const header = req.headers.authorization || ''
    const [scheme, token] = header.split(' ')

    if (!scheme || scheme.toLowerCase() !== 'bearer' || !token) {
      throw ApiError.unauthorized('Missing or malformed authorization header')
    }

    let payload
    try {
      payload = jwt.verify(token, config.jwt.secret)
    } catch {
      throw ApiError.unauthorized('Invalid or expired token')
    }

    const user = await User.findByPk(payload.sub, {
      attributes: { exclude: ['password'] },
    })

    if (!user) {
      throw ApiError.unauthorized('User no longer exists')
    }
    if (!user.isActive) {
      throw ApiError.forbidden('Account has been deactivated')
    }

    req.user = user
    req.token = token
    next()
  } catch (err) {
    next(err)
  }
}
