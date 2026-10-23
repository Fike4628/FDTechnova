import React from 'react'

/**
 * Pagination component
 * @param {number} currentPage - 1-based current page
 * @param {number} totalPages
 * @param {function} onPageChange
 */
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded border text-sm disabled:opacity-40 hover:bg-gray-100 transition"
        aria-label="Previous page"
      >
        &laquo;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`px-3 py-1.5 rounded border text-sm transition ${
            page === currentPage
              ? 'bg-blue-600 text-white border-blue-600'
              : 'hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded border text-sm disabled:opacity-40 hover:bg-gray-100 transition"
        aria-label="Next page"
      >
        &raquo;
      </button>
    </nav>
  )
}

export default Pagination
