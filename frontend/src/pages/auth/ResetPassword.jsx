import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <Link to="/" className="block text-center font-bold text-xl text-blue-600 mb-6">
          FDTeknova Academy
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Reset Password</h1>
        <p className="text-gray-500 text-sm mb-6">Choose a new password for your account.</p>

        {apiError && <div className="text-red-500 text-sm mb-3" role="alert">{apiError}</div>}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input id="password" label="New Password" type="password" value={form.password} onChange={handleChange} error={errors.password} required />
          <Input id="confirmPassword" label="Confirm New Password" type="password" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} required />
          <Button type="submit" loading={loading} className="w-full">Reset Password</Button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
