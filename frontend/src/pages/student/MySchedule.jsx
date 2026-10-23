import React, { useEffect, useState } from 'react'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/EmptyState'
import { studentService } from '../../services/studentService'
import { formatDate } from '../../utils/formatDate'

function MySchedule() {
  const [schedule, setSchedule] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    studentService.getMySchedule().then(setSchedule).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Schedule</h1>

      {schedule.length === 0 ? (
        <EmptyState title="No scheduled classes" description="Your upcoming live sessions and classes will appear here." />
      ) : (
        <div className="space-y-4">
          {schedule.map((item) => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{item.courseName}</p>
                <p className="text-xs text-gray-400 mt-1">Instructor: {item.instructorName}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-blue-700">{formatDate(item.date)}</p>
                <p className="text-xs text-gray-400">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MySchedule
