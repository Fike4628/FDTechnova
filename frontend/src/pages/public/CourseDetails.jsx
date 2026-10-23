import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FiClock, FiUsers, FiCheckCircle, FiArrowLeft, FiArrowRight, FiMonitor, FiMapPin } from 'react-icons/fi'
import { HiCode, HiFilm, HiColorSwatch, HiDesktopComputer, HiBookOpen } from 'react-icons/hi'
import { useAuth } from '../../hooks/useAuth'

const COURSES_MAP = {
  'web-design': {
    id: 'web-design',
    title: 'Web Design & Development',
    description: 'Build professional websites from scratch. This course takes you from the fundamentals of HTML and CSS all the way to building and deploying interactive websites with JavaScript and React.',
    category: 'Technology',
    level: 'Beginner',
    duration: '6–8 weeks',
    mode: 'Online & Physical',
    price: 1500,
    currency: 'ETB',
    enrolled: 32,
    icon: HiCode,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    image: '/images/courses/web_design.png',
    instructor: { name: 'Instructor TBD', specialty: 'Web Development', bio: 'Experienced web developer with industry background.' },
    objectives: [
      'Build websites using HTML, CSS, and JavaScript',
      'Create responsive layouts for mobile and desktop',
      'Understand React component architecture',
      'Deploy websites to production hosting',
      'Follow web development best practices',
    ],
    syllabus: [
      { week: 'Week 1–2', topic: 'HTML & CSS Foundations', details: 'Structure, styling, box model, flexbox, grid' },
      { week: 'Week 3–4', topic: 'Responsive Web Design', details: 'Mobile-first, media queries, frameworks' },
      { week: 'Week 5–6', topic: 'JavaScript Fundamentals', details: 'Variables, functions, DOM manipulation' },
      { week: 'Week 7–8', topic: 'React & Deployment', details: 'Components, props, state, hosting' },
    ],
  },
  'video-editing': {
    id: 'video-editing',
    title: 'Video Editing',
    description: 'Learn professional video editing from scratch. Master industry-standard tools to cut, color, add effects, sync audio, and create compelling videos for social media and professional use.',
    category: 'Creative',
    level: 'Beginner',
    duration: '4–6 weeks',
    mode: 'Online & Physical',
    price: 1200,
    currency: 'ETB',
    enrolled: 28,
    icon: HiFilm,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    image: '/images/courses/vidieo_diting.png',
    instructor: { name: 'Instructor TBD', specialty: 'Video Production', bio: 'Professional video editor with years of experience.' },
    objectives: [
      'Edit video clips, cuts, and transitions professionally',
      'Sync and mix audio tracks',
      'Add titles, captions, and visual effects',
      'Color grade and enhance footage',
      'Export for YouTube, Instagram, and other platforms',
    ],
    syllabus: [
      { week: 'Week 1', topic: 'Introduction to Video Editing', details: 'Software overview, interface, importing media' },
      { week: 'Week 2–3', topic: 'Cutting & Transitions', details: 'Timeline editing, cuts, transitions, pacing' },
      { week: 'Week 4', topic: 'Audio & Effects', details: 'Audio sync, music, sound effects, visual effects' },
      { week: 'Week 5–6', topic: 'Social Media Production', details: 'Formats, export settings, final projects' },
    ],
  },
  'graphic-design': {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Learn the fundamentals of graphic design — from design principles and typography to creating logos, posters, banners, and social media graphics using professional tools.',
    category: 'Creative',
    level: 'Beginner',
    duration: '4–6 weeks',
    mode: 'Online & Physical',
    price: 1200,
    currency: 'ETB',
    enrolled: 24,
    icon: HiColorSwatch,
    color: 'bg-pink-500',
    lightColor: 'bg-pink-50',
    textColor: 'text-pink-600',
    image: '/images/courses/graphic_design.png',
    instructor: { name: 'Instructor TBD', specialty: 'Graphic Design', bio: 'Creative designer with branding and print experience.' },
    objectives: [
      'Understand design principles and visual hierarchy',
      'Apply typography and color theory effectively',
      'Design logos, posters, and banners',
      'Create social media graphics and branding',
      'Build a design portfolio',
    ],
    syllabus: [
      { week: 'Week 1', topic: 'Design Principles & Color', details: 'Balance, contrast, hierarchy, color theory' },
      { week: 'Week 2', topic: 'Typography', details: 'Font selection, pairing, legibility' },
      { week: 'Week 3–4', topic: 'Logo & Branding', details: 'Logo design process, brand identity' },
      { week: 'Week 5–6', topic: 'Social Media & Print', details: 'Templates, posters, export for print and digital' },
    ],
  },
  'basic-computer': {
    id: 'basic-computer',
    title: 'Basic Computer Skills',
    description: 'A complete beginner\'s course covering computer fundamentals, typing, file management, internet browsing, email, and Microsoft Office applications for everyday use.',
    category: 'Fundamentals',
    level: 'Beginner',
    duration: '3–4 weeks',
    mode: 'Physical',
    price: 800,
    currency: 'ETB',
    enrolled: 45,
    icon: HiDesktopComputer,
    color: 'bg-emerald-500',
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    image: '/images/courses/basic_computer_skill.png',
    instructor: { name: 'Instructor TBD', specialty: 'Computer Literacy', bio: 'IT professional and educator with community focus.' },
    objectives: [
      'Understand how computers work and are used',
      'Type efficiently using keyboard shortcuts',
      'Manage files and folders on a computer',
      'Browse the internet and use email safely',
      'Use Microsoft Word, Excel, and PowerPoint',
    ],
    syllabus: [
      { week: 'Week 1', topic: 'Computer Fundamentals', details: 'Hardware, software, operating systems' },
      { week: 'Week 2', topic: 'Typing & File Management', details: 'Keyboard skills, file organization' },
      { week: 'Week 3', topic: 'Internet & Email', details: 'Browsing, email setup, digital safety' },
      { week: 'Week 4', topic: 'Microsoft Office', details: 'Word, Excel basics, PowerPoint presentations' },
    ],
  },
  'english-language': {
    id: 'english-language',
    title: 'English Language',
    description: 'A structured English language course covering grammar, vocabulary, speaking, listening, reading, and writing — from beginner through advanced levels for education and employment.',
    category: 'Language',
    level: 'Beginner to Advanced',
    duration: '6–8 weeks',
    mode: 'Online & Physical',
    price: 1000,
    currency: 'ETB',
    enrolled: 38,
    icon: HiBookOpen,
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    image: '/images/courses/english_language.png',
    instructor: { name: 'Instructor TBD', specialty: 'English Language', bio: 'Certified English instructor with teaching experience.' },
    objectives: [
      'Build strong grammar and vocabulary foundations',
      'Communicate confidently in spoken English',
      'Improve listening comprehension',
      'Read and write clearly in English',
      'Use English effectively in daily and professional life',
    ],
    syllabus: [
      { week: 'Week 1–2', topic: 'Grammar & Vocabulary', details: 'Tenses, sentence structure, word building' },
      { week: 'Week 3–4', topic: 'Speaking & Listening', details: 'Conversation, pronunciation, comprehension exercises' },
      { week: 'Week 5–6', topic: 'Reading & Writing', details: 'Comprehension, essay writing, letter writing' },
      { week: 'Week 7–8', topic: 'Practical English', details: 'Job interviews, presentations, daily communication' },
    ],
  },
}

function CourseDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [enrolling, setEnrolling] = useState(false)
  const [enrolled, setEnrolled] = useState(false)

  const course = COURSES_MAP[id]

  if (!course) {
    return (
      <div className="container-xl py-20 text-center">
        <p className="text-6xl mb-4">😕</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h1>
        <p className="text-gray-500 mb-6">The course you are looking for does not exist.</p>
        <Link to="/courses" className="btn-primary">Browse All Courses</Link>
      </div>
    )
  }

  const Icon = course.icon

  const handleEnroll = () => {
    if (!user) return navigate('/register')
    setEnrolling(true)
    setTimeout(() => { setEnrolling(false); setEnrolled(true) }, 1200)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top banner */}
      <div className={`${course.color} text-white`}>
        <div className="container-xl py-0 pb-0">
          {/* Course hero image */}
          <div className="relative overflow-hidden" style={{ maxHeight: '320px' }}>
            <img
              src={course.image}
              alt={course.title}
              className="w-full object-cover object-center"
              style={{ maxHeight: '320px' }}
              onError={e => { e.target.style.display = 'none' }}
            />
            {/* Gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            {/* Back link on image */}
            <div className="absolute top-5 left-0 right-0 container-xl">
              <Link to="/courses" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <FiArrowLeft size={15} /> Back to Courses
              </Link>
            </div>
            {/* Course info overlay */}
            <div className="absolute bottom-0 left-0 right-0 container-xl pb-8">
              <div className="flex items-start gap-5">
                <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/30">
                  <Icon size={28} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="badge bg-white/20 text-white backdrop-blur-sm">{course.category}</span>
                    <span className="badge bg-white/20 text-white backdrop-blur-sm">{course.level}</span>
                  </div>
                  <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-sm">{course.title}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-white/80">
                    <span className="flex items-center gap-1.5"><FiClock size={14} />{course.duration}</span>
                    <span className="flex items-center gap-1.5"><FiUsers size={14} />{course.enrolled} students enrolled</span>
                    <span className="flex items-center gap-1.5">
                      {course.mode.includes('Physical') ? <FiMapPin size={14} /> : <FiMonitor size={14} />}
                      {course.mode}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-xl py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 text-lg mb-3">About This Course</h2>
              <p className="text-gray-600 leading-relaxed">{course.description}</p>
            </div>

            {/* Learning objectives */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 text-lg mb-4">What You Will Learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FiCheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-700">{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Syllabus */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Course Syllabus</h2>
              <div className="space-y-3">
                {course.syllabus.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="shrink-0">
                      <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${course.lightColor} ${course.textColor} font-bold text-sm`}>
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.week}: {item.topic}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Your Instructor</h2>
              <div className="flex items-start gap-4">
                <div className={`h-14 w-14 rounded-full ${course.lightColor} ${course.textColor} flex items-center justify-center font-bold text-xl shrink-0`}>
                  {course.instructor.name[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{course.instructor.name}</p>
                  <p className={`text-sm ${course.textColor} font-medium mb-1`}>{course.instructor.specialty}</p>
                  <p className="text-gray-500 text-sm">{course.instructor.bio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden sticky top-24">
              {/* Sidebar thumbnail */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
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
                  className={`absolute inset-0 ${course.color} items-center justify-center`}
                  style={{ display: 'none' }}
                  aria-hidden="true"
                >
                  <Icon size={40} className="text-white opacity-70" />
                </div>
              </div>

              <div className="p-6">
              <div className="text-center mb-6">
                <p className="text-4xl font-extrabold text-gray-900">{course.price.toLocaleString()} <span className="text-lg font-bold text-gray-500">{course.currency}</span></p>
                <p className="text-gray-400 text-sm mt-1">One-time payment</p>
              </div>

              <div className="space-y-3 mb-6 text-sm">
                {[
                  ['Duration', course.duration],
                  ['Level', course.level],
                  ['Delivery', course.mode],
                  ['Category', course.category],
                  ['Students Enrolled', `${course.enrolled}+`],
                ].map(([label, val]) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-semibold text-gray-900">{val}</span>
                  </div>
                ))}
              </div>

              {enrolled ? (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-center text-sm font-semibold">
                  &#x2705; Enrollment request submitted! We will contact you shortly.
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="btn-primary w-full justify-center text-base py-3.5"
                >
                  {enrolling ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">Enroll Now <FiArrowRight size={16} /></span>
                  )}
                </button>
              )}

              <p className="text-xs text-gray-400 text-center mt-3">
                Not sure? <Link to="/contact" className="text-primary-600 hover:underline">Contact us first</Link>
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails
