import React from 'react'
import { Link } from 'react-router-dom'
import { FiBookOpen, FiClock, FiBell, FiArrowRight, FiTrendingUp, FiCheckCircle } from 'react-icons/fi'
import { HiAcademicCap, HiClipboardList, HiCalendar, HiChartBar } from 'react-icons/hi'
import { useAuth } from '../../hooks/useAuth'

const MOCK_COURSES = [
  { id: 'web-design', title: 'Web Design & Development', progress: 65, color: 'bg-blue-500', nextLesson: 'JavaScript Functions', image: '/images/courses/web_design.png' },
  { id: 'english-language', title: 'English Language', progress: 40, color: 'bg-amber-500', nextLesson: 'Grammar: Tenses', image: '/images/courses/english_language.png' },
]

const MOCK_SCHEDULE = [
  { title: 'Web Design – JS Fundamentals', date: 'Today', time: '2:00 PM – 4:00 PM', type: 'Online' },
  { title: 'English Language – Speaking Practice', date: 'Tomorrow', time: '10:00 AM – 12:00 PM', type: 'Physical' },
]

const MOCK_ANNOUNCEMENTS = [
  { title: 'New React Module Available', time: '2 hours ago', icon: '📢' },
  { title: 'Assignment Deadline Extended', time: '1 day ago', icon: '📝' },
  { title: 'Welcome to FDTeknova Academy!', time: '3 days ago', icon: '🎉' },
]

function StatCard({ icon: Icon, value, label, to, color }) {
  return (
    <Link to={to} className={`${color} rounded-2xl p-5 flex items-start gap-4 hover:opacity-90 transition-opacity`}>
      <div className="h-11 w-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-3xl font-extrabold text-white leading-tight">{value}</p>
        <p className="text-white/80 text-sm font-medium mt-0.5">{label}</p>
      </div>
    </Link>
  )
}

function StudentDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-7">
      {/* Welcome */}
      <div className="bg-hero-gradient rounded-2xl p-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-blue-200 text-sm font-medium">Welcome back 👋</p>
          <h1 className="text-2xl font-extrabold text-white mt-0.5">{user?.name || 'Student'}</h1>
          <p className="text-blue-200 text-sm mt-1">Continue your learning journey today.</p>
        </div>
        <Link to="/courses" className="btn-secondary text-sm px-5 py-2.5 border-white/30 text-white hover:bg-white/10 shrink-0">
          Browse More Courses <FiArrowRight size={14} />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={HiAcademicCap} value="2" label="Enrolled Courses" to="/student/my-courses" color="bg-blue-600" />
        <StatCard icon={HiClipboardList} value="3" label="Assignments Due" to="/student/assignments" color="bg-amber-500" />
        <StatCard icon={HiChartBar} value="1" label="Results Ready" to="/student/results" color="bg-green-500" />
        <StatCard icon={HiCalendar} value="2" label="Upcoming Classes" to="/student/schedule" color="bg-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Courses */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-lg">My Courses</h2>
            <Link to="/student/my-courses" className="text-sm text-primary-600 hover:underline font-medium flex items-center gap-1">
              View all <FiArrowRight size={13} />
            </Link>
          </div>

          {MOCK_COURSES.map(course => (
            <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Course thumbnail */}
              <div className="relative overflow-hidden h-28">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  onError={e => {
                    e.target.style.display = 'none'
                    const fb = e.target.nextSibling
                    if (fb) fb.style.display = 'flex'
                  }}
                />
                <div
                  className={`absolute inset-0 ${course.color} items-center justify-center text-white font-extrabold text-2xl`}
                  style={{ display: 'none' }}
                  aria-hidden="true"
                >
                  {course.title[0]}
                </div>
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {course.progress}%
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{course.title}</h3>
                    <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1.5">
                      <FiBookOpen size={11} /> Next: {course.nextLesson}
                    </p>
                  </div>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${course.color} transition-all duration-500`}
                    style={{ width: `${course.progress}%` }}
                    role="progressbar"
                    aria-valuenow={course.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>

                <Link
                  to={`/student/learn/${course.id}`}
                  className="inline-flex items-center gap-1.5 text-primary-600 font-semibold text-sm hover:text-primary-800"
                >
                  Continue Learning <FiArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Upcoming schedule */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Upcoming Classes</h2>
              <Link to="/student/schedule" className="text-xs text-primary-600 hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {MOCK_SCHEDULE.map((s, i) => (
                <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="h-9 w-9 rounded-lg bg-primary-100 flex items-center justify-center shrink-0">
                    <FiClock size={14} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-xs leading-snug">{s.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{s.date} • {s.time}</p>
                    <span className={`text-xs font-medium ${s.type === 'Online' ? 'text-blue-600' : 'text-green-600'}`}>{s.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Announcements</h2>
              <FiBell size={16} className="text-gray-400" />
            </div>
            <div className="space-y-3">
              {MOCK_ANNOUNCEMENTS.map((a, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-xl">{a.icon}</span>
                  <div>
                    <p className="font-medium text-gray-800 text-xs">{a.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
