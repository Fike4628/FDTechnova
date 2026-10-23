import React, { useEffect, useState } from 'react'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/EmptyState'
import { adminService } from '../../services/adminService'
import { formatDate } from '../../utils/formatDate'

function ManageInstructors() {
  const [instructors, setInstructors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminService.getInstructors().then(setInstructors).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Instructors</h1>

      {instructors.length === 0 ? (
        <EmptyState title="No instructors yet" />
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Specialty</th>
                <th className="px-4 py-3 font-medium">Courses</th>
                <th className="px-4 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {instructors.map((i) => (
                <tr key={i.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-900">{i.name}</td>
                  <td className="px-4 py-3 text-gray-500">{i.email}</td>
                  <td className="px-4 py-3 text-gray-500">{i.specialty}</td>
                  <td className="px-4 py-3 text-gray-500">{i.courseCount ?? 0}</td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(i.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ManageInstructors
