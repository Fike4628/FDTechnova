import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/EmptyState'
import Button from '../../components/common/Button'
import { adminService } from '../../services/adminService'

function ManageCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminService.getCourses().then(setCourses).finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this course?')) return
    await adminService.deleteCourse(id)
    setCourses((prev) => prev.filter((c) => c.id !== id))
  }

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Courses</h1>
        <Link to="/admin/courses/create">
          <Button>+ Create Course</Button>
        </Link>
      </div>

      {courses.length === 0 ? (
        <EmptyState title="No courses yet" />
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Instructor</th>
                <th className="px-4 py-3 font-medium">Students</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-14 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                        <img
                          src={`/images/courses/${c.image || c.id + '.png'}`}
                          alt=""
                          aria-hidden="true"
                          className="w-full h-full object-cover"
                          onError={e => { e.target.style.display = 'none' }}
                        />
                      </div>
                      <span className="font-medium text-gray-900 text-sm">{c.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{c.instructorName}</td>
                  <td className="px-4 py-3 text-gray-500">{c.studentCount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${c.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-3">
                    <Link to={`/admin/courses/${c.id}/edit`} className="text-xs text-blue-600 hover:underline">Edit</Link>
                    <button onClick={() => handleDelete(c.id)} className="text-xs text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ManageCourses
