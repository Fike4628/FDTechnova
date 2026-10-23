import React, { useEffect, useState } from 'react'
import Spinner from '../../components/common/Spinner'
import { adminService } from '../../services/adminService'
import { formatCurrency } from '../../utils/formatCurrency'

function Reports() {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminService.getReports().then(setReport).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  const metrics = report
    ? [
        { label: 'Total Students', value: report.totalStudents },
        { label: 'Total Instructors', value: report.totalInstructors },
        { label: 'Total Courses', value: report.totalCourses },
        { label: 'Total Enrollments', value: report.totalEnrollments },
        { label: 'Total Revenue', value: formatCurrency(report.totalRevenue) },
        { label: 'Avg. Completion Rate', value: `${report.avgCompletionRate ?? 0}%` },
      ]
    : []

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {metrics.map(({ label, value }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
            <p className="text-3xl font-extrabold text-gray-900">{value ?? '—'}</p>
            <p className="text-sm text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 mb-3">Top Courses by Enrollment</h2>
        {report?.topCourses?.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="text-gray-500 text-left border-b">
              <tr>
                <th className="pb-2 font-medium">Course</th>
                <th className="pb-2 font-medium">Enrollments</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {report.topCourses.map((c) => (
                <tr key={c.id}>
                  <td className="py-2 text-gray-800">{c.title}</td>
                  <td className="py-2 text-gray-600">{c.enrollmentCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-gray-400">No data available.</p>
        )}
      </div>
    </div>
  )
}

export default Reports
