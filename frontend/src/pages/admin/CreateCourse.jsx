import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { adminService } from '../../services/adminService'

function CreateCourse() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', description: '', price: '', level: 'beginner', category: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value })

  const validate = () => {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!form.description.trim()) errs.description = 'Description is required'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) return setErrors(errs)
    setLoading(true)
    setApiError('')
    try {
      await adminService.createCourse(form)
      navigate('/admin/courses')
    } catch {
      setApiError('Failed to create course. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Course</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        {apiError && <div className="bg-red-50 border border-red-200 text-red-600 rounded p-3 text-sm mb-4">{apiError}</div>}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input id="title" label="Course Title" value={form.title} onChange={handleChange} error={errors.title} required />
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">Description <span className="text-red-500">*</span></label>
            <textarea id="description" rows={4} value={form.description} onChange={handleChange}
              className={`px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-400' : 'border-gray-300'}`} />
            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
          </div>
          <Input id="category" label="Category" value={form.category} onChange={handleChange} />
          <div className="flex flex-col gap-1">
            <label htmlFor="level" className="text-sm font-medium text-gray-700">Level</label>
            <select id="level" value={form.level} onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <Input id="price" label="Price (0 for free)" type="number" min="0" value={form.price} onChange={handleChange} />
          <div className="flex gap-3">
            <Button type="submit" loading={loading}>Create Course</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/admin/courses')}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCourse
