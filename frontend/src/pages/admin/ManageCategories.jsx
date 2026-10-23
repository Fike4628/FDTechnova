import React, { useEffect, useState } from 'react'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Modal from '../../components/common/Modal'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/EmptyState'
import { adminService } from '../../services/adminService'

function ManageCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    adminService.getCategories().then(setCategories).finally(() => setLoading(false))
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setSaving(true)
    try {
      const cat = await adminService.createCategory({ name })
      setCategories((prev) => [...prev, cat])
      setName('')
      setShowModal(false)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return
    await adminService.deleteCategory(id)
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <Button onClick={() => setShowModal(true)}>+ Add Category</Button>
      </div>

      {categories.length === 0 ? (
        <EmptyState title="No categories yet" />
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Courses</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                  <td className="px-4 py-3 text-gray-500">{c.courseCount ?? 0}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(c.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Category">
        <form onSubmit={handleAdd} className="space-y-4">
          <Input id="catName" label="Category Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>Add</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ManageCategories
