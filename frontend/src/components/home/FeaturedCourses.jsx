import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiClock, FiUsers } from 'react-icons/fi'
import { HiCode, HiFilm, HiColorSwatch, HiDesktopComputer, HiBookOpen } from 'react-icons/hi'

const COURSES = [
  {
    id: 'web-design',
    title: 'Web Design & Development',
    description: 'Learn HTML, CSS, JavaScript and React to build professional responsive websites from scratch.',
    duration: '6–8 weeks',
    students: 32,
    icon: HiCode,
    accentColor: '#3b82f6',   // blue
    gradientFrom: '#1e3a8a',
    gradientTo:   '#1d4ed8',
    badge: 'Technology',
    image: '/images/courses/web_design.png',
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    description: 'Master editing tools, transitions, audio sync and create amazing social media videos.',
    duration: '4–6 weeks',
    students: 28,
    icon: HiFilm,
    accentColor: '#a855f7',   // purple
    gradientFrom: '#4c1d95',
    gradientTo:   '#7c3aed',
    badge: 'Creative',
    image: '/images/courses/vidieo_diting.png',
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Learn typography, color theory, logo design, posters and social media branding.',
    duration: '4–6 weeks',
    students: 24,
    icon: HiColorSwatch,
    accentColor: '#ec4899',   // pink
    gradientFrom: '#831843',
    gradientTo:   '#db2777',
    badge: 'Creative',
    image: '/images/courses/graphic_design.png',
  },
  {
    id: 'basic-computer',
    title: 'Basic Computer Skills',
    description: 'Learn typing, file management, internet usage, email and Microsoft Office apps.',
    duration: '3–4 weeks',
    students: 45,
    icon: HiDesktopComputer,
    accentColor: '#10b981',   // emerald
    gradientFrom: '#064e3b',
    gradientTo:   '#059669',
    badge: 'Fundamentals',
    image: '/images/courses/basic_computer_skill.png',
  },
  {
    id: 'english-language',
    title: 'English Language',
    description: 'Improve speaking, listening, grammar and writing for education and employment.',
    duration: '6–8 weeks',
    students: 38,
    icon: HiBookOpen,
    accentColor: '#f59e0b',   // amber
    gradientFrom: '#78350f',
    gradientTo:   '#d97706',
    badge: 'Language',
    image: '/images/courses/english_language.png',
  },
]

function CourseCard({ course, index }) {
  const Icon = course.icon

  return (
    <Link
      to={`/courses/${course.id}`}
      className="course-card-shine group relative flex flex-col rounded-2xl overflow-hidden
                 border border-white/8 bg-dark-600
                 hover:border-opacity-60 hover:-translate-y-2
                 transition-all duration-350 shadow-card hover:shadow-card-hover
                 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-transparent
                 animate-fade-in-up"
      style={{
        animationDelay: `${index * 80}ms`,
        borderColor: `${course.accentColor}22`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${course.accentColor}55`
        e.currentTarget.style.boxShadow = `0 12px 48px 0 ${course.accentColor}30`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${course.accentColor}22`
        e.currentTarget.style.boxShadow = ''
      }}
      aria-label={`View ${course.title} course`}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-44 sm:h-48">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          style={{ '--tw-scale-x': 1, '--tw-scale-y': 1 }}
          onError={e => {
            e.target.style.display = 'none'
            const fb = e.target.nextSibling
            if (fb) fb.style.display = 'flex'
          }}
        />
        {/* Colour fallback */}
        <div
          className="absolute inset-0 items-center justify-center"
          style={{
            display: 'none',
            background: `linear-gradient(135deg, ${course.gradientFrom}, ${course.gradientTo})`,
          }}
          aria-hidden="true"
        >
          <Icon size={52} style={{ color: course.accentColor, opacity: 0.7 }} />
        </div>
        {/* Bottom gradient overlay on image */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, rgba(10,15,30,0.85) 0%, transparent 55%)`,
          }}
        />
        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
            style={{
              background: `${course.accentColor}25`,
              color: course.accentColor,
              border: `1px solid ${course.accentColor}50`,
              backdropFilter: 'blur(8px)',
            }}
          >
            {course.badge}
          </span>
        </div>
        {/* Icon circle bottom-right */}
        <div
          className="absolute bottom-3 right-3 h-9 w-9 rounded-xl flex items-center justify-center shadow-lg"
          style={{ background: `${course.accentColor}30`, border: `1px solid ${course.accentColor}50` }}
        >
          <Icon size={18} style={{ color: course.accentColor }} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Top accent line */}
        <div
          className="h-0.5 w-8 rounded-full mb-3 transition-all duration-300 group-hover:w-16"
          style={{ background: course.accentColor }}
        />

        <h3 className="font-bold text-white text-base leading-snug mb-2 group-hover:text-primary-300 transition-colors duration-200">
          {course.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
          {course.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1.5">
            <FiClock size={12} style={{ color: course.accentColor }} />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <FiUsers size={12} style={{ color: course.accentColor }} />
            {course.students} students
          </span>
        </div>

        {/* CTA */}
        <div
          className="flex items-center gap-1.5 text-sm font-semibold
                     group-hover:gap-2.5 transition-all duration-200"
          style={{ color: course.accentColor }}
        >
          Learn More
          <FiArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform duration-200"
          />
        </div>
      </div>
    </Link>
  )
}

function FeaturedCourses() {
  return (
    <section className="relative section-padding" style={{ background: '#0a0f1e' }}>
      {/* Background blue glow at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-[600px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-5">
          <div>
            <div className="section-label">
              <span className="glow-line" />
              Our Courses
            </div>
            <h2 className="section-title mt-1">Build In-Demand Skills</h2>
            <p className="section-subtitle mt-3">
              Beginner-friendly, practical courses designed to give you real skills
              and open real doors — in Sagure, Ethiopia and online.
            </p>
          </div>

          <Link
            to="/courses"
            className="group inline-flex items-center gap-2 text-primary-400 font-semibold text-sm
                       hover:text-primary-300 transition-colors shrink-0 whitespace-nowrap"
          >
            View All Courses
            <FiArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Course cards — responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {COURSES.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>

        {/* Bottom CTA band */}
        <div
          className="mt-14 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5 px-6 py-5 sm:px-8 sm:py-6
                     border border-primary-700/30"
          style={{ background: 'linear-gradient(135deg, #0d1f4e 0%, #0a1628 100%)' }}
        >
          <div>
            <p className="text-white font-bold text-lg leading-tight">Not sure which course to pick?</p>
            <p className="text-gray-400 text-sm mt-0.5">We will help you choose the right one for your goals.</p>
          </div>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-xl
                       hover:bg-primary-500 transition-all duration-200 shadow-glow-sm hover:shadow-glow shrink-0"
          >
            Talk to Us
            <FiArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCourses
