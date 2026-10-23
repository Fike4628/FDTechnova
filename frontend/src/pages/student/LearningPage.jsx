import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi'
import Spinner from '../../components/common/Spinner'
import { lessonService } from '../../services/lessonService'
import { getCourseImage, getCourseColors } from '../../utils/courseData'

function LearningPage() {
  const { courseId } = useParams()
  const [lessons, setLessons] = useState([])
  const [activeLesson, setActiveLesson] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    lessonService.getByCourse(courseId).then((data) => {
      setLessons(data)
      if (data.length > 0) setActiveLesson(data[0])
    }).finally(() => setLoading(false))
  }, [courseId])

  if (loading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>

  return (
    <div className="flex gap-6 h-[calc(100vh-8rem)]">
      {/* Lesson Sidebar */}
      <aside className="w-64 shrink-0 bg-white border border-gray-100 rounded-xl overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-gray-800 text-sm">Course Lessons</h2>
        </div>
        <nav className="p-2 space-y-1">
          {lessons.map((lesson, i) => (
            <button
              key={lesson.id}
              onClick={() => setActiveLesson(lesson)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition ${
                activeLesson?.id === lesson.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="font-medium mr-2">{i + 1}.</span>
              {lesson.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-white border border-gray-100 rounded-xl overflow-y-auto p-6">
        {activeLesson ? (
          <>
            <h1 className="text-xl font-bold text-gray-900 mb-4">{activeLesson.title}</h1>
            {activeLesson.videoUrl && (
              <div className="aspect-video bg-gray-900 rounded-lg mb-6 overflow-hidden">
                <video
                  src={activeLesson.videoUrl}
                  controls
                  className="w-full h-full"
                  aria-label={`Video for ${activeLesson.title}`}
                />
              </div>
            )}
            {activeLesson.content && (
              <div className="prose prose-sm max-w-none text-gray-700">
                <p>{activeLesson.content}</p>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-center mt-10">Select a lesson to begin.</p>
        )}
      </div>
    </div>
  )
}

export default LearningPage
