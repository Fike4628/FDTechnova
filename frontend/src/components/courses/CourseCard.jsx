import React from 'react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/formatCurrency'

function CourseCard({ course }) {
  const {
    id,
    title,
    description,
    thumbnail,
    instructor,
    price,
    level,
    category,
    enrollmentCount,
  } = course

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <div className="aspect-video bg-gray-200 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-300 text-4xl font-bold">
            {title?.[0]}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        {category && (
          <span className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
            {category}
          </span>
        )}
        <h3 className="font-semibold text-gray-900 text-base leading-snug mb-1 line-clamp-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">{description}</p>
        )}

        <div className="mt-auto flex items-center justify-between">
          <div>
            {instructor && (
              <p className="text-xs text-gray-400">By {instructor.name}</p>
            )}
            {level && (
              <span className="text-xs text-gray-400 capitalize">{level}</span>
            )}
          </div>
          <span className="font-bold text-gray-900">
            {price === 0 ? 'Free' : formatCurrency(price)}
          </span>
        </div>

        {enrollmentCount !== undefined && (
          <p className="text-xs text-gray-400 mt-1">{enrollmentCount} students enrolled</p>
        )}

        <Link
          to={`/courses/${id}`}
          className="mt-4 block text-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
        >
          View Course
        </Link>
      </div>
    </article>
  )
}

export default CourseCard
