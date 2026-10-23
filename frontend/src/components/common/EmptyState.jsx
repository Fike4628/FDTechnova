import React from 'react'

/**
 * Empty state placeholder component
 */
function EmptyState({ title = 'Nothing here yet', description = '', action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <svg
        className="h-16 w-16 text-gray-300 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M24 8a16 16 0 100 32A16 16 0 0024 8zm0 0v4m0 24v4m16-20h-4M12 24H8"
        />
      </svg>
      <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  )
}

export default EmptyState
