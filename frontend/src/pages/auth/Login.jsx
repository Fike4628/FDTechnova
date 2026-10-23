import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || null

  const [showPassword, setShowPassword] = useState(false)
  const [apiError, setApiError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async ({ email, password }) => {
    setApiError('')
    try {
      const user = await login(email, password)
      const redirects = {
        student: '/student/dashboard',
        instructor: '/instructor/dashboard',
        admin: '/admin/dashboard',
      }
      navigate(from || redirects[user.role] || '/')
    } catch (err) {
      setApiError(err.message || 'Invalid email or password. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Back to home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm font-medium mb-6 transition-colors"
        >
          <FiArrowLeft size={15} /> Back to Home
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Top accent */}
          <div className="h-2 bg-gradient-to-r from-primary-600 to-primary-400" />

          <div className="p-8 sm:p-10">
            {/* Logo */}
            <Link to="/" className="flex items-center justify-center gap-2.5 mb-8">
              <div className="h-11 w-11 bg-primary-600 rounded-xl flex items-center justify-center shadow">
                <span className="text-white font-extrabold text-lg">FD</span>
              </div>
              <div>
                <p className="font-extrabold text-primary-800 text-base leading-tight">FDTeknova</p>
                <p className="text-gray-400 text-xs leading-tight">Academy</p>
              </div>
            </Link>

            <h1 className="text-2xl font-extrabold text-gray-900 text-center mb-1">Welcome Back</h1>
            <p className="text-gray-500 text-sm text-center mb-7">Sign in to continue your learning journey</p>

            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3.5 text-sm mb-5 flex items-center gap-2" role="alert">
                <span className="text-red-500">⚠️</span> {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
              {/* Email */}
              <div>
                <label className="form-label">Email Address</label>
                <div className="relative">
                  <FiMail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' }
                    })}
                    className={`form-input pl-10 ${errors.email ? 'border-red-300 bg-red-50' : ''}`}
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="form-label mb-0">Password</label>
                  <Link to="/forgot-password" className="text-xs text-primary-600 hover:text-primary-800 font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <FiLock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { required: 'Password is required' })}
                    className={`form-input pl-10 pr-10 ${errors.password ? 'border-red-300 bg-red-50' : ''}`}
                    placeholder="Your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full justify-center py-3.5 mt-2"
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                ) : (
                  <span className="flex items-center gap-2">Sign In <FiArrowRight size={16} /></span>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-800">
                Create one free
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-blue-200 text-xs mt-4">
          © {new Date().getFullYear()} FDTeknova Academy — Learn Skills. Build Your Future.
        </p>
      </div>
    </div>
  )
}

export default Login
