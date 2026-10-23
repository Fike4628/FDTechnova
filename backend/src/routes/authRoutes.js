/**
 * authRoutes — /auth/*
 *
 * Credential endpoints sit behind a stricter rate limiter to blunt brute-force
 * attempts. `/me` is the only authenticated route here.
 */
const router = require('express').Router()

const authController = require('../controllers/authController')
const authenticate = require('../middleware/authenticate')
const validateRequest = require('../middleware/validateRequest')
const { authLimiter } = require('../middleware/rateLimiter')
const {
  registerRules,
  loginRules,
  forgotPasswordRules,
  resetPasswordRules,
} = require('../validators/authValidator')

router.post('/register', authLimiter, registerRules, validateRequest, authController.register)
router.post('/login', authLimiter, loginRules, validateRequest, authController.login)
router.post(
  '/forgot-password',
  authLimiter,
  forgotPasswordRules,
  validateRequest,
  authController.forgotPassword
)
router.post(
  '/reset-password',
  authLimiter,
  resetPasswordRules,
  validateRequest,
  authController.resetPassword
)

router.get('/me', authenticate, authController.getMe)

module.exports = router
