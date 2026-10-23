import React, { useEffect, useState } from 'react'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/EmptyState'
import { adminService } from '../../services/adminService'
import { formatDate } from '../../utils/formatDate'

function ManageEnrollments() {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminService.getEnrollments().then(setEnrollments).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Enrollments</h1>

      {enrollments.length === 0 ? (
        <EmptyState title="No enrollments yet" />
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Student</th>
                <th className="px-4 py-3 font-medium">Course</th>
                <th className="px-4 py-3 font-medium">Enrolled On</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {enrollments.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-800">{e.studentName}</td>
                  <td className="px-4 py-3 text-gray-700">{e.courseName}</td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(e.enrolledAt)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${e.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {e.status}
                    </span>
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

export default ManageEnrollments
