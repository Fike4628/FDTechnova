/**
 * authController — maps auth routes to authService.
 * Thin layer: validation lives in validators, business logic in the service.
 */
const asyncHandler = require('../utils/asyncHandler')
const authService = require('../services/authService')

const register = asyncHandler(async (req, res) => {
  const data = await authService.register(req.body)
  res.status(201).json(data)
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const data = await authService.login(email, password)
  res.json(data)
})

const getMe = asyncHandler(async (req, res) => {
  const data = await authService.getMe(req.user.id)
  res.json(data)
})

const forgotPassword = asyncHandler(async (req, res) => {
  const data = await authService.forgotPassword(req.body.email)
  res.json(data)
})

const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body
  const data = await authService.resetPassword(token, password)
  res.json(data)
})

module.exports = {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
}
