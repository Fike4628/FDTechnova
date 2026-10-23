import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import Spinner from '../../components/common/Spinner'
import { adminService } from '../../services/adminService'

function EditCourse() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', description: '', price: '', level: 'beginner', category: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    adminService.getCourseById(id).then((course) => {
      setForm({
        title: course.title || '',
        description: course.description || '',
        price: course.price ?? '',
        level: course.level || 'beginner',
        category: course.category || '',
      })
    }).finally(() => setLoading(false))
  }, [id])

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setApiError('')
    try {
      await adminService.updateCourse(id, form)
      navigate('/admin/courses')
    } catch {
      setApiError('Failed to update course.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Course</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        {apiError && <div className="bg-red-50 border border-red-200 text-red-600 rounded p-3 text-sm mb-4">{apiError}</div>}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input id="title" label="Course Title" value={form.title} onChange={handleChange} required />
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" rows={4} value={form.description} onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
          <Input id="price" label="Price" type="number" min="0" value={form.price} onChange={handleChange} />
          <div className="flex gap-3">
            <Button type="submit" loading={saving}>Save Changes</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/admin/courses')}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCourse
