import React from 'react'
import CourseCard from './CourseCard'
import Spinner from '../common/Spinner'
import EmptyState from '../common/EmptyState'

function CourseGrid({ courses = [], loading = false }) {
  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <EmptyState
        title="No courses found"
        description="Try adjusting your filters or search query."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}

export default CourseGrid
