import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff, FiArrowRight, FiArrowLeft, FiCheckCircle } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

function Register() {
  const { register: authRegister } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [apiError, setApiError] = useState('')

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()
  const password = watch('password')

  const onSubmit = async (data) => {
    setApiError('')
    try {
      await authRegister({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      })
      navigate('/student/dashboard')
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please try again.')
    }
  }

  const benefits = [
    'Access to all course details',
    'Easy enrollment process',
    'Progress tracking dashboard',
    'Certificate of completion',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center px-4 py-12">

      {/* Back to home — sits above the card */}
      <div className="absolute top-5 left-5 sm:top-7 sm:left-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm font-medium transition-colors"
        >
          <FiArrowLeft size={15} /> Back to Home
        </Link>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Left panel */}
        <div className="hidden lg:flex bg-hero-gradient flex-col justify-center px-10 py-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/5 blur-2xl -translate-y-1/2 translate-x-1/2" />
          <Link to="/" className="flex items-center gap-2.5 mb-10">
            <div className="h-11 w-11 bg-white/20 rounded-xl flex items-center justify-center border border-white/30">
              <span className="text-white font-extrabold text-lg">FD</span>
            </div>
            <div>
              <p className="font-extrabold text-white text-base leading-tight">FDTeknova</p>
              <p className="text-blue-200 text-xs">Academy</p>
            </div>
          </Link>

          <h2 className="text-3xl font-extrabold mb-3 leading-tight">Start Your Learning Journey Today</h2>
          <p className="text-blue-200 text-sm mb-8 leading-relaxed">
            Join hundreds of students building real tech and language skills at FDTeknova Academy in Sagure, Ethiopia.
          </p>

          <ul className="space-y-3">
            {benefits.map(b => (
              <li key={b} className="flex items-center gap-3 text-sm text-blue-100">
                <FiCheckCircle size={16} className="text-accent-400 shrink-0" /> {b}
              </li>
            ))}
          </ul>

          <div className="mt-10 p-4 bg-white/10 rounded-2xl border border-white/20">
            <p className="text-white font-bold italic text-lg">Learn Skills.</p>
            <p className="text-accent-400 font-extrabold italic text-xl">Build Your Future.</p>
          </div>
        </div>

        {/* Right: form */}
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <div className="h-1.5 w-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full mb-8" />

          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Create Your Account</h1>
          <p className="text-gray-500 text-sm mb-6">Join FDTeknova Academy for free</p>

          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3.5 text-sm mb-4" role="alert">
              ⚠️ {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div>
              <label className="form-label">Full Name *</label>
              <div className="relative">
                <FiUser size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register('name', { required: 'Full name is required', minLength: { value: 2, message: 'Name is too short' } })}
                  className={`form-input pl-10 ${errors.name ? 'border-red-300 bg-red-50' : ''}`}
                  placeholder="Your full name"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="form-label">Email Address *</label>
              <div className="relative">
                <FiMail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
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

            <div>
              <label className="form-label">Phone Number</label>
              <div className="relative">
                <FiPhone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  {...register('phone')}
                  className="form-input pl-10"
                  placeholder="+251 9XX XXX XXX"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Password *</label>
              <div className="relative">
                <FiLock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'At least 8 characters required' }
                  })}
                  className={`form-input pl-10 pr-10 ${errors.password ? 'border-red-300 bg-red-50' : ''}`}
                  placeholder="Min. 8 characters"
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="form-label">Confirm Password *</label>
              <div className="relative">
                <FiLock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: v => v === password || 'Passwords do not match'
                  })}
                  className={`form-input pl-10 ${errors.confirmPassword ? 'border-red-300 bg-red-50' : ''}`}
                  placeholder="Repeat your password"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <p className="text-xs text-gray-400">
              By registering you agree to our{' '}
              <Link to="/terms" className="text-primary-600 hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy-policy" className="text-primary-600 hover:underline">Privacy Policy</Link>.
            </p>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3.5">
              {isSubmitting ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : (
                <span className="flex items-center gap-2">Create Account <FiArrowRight size={16} /></span>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-800">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
