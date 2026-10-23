import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

/**
 * Restricts access to users whose role is in allowedRoles.
 * Redirects unauthorized users to their own dashboard or home.
 */
function RoleRoute({ allowedRoles = [] }) {
  const { user } = useAuth()

  if (!user || !allowedRoles.includes(user.role)) {
    const fallbacks = {
      student: '/student/dashboard',
      instructor: '/instructor/dashboard',
      admin: '/admin/dashboard',
    }
    return <Navigate to={fallbacks[user?.role] || '/'} replace />
  }

  return <Outlet />
}

export default RoleRoute
