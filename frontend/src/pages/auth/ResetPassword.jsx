import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { authService } from '../../services/authService'

function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const [form, setForm] = useState({ password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value })

  const validate = () => {
    const errs = {}
    if (form.password.length < 8) errs.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) return setErrors(errs)
    setLoading(true)
    setApiError('')
    try {
      await authService.resetPassword(token, form.password)
      navigate('/login')
    } catch {
      setApiError('Reset failed. The link may have expired.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center px-4">

      {/* Back to home */}
      <div className="absolute top-5 left-5 sm:top-7 sm:left-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm font-medium transition-colors"
        >
          <FiArrowLeft size={15} /> Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md">
        <div className="h-2 bg-gradient-to-r from-primary-600 to-primary-400" />
        <div className="p-8 sm:p-10">
          <Link to="/" className="flex items-center justify-center gap-2.5 mb-8">
            <div className="h-11 w-11 bg-primary-600 rounded-xl flex items-center justify-center shadow">
              <span className="text-white font-extrabold text-lg">FD</span>
            </div>
            <div>
              <p className="font-extrabold text-primary-800 text-base leading-tight">FDTeknova</p>
              <p className="text-gray-400 text-xs leading-tight">Academy</p>
            </div>
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 mb-1 text-center">Reset Password</h1>
          <p className="text-gray-500 text-sm mb-6 text-center">Choose a new password for your account.</p>

          {apiError && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3.5 text-sm mb-4" role="alert">⚠️ {apiError}</div>}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input id="password" label="New Password" type="password" value={form.password} onChange={handleChange} error={errors.password} required />
            <Input id="confirmPassword" label="Confirm New Password" type="password" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} required />
            <Button type="submit" loading={loading} className="w-full">Reset Password</Button>
          </form>

          <p className="text-center mt-6">
            <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 transition-colors">
              <FiArrowLeft size={14} /> Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
