import api from './api'

export const authService = {
  /**
   * Login with email and password.
   * Returns { user, token }
   */
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  /**
   * Register a new student account.
   * Returns { user, token }
   */
  register: (payload) =>
    api.post('/auth/register', payload),

  /**
   * Send a password reset link to the given email.
   */
  forgotPassword: (email) =>
    api.post('/auth/forgot-password', { email }),

  /**
   * Reset password using a token from the reset email.
   */
  resetPassword: (token, password) =>
    api.post('/auth/reset-password', { token, password }),

  /**
   * Fetch the currently authenticated user's profile.
   */
  getProfile: () =>
    api.get('/auth/me'),
}
