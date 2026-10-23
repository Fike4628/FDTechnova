import React from 'react'

function CourseFilters({ filters, onChange, categories = [] }) {
  const levels = ['beginner', 'intermediate', 'advanced']

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-5">
        <h2 className="font-semibold text-gray-800">Filters</h2>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={filters.category || ''}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
          <select
            value={filters.level || ''}
            onChange={(e) => onChange({ ...filters, level: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Levels</option>
            {levels.map((lvl) => (
              <option key={lvl} value={lvl} className="capitalize">{lvl.charAt(0).toUpperCase() + lvl.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
          <select
            value={filters.price || ''}
            onChange={(e) => onChange({ ...filters, price: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Price</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* Reset */}
        <button
          onClick={() => onChange({})}
          className="w-full text-sm text-blue-600 hover:underline"
        >
          Reset Filters
        </button>
      </div>
    </aside>
  )
}

export default CourseFilters
