import React, { useState } from 'react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { useAuth } from '../../hooks/useAuth'
import { studentService } from '../../services/studentService'

function StudentProfile() {
  const { user, setUser } = useAuth()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    try {
      const updated = await studentService.updateProfile(form)
      setUser(updated)
      setSuccess(true)
    } catch {
      setError('Failed to update profile.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-2xl font-bold">
            {user?.name?.[0] || 'S'}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full capitalize">{user?.role}</span>
          </div>
        </div>

        {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded p-3 text-sm mb-4">Profile updated successfully.</div>}
        {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded p-3 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input id="name" label="Full Name" value={form.name} onChange={handleChange} required />
          <Input id="email" label="Email Address" type="email" value={form.email} onChange={handleChange} required />
          <Input id="phone" label="Phone Number" type="tel" value={form.phone} onChange={handleChange} />
          <Button type="submit" loading={loading}>Save Changes</Button>
        </form>
      </div>
    </div>
  )
}

export default StudentProfile
