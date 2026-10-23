import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiBookOpen } from 'react-icons/fi'
import Spinner from '../../components/common/Spinner'
import EmptyState from '../../components/common/EmptyState'
import { studentService } from '../../services/studentService'

// Map course IDs to local images so enrolled courses show thumbnails
const COURSE_IMAGES = {
  'web-design': '/images/courses/web_design.png',
  'video-editing': '/images/courses/vidieo_diting.png',
  'graphic-design': '/images/courses/graphic_design.png',
  'basic-computer': '/images/courses/basic_computer_skill.png',
  'english-language': '/images/courses/english_language.png',
}

const COURSE_COLORS = {
  'web-design': 'bg-blue-500',
  'video-editing': 'bg-purple-500',
  'graphic-design': 'bg-pink-500',
  'basic-computer': 'bg-emerald-500',
  'english-language': 'bg-amber-500',
}

function MyCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    studentService.getMyCourses().then(setCourses).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">My Courses</h1>
          <p className="text-gray-500 text-sm mt-0.5">Track your progress and continue learning</p>
        </div>
        <Link to="/courses" className="btn-primary text-sm px-4 py-2.5">
          Browse More
        </Link>
      </div>

      {courses.length === 0 ? (
        <EmptyState
          title="No courses yet"
          description="You have not enrolled in any courses. Browse the catalogue to get started."
          action={
            <Link to="/courses" className="btn-primary">
              Browse Courses <FiArrowRight size={16} />
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const image = COURSE_IMAGES[course.id]
            const fallbackColor = COURSE_COLORS[course.id] || 'bg-primary-500'
            const progress = course.progress || 0

            return (
              <div key={course.id} className="card flex flex-col group">
                {/* Thumbnail */}
                <div className="relative overflow-hidden aspect-video">
                  {image ? (
                    <>
                      <img
                        src={image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={e => {
                          e.target.style.display = 'none'
                          const fb = e.target.nextSibling
                          if (fb) fb.style.display = 'flex'
                        }}
                      />
                      <div
                        className={`absolute inset-0 ${fallbackColor} items-center justify-center text-white text-4xl font-extrabold`}
                        style={{ display: 'none' }}
                        aria-hidden="true"
                      >
                        {course.title?.[0]}
                      </div>
                    </>
                  ) : (
                    <div className={`w-full h-full ${fallbackColor} flex items-center justify-center text-white text-4xl font-extrabold`}>
                      {course.title?.[0]}
                    </div>
                  )}

                  {/* Progress pill overlay */}
                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {progress}% complete
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 mb-1 leading-snug">{course.title}</h3>

                  {course.nextLesson && (
                    <p className="text-gray-400 text-xs mb-3 flex items-center gap-1.5">
                      <FiBookOpen size={11} /> Next: {course.nextLesson}
                    </p>
                  )}

                  {/* Progress bar */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-gray-400">Progress</span>
                      <span className="text-xs font-semibold text-gray-700">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${fallbackColor} transition-all duration-500`}
                        style={{ width: `${progress}%` }}
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>

                  <Link
                    to={`/student/learn/${course.id}`}
                    className="mt-4 btn-primary w-full justify-center text-sm py-2.5"
                  >
                    Continue Learning <FiArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyCourses
