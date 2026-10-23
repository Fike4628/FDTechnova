import React, { useEffect, useState } from 'react'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/EmptyState'
import { adminService } from '../../services/adminService'
import { formatDate } from '../../utils/formatDate'

function ManageStudents() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminService.getStudents().then(setStudents).finally(() => setLoading(false))
  }, [])

  const handleDeactivate = async (id) => {
    if (!confirm('Deactivate this student?')) return
    await adminService.deactivateUser(id)
    setStudents((prev) => prev.map((s) => s.id === id ? { ...s, status: 'inactive' } : s))
  }

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Students</h1>

      {students.length === 0 ? (
        <EmptyState title="No students registered yet" />
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Joined</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-900">{s.name}</td>
                  <td className="px-4 py-3 text-gray-500">{s.email}</td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(s.createdAt)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${s.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {s.status === 'active' && (
                      <button onClick={() => handleDeactivate(s.id)} className="text-xs text-red-500 hover:underline">Deactivate</button>
                    )}
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

export default ManageStudents
