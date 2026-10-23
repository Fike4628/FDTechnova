import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/EmptyState'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'
import { lessonService } from '../../services/lessonService'

function ManageLessons() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')

  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title: '', content: '', videoUrl: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!courseId) { setLoading(false); return }
    lessonService.getByCourse(courseId).then(setLessons).finally(() => setLoading(false))
  }, [courseId])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const lesson = await lessonService.create({ ...form, courseId })
      setLessons((prev) => [...prev, lesson])
      setShowModal(false)
      setForm({ title: '', content: '', videoUrl: '' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Lessons</h1>
        <Button onClick={() => setShowModal(true)}>+ Add Lesson</Button>
      </div>

      {lessons.length === 0 ? (
        <EmptyState title="No lessons yet" description="Add your first lesson to get started." />
      ) : (
        <div className="space-y-3">
          {lessons.map((lesson, i) => (
            <div key={lesson.id} className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 flex items-center justify-between">
              <div>
                <span className="text-gray-400 text-sm mr-3">{i + 1}.</span>
                <span className="font-medium text-gray-900">{lesson.title}</span>
              </div>
              <div className="flex gap-2">
                <button className="text-xs text-blue-600 hover:underline">Edit</button>
                <button className="text-xs text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Lesson">
        <form onSubmit={handleSave} className="space-y-4">
          <Input id="title" label="Lesson Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Input id="videoUrl" label="Video URL" value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Content</label>
            <textarea rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={() => setShowModal(false)} type="button">Cancel</Button>
            <Button type="submit" loading={saving}>Save Lesson</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ManageLessons
