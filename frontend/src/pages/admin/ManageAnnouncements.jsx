import React, { useEffect, useState } from 'react'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/EmptyState'
import { adminService } from '../../services/adminService'
import { formatDate } from '../../utils/formatDate'

function ManageAnnouncements() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title: '', message: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    adminService.getAnnouncements().then(setAnnouncements).finally(() => setLoading(false))
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const a = await adminService.createAnnouncement(form)
      setAnnouncements((prev) => [a, ...prev])
      setShowModal(false)
      setForm({ title: '', message: '' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
        <Button onClick={() => setShowModal(true)}>+ Post Announcement</Button>
      </div>

      {announcements.length === 0 ? (
        <EmptyState title="No announcements yet" />
      ) : (
        <div className="space-y-4">
          {announcements.map((a) => (
            <div key={a.id} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-900">{a.title}</h3>
                <span className="text-xs text-gray-400">{formatDate(a.createdAt)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{a.message}</p>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Post Announcement">
        <form onSubmit={handleSave} className="space-y-4">
          <Input id="ann-title" label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Message</label>
            <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>Post</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ManageAnnouncements
