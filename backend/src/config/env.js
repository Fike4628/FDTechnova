/**
 * Centralised environment configuration.
 *
 * Loads `.env` once and exposes typed, validated values so the rest of the
 * app never imports `process.env` directly — every runtime knob lives here.
 */

const path = require('path')

// Load .env as early as possible, but only when not already set (e.g. by PM2).
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') })

function env(key, fallback = '') {
  const value = process.env[key]
  return value === undefined || value === '' ? fallback : value
}

function envInt(key, fallback) {
  const raw = process.env[key]
  if (raw === undefined || raw === '') return fallback
  const parsed = parseInt(raw, 10)
  return Number.isNaN(parsed) ? fallback : parsed
}

function envBool(key, fallback = false) {
  const raw = process.env[key]
  if (raw === undefined || raw === '') return fallback
  return raw === 'true' || raw === '1' || raw === 'yes'
}

const config = {
  env: env('NODE_ENV', 'development'),
  isProduction: env('NODE_ENV', 'development') === 'production',
  isTest: env('NODE_ENV', 'development') === 'test',

  port: envInt('PORT', 8000),

  clientUrl: env('CLIENT_URL', 'http://localhost:5173'),

  db: {
    dialect: env('DB_DIALECT', 'postgres'),
    host: env('DB_HOST', 'localhost'),
    port: envInt('DB_PORT', 5432),
    name: env('DB_NAME', 'fdteknova_academy'),
    user: env('DB_USER', 'postgres'),
    password: env('DB_PASSWORD', 'postgres'),
    logging: envBool('DB_LOGGING', false),
  },

  jwt: {
    secret: env('JWT_SECRET', 'dev-only-insecure-secret'),
    expiresIn: env('JWT_EXPIRES_IN', '7d'),
  },

  bcrypt: {
    rounds: envInt('BCRYPT_ROUNDS', 10),
  },

  smtp: {
    host: env('SMTP_HOST', ''),
    port: envInt('SMTP_PORT', 587),
    user: env('SMTP_USER', ''),
    password: env('SMTP_PASSWORD', ''),
    from: env('SMTP_FROM', 'FDTeknova Academy <noreply@example.com>'),
  },

  upload: {
    dir: env('UPLOAD_DIR', 'uploads'),
    maxBytes: envInt('MAX_UPLOAD_MB', 10) * 1024 * 1024,
  },

  payment: {
    provider: env('PAYMENT_PROVIDER', 'mock'),
    secret: env('PAYMENT_SECRET', 'dev-only-payment-secret'),
  },
}

module.exports = config
