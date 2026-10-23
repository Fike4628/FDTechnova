import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi'
import { authService } from '../../services/authService'

function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async ({ email }) => {
    try {
      await authService.forgotPassword(email)
    } catch { /* fail silently for security */ }
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-primary-600 to-primary-400" />
        <div className="p-8 sm:p-10">
          <Link to="/" className="flex items-center justify-center gap-2.5 mb-8">
            <div className="h-10 w-10 bg-primary-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-extrabold">FD</span>
            </div>
            <div>
              <p className="font-extrabold text-primary-800 text-sm">FDTeknova Academy</p>
            </div>
          </Link>

          {submitted ? (
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle size={28} className="text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Check Your Email</h2>
              <p className="text-gray-500 text-sm mb-6">
                If an account exists for that email address, we've sent a password reset link. Check your inbox.
              </p>
              <Link to="/login" className="btn-primary w-full justify-center">Back to Login</Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-extrabold text-gray-900 text-center mb-1">Forgot Password?</h1>
              <p className="text-gray-500 text-sm text-center mb-7">Enter your email and we'll send you a reset link.</p>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <div>
                  <label className="form-label">Email Address</label>
                  <div className="relative">
                    <FiMail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
                      })}
                      className={`form-input pl-10 ${errors.email ? 'border-red-300 bg-red-50' : ''}`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3.5">
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}

          <p className="text-center mt-6">
            <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600">
              <FiArrowLeft size={14} /> Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
