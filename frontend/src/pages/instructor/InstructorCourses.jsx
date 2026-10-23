import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/EmptyState'
import { instructorService } from '../../services/instructorService'

function InstructorCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    instructorService.getMyCourses().then(setCourses).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
      </div>

      {courses.length === 0 ? (
        <EmptyState title="No courses yet" description="Your assigned courses will appear here." />
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Course</th>
                <th className="px-4 py-3 font-medium">Students</th>
                <th className="px-4 py-3 font-medium">Lessons</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-900">{course.title}</td>
                  <td className="px-4 py-3 text-gray-500">{course.studentCount}</td>
                  <td className="px-4 py-3 text-gray-500">{course.lessonCount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${course.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`/instructor/lessons?courseId=${course.id}`} className="text-blue-600 hover:underline text-xs mr-3">
                      Manage Lessons
                    </Link>
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

export default InstructorCourses
