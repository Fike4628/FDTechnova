/**
 * CORS policy derived from the frontend origin.
 *
 * The frontend talks to this API from the browser, so credentials are allowed
 * and the origin is locked to the configured client URL (plus localhost dev).
 */

const config = require('./env')

// In development allow the default Vite port too, in case CLIENT_URL isn't set.
const allowedOrigins = Array.from(
  new Set([config.clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'])
).filter(Boolean)

const corsOptions = {
  origin(origin, cb) {
    // Allow same-origin / curl / Postman (no Origin header) and whitelisted.
    if (!origin || allowedOrigins.includes(origin)) {
      return cb(null, true)
    }
    return cb(new Error(`CORS policy: origin ${origin} not allowed`))
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400,
}

module.exports = corsOptions
