/**
 * asyncHandler — wraps an async route handler so rejected promises are
 * forwarded to Express' error handler instead of crashing the process.
 *
 * Without this, an `await` that throws inside a route produces an unhandled
 * rejection and a hanging request. Using it keeps controllers clean:
 *
 *   router.get('/', asyncHandler(async (req, res) => { ... }))
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = asyncHandler
