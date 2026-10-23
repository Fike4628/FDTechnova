import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar({ links = [], title = 'Menu' }) {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-gray-300 flex flex-col">
      <div className="px-6 py-4 border-b border-gray-700">
        <span className="text-white font-semibold text-sm uppercase tracking-wider">{title}</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Sidebar navigation">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to.split('/').length <= 2}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
