/**
 * ApiError — a typed error carrying an HTTP status and a client-safe message.
 *
 * Controllers throw `new ApiError(status, message)` and the global error
 * handler turns it into a JSON response. Anything that isn't an ApiError is
 * treated as an unexpected 500 so internal details never leak.
 */
class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message)
    this.statusCode = statusCode
    this.details = details
    this.isOperational = true // distinguishes known failures from bugs
    Error.captureStackTrace(this, this.constructor)
  }

  static badRequest(message = 'Bad request', details = null) {
    return new ApiError(400, message, details)
  }

  static unauthorized(message = 'Authentication required') {
    return new ApiError(401, message)
  }

  static forbidden(message = 'You do not have permission to do that') {
    return new ApiError(403, message)
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(404, message)
  }

  static conflict(message = 'Resource already exists') {
    return new ApiError(409, message)
  }

  static unprocessable(message = 'Validation failed', details = null) {
    return new ApiError(422, message, details)
  }

  static internal(message = 'Something went wrong') {
    return new ApiError(500, message)
  }
}

module.exports = ApiError
