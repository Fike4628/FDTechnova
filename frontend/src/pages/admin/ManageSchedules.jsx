import React, { useEffect, useState } from 'react'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/EmptyState'
import Button from '../../components/common/Button'
import { adminService } from '../../services/adminService'
import { formatDate } from '../../utils/formatDate'

function ManageSchedules() {
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminService.getSchedules().then(setSchedules).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Schedules</h1>
        <Button>+ Add Schedule</Button>
      </div>

      {schedules.length === 0 ? (
        <EmptyState title="No schedules yet" />
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Course</th>
                <th className="px-4 py-3 font-medium">Instructor</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {schedules.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-900">{s.title}</td>
                  <td className="px-4 py-3 text-gray-500">{s.courseName}</td>
                  <td className="px-4 py-3 text-gray-500">{s.instructorName}</td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(s.date)}</td>
                  <td className="px-4 py-3 text-gray-500">{s.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ManageSchedules
