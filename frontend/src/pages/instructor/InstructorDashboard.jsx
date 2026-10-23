import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function InstructorDashboard() {
  const { user } = useAuth()

  const cards = [
    { label: 'My Courses', value: '6', to: '/instructor/courses', color: 'bg-blue-50 text-blue-700' },
    { label: 'Total Students', value: '148', to: '/instructor/students', color: 'bg-green-50 text-green-700' },
    { label: 'Pending Reviews', value: '9', to: '/instructor/assignments', color: 'bg-yellow-50 text-yellow-700' },
    { label: 'Active Lessons', value: '32', to: '/instructor/lessons', color: 'bg-purple-50 text-purple-700' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Welcome, {user?.name || 'Instructor'} 👋
      </h1>
      <p className="text-gray-500 text-sm mb-8">Here's an overview of your teaching activity.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map(({ label, value, to, color }) => (
          <Link key={to} to={to} className={`rounded-xl p-5 ${color} hover:opacity-90 transition`}>
            <p className="text-3xl font-extrabold">{value}</p>
            <p className="text-sm font-medium mt-1">{label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { to: '/instructor/lessons', label: 'Manage Lessons' },
            { to: '/instructor/assignments', label: 'Review Assignments' },
            { to: '/instructor/students', label: 'View Students' },
            { to: '/instructor/profile', label: 'Edit Profile' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} className="text-center px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InstructorDashboard
