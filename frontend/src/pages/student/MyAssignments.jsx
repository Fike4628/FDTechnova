import React, { useEffect, useState } from 'react'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/EmptyState'
import { studentService } from '../../services/studentService'
import { formatDate } from '../../utils/formatDate'

function MyAssignments() {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    studentService.getMyAssignments().then(setAssignments).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  const statusColor = {
    pending: 'bg-yellow-100 text-yellow-700',
    submitted: 'bg-blue-100 text-blue-700',
    graded: 'bg-green-100 text-green-700',
    overdue: 'bg-red-100 text-red-700',
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Assignments</h1>

      {assignments.length === 0 ? (
        <EmptyState title="No assignments" description="You have no assignments yet." />
      ) : (
        <div className="space-y-4">
          {assignments.map((a) => (
            <div key={a.id} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">{a.title}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{a.courseName}</p>
                <p className="text-xs text-gray-400 mt-1">Due: {formatDate(a.dueDate)}</p>
              </div>
              <span className={`self-start md:self-auto px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColor[a.status] || 'bg-gray-100 text-gray-600'}`}>
                {a.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyAssignments
