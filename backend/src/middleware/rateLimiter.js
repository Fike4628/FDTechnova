/**
 * rateLimiter — generic + auth-specific rate limiters.
 *
 * The generic limiter protects every route from obvious abuse. The auth
 * limiter is stricter on login/register/reset endpoints to slow brute-force
 * and credential-stuffing attempts. Both are backed by express-rate-limit's
 * in-memory store (fine for a single instance; swap for Redis in a cluster).
 */
const rateLimit = require('express-rate-limit')

const genericLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please slow down.' },
})

// Stricter bucket for credential endpoints.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many authentication attempts, try again later.' },
})

module.exports = { genericLimiter, authLimiter }
