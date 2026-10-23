/**
 * authService — authentication business logic.
 *
 * Password reset uses a self-contained, short-lived signed JWT (purpose
 * "reset") so no extra DB columns are needed. Access tokens use the same
 * secret with a longer expiry. All methods return plain data (no Express
 * objects) so they stay testable and reusable from controllers or tests.
 */
const jwt = require('jsonwebtoken')
const config = require('../config/env')
const ApiError = require('../utils/ApiError')
const { User, StudentProfile, InstructorProfile } = require('../models')
const emailService = require('./emailService')

const RESET_EXPIRES_IN = '1h'

function signAccessToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  })
}

function signResetToken(user) {
  return jwt.sign({ sub: user.id, purpose: 'reset' }, config.jwt.secret, {
    expiresIn: RESET_EXPIRES_IN,
  })
}

function verifyResetToken(token) {
  const payload = jwt.verify(token, config.jwt.secret)
  if (payload.purpose !== 'reset') {
    throw ApiError.unauthorized('Invalid reset token')
  }
  return payload
}

async function register(payload) {
  const { firstName, lastName, email, password, role, phone } = payload

  const existing = await User.findOne({ where: { email } })
  if (existing) {
    throw ApiError.conflict('Email is already registered')
  }

  // Public registration is student-only; admin/instructor accounts are
  // provisioned out-of-band to keep the privilege boundary explicit.
  const finalRole = 'student'

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role: finalRole,
    phone,
  })

  // Seed the role-specific profile.
  if (finalRole === 'student') {
    await StudentProfile.create({ userId: user.id })
  } else if (finalRole === 'instructor') {
    await InstructorProfile.create({ userId: user.id })
  }

  const token = signAccessToken(user)
  const fresh = await User.findByPk(user.id) // excludes password via default scope

  // Best-effort welcome email; don't block on SMTP availability.
  emailService.sendWelcomeEmail(user.email, user.firstName).catch(() => {})

  return { user: fresh, token }
}

async function login(email, password) {
  const user = await User.scope('withPassword').findOne({ where: { email } })

  if (!user) {
    throw ApiError.unauthorized('Invalid email or password')
  }
  if (!user.isActive) {
    throw ApiError.forbidden('Account has been deactivated')
  }

  const match = await user.comparePassword(password)
  if (!match) {
    throw ApiError.unauthorized('Invalid email or password')
  }

  // Record login time without bumping updated_at.
  await user.update(
    { lastLoginAt: new Date() },
    { silent: true, attributes: ['lastLoginAt'] }
  )

  const token = signAccessToken(user)
  const safe = await User.findByPk(user.id)

  return { user: safe, token }
}

async function getMe(userId) {
  const user = await User.findByPk(userId)
  if (!user) throw ApiError.notFound('User not found')

  const profile =
    user.role === 'student'
      ? await StudentProfile.findOne({ where: { userId } })
      : user.role === 'instructor'
        ? await InstructorProfile.findOne({ where: { userId } })
        : null

  return { user, profile }
}

async function forgotPassword(email) {
  const user = await User.findOne({ where: { email } })

  // Always succeed to avoid leaking which emails are registered.
  if (user) {
    const token = signResetToken(user)
    const link = `${config.clientUrl}/reset-password?token=${token}`
    emailService.sendPasswordResetEmail(user.email, link).catch(() => {})
  }

  return {
    message: 'If that email is registered, a reset link has been sent.',
  }
}

async function resetPassword(token, newPassword) {
  let payload
  try {
    payload = verifyResetToken(token)
  } catch {
    throw ApiError.unauthorized('Invalid or expired reset token')
  }

  const user = await User.findByPk(payload.sub)
  if (!user) throw ApiError.notFound('User not found')

  await user.update({ password: newPassword })

  return { message: 'Password has been reset successfully.' }
}

module.exports = {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  signAccessToken,
  verifyResetToken,
}
