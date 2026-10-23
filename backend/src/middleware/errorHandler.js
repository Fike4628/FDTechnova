/**
 * errorHandler — the last-stop error middleware.
 *
 * Converts ApiError into a structured JSON body matching what the frontend
 * interceptor reads: `{ message }` and, for validation errors, `{ details }`.
 * Sequelize unique/foreign-key errors are normalised too. In production the
 * stack trace is hidden; in development it's included for debugging.
 */
const ApiError = require('../utils/ApiError')
const config = require('../config/env')

// Known Sequelize error names → HTTP status mapping.
const sequelizeStatus = {
  SequelizeUniqueConstraintError: 409,
  SequelizeValidationError: 422,
  SequelizeForeignKeyConstraintError: 400,
  SequelizeEmptyResultError: 404,
}

function notFound(req, _res, next) {
  next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} not found`))
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let status = err.statusCode || 500
  let message = err.message || 'Internal server error'
  let details = err.details || null

  // Normalise Sequelize errors into ApiError-shaped responses.
  const dialect = err?.name && err.name.startsWith('Sequelize')
  if (dialect) {
    status = sequelizeStatus[err.name] || 400
    if (err.name === 'SequelizeUniqueConstraintError') {
      message = 'A record with that value already exists'
      details = err.errors?.map((e) => ({ field: e.path, message: e.message }))
    } else if (err.name === 'SequelizeValidationError') {
      message = 'Validation failed'
      details = err.errors?.map((e) => ({ field: e.path, message: e.message }))
    } else if (err.name === 'SequelizeForeignKeyConstraintError') {
      message = 'A related record was not found'
    }
  }

  // Log unexpected (non-operational) errors for triage.
  if (!err.isOperational && !dialect) {
    // eslint-disable-next-line no-console
    console.error('[unhandled]', err)
  }

  const body = { message }
  if (details) body.details = details
  if (!config.isProduction && err.stack) body.stack = err.stack

  res.status(status).json(body)
}

module.exports = { notFound, errorHandler }
