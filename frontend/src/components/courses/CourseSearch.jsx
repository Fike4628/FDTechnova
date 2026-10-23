import React, { useState } from 'react'

function CourseSearch({ onSearch, initialValue = '' }) {
  const [query, setQuery] = useState(initialValue)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2" role="search">
      <label htmlFor="course-search" className="sr-only">Search courses</label>
      <input
        id="course-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search courses..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  )
}

export default CourseSearch
