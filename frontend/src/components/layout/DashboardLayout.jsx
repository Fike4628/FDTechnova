import React, { useState } from 'react'
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiLogOut, FiUser, FiBell, FiChevronDown } from 'react-icons/fi'
import {
  HiHome, HiBookOpen, HiClipboardList, HiAcademicCap, HiCalendar,
  HiBell, HiUser, HiViewGrid, HiCollection, HiUserGroup, HiCurrencyDollar,
  HiChartBar, HiSpeakerphone, HiDocumentText, HiCog
} from 'react-icons/hi'
import { useAuth } from '../../hooks/useAuth'

const STUDENT_LINKS = [
  { to: '/student/dashboard', label: 'Dashboard', icon: HiHome },
  { to: '/student/my-courses', label: 'My Courses', icon: HiBookOpen },
  { to: '/student/assignments', label: 'Assignments', icon: HiClipboardList },
  { to: '/student/results', label: 'Results', icon: HiAcademicCap },
  { to: '/student/schedule', label: 'Schedule', icon: HiCalendar },
  { to: '/student/notifications', label: 'Notifications', icon: HiBell },
  { to: '/student/profile', label: 'Profile', icon: HiUser },
]

const INSTRUCTOR_LINKS = [
  { to: '/instructor/dashboard', label: 'Dashboard', icon: HiHome },
  { to: '/instructor/courses', label: 'My Courses', icon: HiBookOpen },
  { to: '/instructor/lessons', label: 'Lessons', icon: HiDocumentText },
  { to: '/instructor/assignments', label: 'Assignments', icon: HiClipboardList },
  { to: '/instructor/students', label: 'Students', icon: HiUserGroup },
  { to: '/instructor/profile', label: 'Profile', icon: HiUser },
]

const ADMIN_LINKS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: HiViewGrid },
  { to: '/admin/courses', label: 'Courses', icon: HiBookOpen },
  { to: '/admin/categories', label: 'Categories', icon: HiCollection },
  { to: '/admin/students', label: 'Students', icon: HiUserGroup },
  { to: '/admin/instructors', label: 'Instructors', icon: HiAcademicCap },
  { to: '/admin/enrollments', label: 'Enrollments', icon: HiClipboardList },
  { to: '/admin/schedules', label: 'Schedules', icon: HiCalendar },
  { to: '/admin/announcements', label: 'Announcements', icon: HiSpeakerphone },
  { to: '/admin/payments', label: 'Payments', icon: HiCurrencyDollar },
  { to: '/admin/reports', label: 'Reports', icon: HiChartBar },
]

function SidebarLink({ to, label, Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
          isActive
            ? 'bg-primary-600 text-white shadow-sm'
            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        }`
      }
    >
      <Icon size={17} className="shrink-0" />
      <span>{label}</span>
    </NavLink>
  )
}

function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const linksByRole = { student: STUDENT_LINKS, instructor: INSTRUCTOR_LINKS, admin: ADMIN_LINKS }
  const links = linksByRole[user?.role] || []
  const roleLabel = { student: 'Student Panel', instructor: 'Instructor Panel', admin: 'Admin Panel' }[user?.role] || 'Dashboard'

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-900 flex flex-col transition-transform duration-300 ease-in-out`}
        aria-label="Dashboard navigation"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-gray-800">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg overflow-hidden shrink-0">
              <img
                src="/images/courses/logo.png"
                alt="FDTeknova Academy"
                className="w-full h-full object-cover"
                onError={e => {
                  e.target.parentElement.className = 'h-9 w-9 bg-primary-600 rounded-lg flex items-center justify-center shrink-0'
                  e.target.outerHTML = '<span class="text-white font-extrabold text-sm">FD</span>'
                }}
              />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">FDTeknova</p>
              <p className="text-gray-500 text-xs leading-tight">{roleLabel}</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden ml-auto text-gray-500 hover:text-white p-1"
            aria-label="Close sidebar"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* User info */}
        <div className="px-4 py-3 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary-700 flex items-center justify-center font-bold text-white text-sm shrink-0">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">{user?.name || 'User'}</p>
              <p className="text-gray-500 text-xs truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <SidebarLink key={to} to={to} label={label} Icon={Icon} />
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-gray-800 space-y-1">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <HiHome size={17} /> Back to Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors"
          >
            <FiLogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              aria-label="Open sidebar"
            >
              <FiMenu size={20} />
            </button>
            <div className="hidden sm:block">
              <p className="font-bold text-gray-900 text-sm">{roleLabel}</p>
              <p className="text-gray-400 text-xs">FDTeknova Academy</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg" aria-label="Notifications">
              <FiBell size={18} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-700 font-bold text-sm">{user?.name?.[0] || 'U'}</span>
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
                {user?.name}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
