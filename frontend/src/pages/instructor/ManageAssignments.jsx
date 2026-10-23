import React, { useEffect, useState } from 'react'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/EmptyState'
import { instructorService } from '../../services/instructorService'
import { formatDate } from '../../utils/formatDate'

function ManageAssignments() {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    instructorService.getAssignments().then(setAssignments).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Assignments</h1>

      {assignments.length === 0 ? (
        <EmptyState title="No assignments" description="No assignments have been submitted yet." />
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Student</th>
                <th className="px-4 py-3 font-medium">Assignment</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assignments.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-800">{a.studentName}</td>
                  <td className="px-4 py-3 text-gray-700">{a.title}</td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(a.submittedAt)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${a.status === 'graded' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-blue-600 hover:underline">Grade</button>
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

export default ManageAssignments
