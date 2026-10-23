import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiTrendingUp, FiUsers, FiBookOpen, FiDollarSign, FiCalendar, FiBell } from 'react-icons/fi'
import { HiAcademicCap, HiUserGroup, HiBookOpen, HiCurrencyDollar, HiChartBar, HiClipboardList } from 'react-icons/hi'

const STATS = [
  { icon: HiUserGroup, value: '1,240', label: 'Total Students', sub: '+12 this week', to: '/admin/students', color: 'bg-blue-600' },
  { icon: HiAcademicCap, value: '28', label: 'Instructors', sub: '5 active courses', to: '/admin/instructors', color: 'bg-purple-600' },
  { icon: HiBookOpen, value: '5', label: 'Active Courses', sub: 'All published', to: '/admin/courses', color: 'bg-green-600' },
  { icon: HiClipboardList, value: '384', label: 'Enrollments', sub: '+28 this month', to: '/admin/enrollments', color: 'bg-amber-500' },
  { icon: HiCurrencyDollar, value: '48,200', label: 'Revenue (ETB)', sub: 'This month', to: '/admin/payments', color: 'bg-emerald-600' },
  { icon: HiChartBar, value: '94%', label: 'Completion Rate', sub: 'Average across courses', to: '/admin/reports', color: 'bg-pink-600' },
]

const RECENT_ENROLLMENTS = [
  { name: 'Tesfaye Bekele', course: 'Web Design', date: 'Today', status: 'confirmed' },
  { name: 'Hanan Mohammed', course: 'Video Editing', date: 'Today', status: 'pending' },
  { name: 'Abebe Kebede', course: 'English Language', date: 'Yesterday', status: 'confirmed' },
  { name: 'Fatuma Ali', course: 'Graphic Design', date: 'Yesterday', status: 'confirmed' },
  { name: 'Dawit Girma', course: 'Basic Computer', date: '2 days ago', status: 'pending' },
]

const QUICK_ACTIONS = [
  { to: '/admin/courses/create', label: 'Create Course', icon: '📚' },
  { to: '/admin/enrollments', label: 'Manage Enrollments', icon: '📋' },
  { to: '/admin/announcements', label: 'Post Announcement', icon: '📢' },
  { to: '/admin/schedules', label: 'Manage Schedules', icon: '📅' },
  { to: '/admin/reports', label: 'View Reports', icon: '📊' },
  { to: '/admin/students', label: 'Manage Students', icon: '👥' },
]

function AdminDashboard() {
  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Platform overview — FDTeknova Academy</p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/courses/create" className="btn-primary text-sm px-4 py-2.5">
            + New Course
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {STATS.map(({ icon: Icon, value, label, sub, to, color }) => (
          <Link key={to} to={to} className={`${color} rounded-2xl p-5 flex gap-4 items-start hover:opacity-90 transition-opacity`}>
            <div className="h-11 w-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Icon size={20} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white leading-tight">{value}</p>
              <p className="text-white/90 text-sm font-semibold">{label}</p>
              <p className="text-white/60 text-xs mt-0.5">{sub}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent enrollments */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Recent Enrollments</h2>
            <Link to="/admin/enrollments" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
              View all <FiArrowRight size={13} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {RECENT_ENROLLMENTS.map((e, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                    {e.name[0]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{e.name}</p>
                    <p className="text-gray-400 text-xs">{e.course}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-xs">{e.date}</span>
                  <span className={`badge capitalize ${e.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {e.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {QUICK_ACTIONS.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                className="flex flex-col items-center gap-2 p-3.5 bg-gray-50 hover:bg-primary-50 hover:text-primary-700 rounded-xl text-center transition-colors border border-transparent hover:border-primary-100"
              >
                <span className="text-2xl">{icon}</span>
                <span className="text-xs font-medium text-gray-700 leading-snug">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Course performance */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Course Performance</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { name: 'Web Design & Development', enrolled: 32, color: 'bg-blue-500', pct: 64, image: '/images/courses/web_design.png' },
              { name: 'Video Editing', enrolled: 28, color: 'bg-purple-500', pct: 56, image: '/images/courses/vidieo_diting.png' },
              { name: 'Graphic Design', enrolled: 24, color: 'bg-pink-500', pct: 48, image: '/images/courses/graphic_design.png' },
              { name: 'Basic Computer Skills', enrolled: 45, color: 'bg-emerald-500', pct: 90, image: '/images/courses/basic_computer_skill.png' },
              { name: 'English Language', enrolled: 38, color: 'bg-amber-500', pct: 76, image: '/images/courses/english_language.png' },
            ].map(course => (
              <div key={course.name} className="flex items-center gap-4">
                {/* Mini thumbnail */}
                <div className="h-9 w-14 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                  <img
                    src={course.image}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover"
                    onError={e => {
                      e.target.style.display = 'none'
                      const fb = e.target.nextSibling
                      if (fb) fb.style.display = 'flex'
                    }}
                  />
                  <div
                    className={`w-full h-full ${course.color} items-center justify-center text-white text-xs font-bold`}
                    style={{ display: 'none' }}
                    aria-hidden="true"
                  >
                    {course.name[0]}
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-700 w-44 shrink-0 truncate">{course.name}</p>
                <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div className={`h-2.5 rounded-full ${course.color}`} style={{ width: `${course.pct}%` }} />
                </div>
                <span className="text-xs text-gray-500 w-16 text-right shrink-0">{course.enrolled} students</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
