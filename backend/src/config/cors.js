/**
 * CORS policy derived from the frontend origin.
 *
 * The frontend talks to this API from the browser, so credentials are allowed
 * and the origin is locked to the configured client URL (plus common localhost
 * dev ports so the server works regardless of which port Vite/CRA picks).
 */

const config = require('./env')

// Always allow the explicitly configured client URL plus common dev ports.
const allowedOrigins = Array.from(
  new Set([
    config.clientUrl,
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:4173', // vite preview
  ])
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
