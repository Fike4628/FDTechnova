import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FiSearch, FiClock, FiArrowRight, FiFilter, FiUsers, FiX } from 'react-icons/fi'
import { HiCode, HiFilm, HiColorSwatch, HiDesktopComputer, HiBookOpen } from 'react-icons/hi'

const ALL_COURSES = [
  {
    id: 'web-design',
    title: 'Web Design & Development',
    description: 'Learn HTML, CSS, JavaScript and React to build professional websites. Covers responsive design, deployment, and best practices.',
    duration: '6–8 weeks', level: 'Beginner', category: 'Technology', mode: 'Both', price: 1500,
    icon: HiCode, accentColor: '#3b82f6', gradientFrom: '#1e3a8a', gradientTo: '#1d4ed8',
    image: '/images/courses/web_design.png',
    topics: ['HTML & CSS', 'Responsive Design', 'JavaScript', 'React', 'Deployment'],
  },
  {
    id: 'video-editing',
    title: 'Video Editing',
    description: 'Master professional video editing tools, transitions, audio sync, titles, and effects for social media and content creation.',
    duration: '4–6 weeks', level: 'Beginner', category: 'Creative', mode: 'Both', price: 1200,
    icon: HiFilm, accentColor: '#a855f7', gradientFrom: '#4c1d95', gradientTo: '#7c3aed',
    image: '/images/courses/vidieo_diting.png',
    topics: ['Editing Basics', 'Transitions', 'Audio Editing', 'Titles & FX', 'Social Media'],
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Learn design principles, typography, color theory, logo design, poster creation, and social media graphics.',
    duration: '4–6 weeks', level: 'Beginner', category: 'Creative', mode: 'Both', price: 1200,
    icon: HiColorSwatch, accentColor: '#ec4899', gradientFrom: '#831843', gradientTo: '#db2777',
    image: '/images/courses/graphic_design.png',
    topics: ['Design Principles', 'Typography', 'Color Theory', 'Logo & Brand', 'Social Media'],
  },
  {
    id: 'basic-computer',
    title: 'Basic Computer Skills',
    description: 'Learn computer fundamentals, keyboard skills, file management, internet use, and Microsoft Office applications.',
    duration: '3–4 weeks', level: 'Beginner', category: 'Fundamentals', mode: 'Physical', price: 800,
    icon: HiDesktopComputer, accentColor: '#10b981', gradientFrom: '#064e3b', gradientTo: '#059669',
    image: '/images/courses/basic_computer_skill.png',
    topics: ['Fundamentals', 'Typing', 'File Management', 'Internet & Email', 'Office Apps'],
  },
  {
    id: 'english-language',
    title: 'English Language',
    description: 'Improve your English grammar, vocabulary, speaking, listening, reading and writing for education and employment.',
    duration: '6–8 weeks', level: 'Beginner–Advanced', category: 'Language', mode: 'Both', price: 1000,
    icon: HiBookOpen, accentColor: '#f59e0b', gradientFrom: '#78350f', gradientTo: '#d97706',
    image: '/images/courses/english_language.png',
    topics: ['Grammar', 'Vocabulary', 'Speaking', 'Reading & Writing', 'Practical English'],
  },
]

const CATEGORIES = ['All', 'Technology', 'Creative', 'Fundamentals', 'Language']
const MODES = ['All', 'Physical', 'Online', 'Both']

function Courses() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState('All')
  const [mode, setMode] = useState('All')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = ALL_COURSES.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = !search || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.topics.some(t => t.toLowerCase().includes(q))
    const matchCat = category === 'All' || c.category === category
    const matchMode = mode === 'All' || c.mode === mode || c.mode === 'Both'
    return matchSearch && matchCat && matchMode
  })

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchParams(search ? { search } : {})
  }

  const clearFilters = () => { setSearch(''); setCategory('All'); setMode('All'); setSearchParams({}) }

  const activeFilters = (category !== 'All' ? 1 : 0) + (mode !== 'All' ? 1 : 0) + (search ? 1 : 0)

  return (
    <div style={{ background: '#0a0f1e', minHeight: '100vh' }}>
      {/* Hero banner */}
      <div
        className="relative overflow-hidden py-16 lg:py-20"
        style={{ background: 'linear-gradient(135deg, #060c1a 0%, #0d1f4e 60%, #1d4ed8 100%)' }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="container-xl relative z-10">
          <div className="section-label text-primary-300 mb-3">
            <span className="glow-line" />
            All Courses
          </div>
          <h1 className="section-title mb-3 hero-heading">Explore Our Courses</h1>
          <p className="text-blue-200 text-lg max-w-2xl hero-text">
            Practical, beginner-friendly courses in technology, design, and language —
            available online and in-person in Sagure, Ethiopia.
          </p>
        </div>
      </div>

      <div className="container-xl py-10">
        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6 max-w-2xl">
          <div className="relative flex-1">
            <FiSearch size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search courses by name, topic, or skill..."
              className="w-full pl-10 pr-4 py-3 bg-dark-500 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500
                         focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
              aria-label="Search courses"
            />
            {search && (
              <button type="button" onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                <FiX size={15} />
              </button>
            )}
          </div>
          <button type="submit" className="btn-primary px-5 py-3 text-sm">Search</button>
          <button
            type="button"
            onClick={() => setFiltersOpen(o => !o)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 lg:hidden
              ${filtersOpen ? 'bg-primary-600 border-primary-500 text-white' : 'bg-dark-500 border-white/10 text-gray-300 hover:border-white/25'}`}
          >
            <FiFilter size={15} />
            Filters {activeFilters > 0 && <span className="bg-accent-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{activeFilters}</span>}
          </button>
        </form>

        {/* Active filter chips */}
        {activeFilters > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {search && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-primary-600/20 border border-primary-500/30 text-primary-300 text-xs rounded-full font-medium">
                Search: {search}
                <button onClick={() => setSearch('')}><FiX size={11} /></button>
              </span>
            )}
            {category !== 'All' && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-primary-600/20 border border-primary-500/30 text-primary-300 text-xs rounded-full font-medium">
                {category}
                <button onClick={() => setCategory('All')}><FiX size={11} /></button>
              </span>
            )}
            {mode !== 'All' && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-primary-600/20 border border-primary-500/30 text-primary-300 text-xs rounded-full font-medium">
                {mode}
                <button onClick={() => setMode('All')}><FiX size={11} /></button>
              </span>
            )}
            <button onClick={clearFilters} className="px-3 py-1 text-gray-500 hover:text-white text-xs font-medium transition-colors">
              Clear all
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className={`lg:w-56 shrink-0 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
            <div
              className="rounded-2xl border border-white/8 p-5 sticky top-24"
              style={{ background: '#0d1426' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-white text-sm">Filters</h2>
                {activeFilters > 0 && (
                  <button onClick={clearFilters} className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                    Reset all
                  </button>
                )}
              </div>

              <div className="mb-5">
                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Category</p>
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setCategory(cat)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm mb-0.5 transition-all duration-150 ${
                      category === cat
                        ? 'bg-primary-600/25 text-primary-300 font-semibold border border-primary-500/30'
                        : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div>
                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Delivery Mode</p>
                {MODES.map(m => (
                  <button key={m} onClick={() => setMode(m)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm mb-0.5 transition-all duration-150 ${
                      mode === m
                        ? 'bg-primary-600/25 text-primary-300 font-semibold border border-primary-500/30'
                        : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Course grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                <span className="text-white font-bold">{filtered.length}</span> course{filtered.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 rounded-2xl border border-white/6" style={{ background: '#0d1426' }}>
                <p className="text-5xl mb-4">🔍</p>
                <p className="font-bold text-white text-lg">No courses found</p>
                <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filters.</p>
                <button onClick={clearFilters} className="mt-5 text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map((course, i) => {
                  const Icon = course.icon
                  return (
                    <Link
                      key={course.id}
                      to={`/courses/${course.id}`}
                      className="course-card-shine group flex flex-col rounded-2xl overflow-hidden border
                                 transition-all duration-300 hover:-translate-y-1.5
                                 focus:outline-none focus:ring-2 focus:ring-primary-500 animate-fade-in-up"
                      style={{
                        animationDelay: `${i * 60}ms`,
                        background: 'linear-gradient(145deg, #0d1426, #0a1020)',
                        borderColor: `${course.accentColor}22`,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = `${course.accentColor}55`
                        e.currentTarget.style.boxShadow = `0 12px 48px ${course.accentColor}22`
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = `${course.accentColor}22`
                        e.currentTarget.style.boxShadow = ''
                      }}
                    >
                      {/* Course image */}
                      <div className="relative overflow-hidden" style={{ height: '200px' }}>
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={e => {
                            e.target.style.display = 'none'
                            const fb = e.target.nextSibling
                            if (fb) fb.style.display = 'flex'
                          }}
                        />
                        {/* Fallback */}
                        <div
                          className="absolute inset-0 items-center justify-center"
                          style={{ display: 'none', background: `linear-gradient(135deg, ${course.gradientFrom}, ${course.gradientTo})` }}
                          aria-hidden="true"
                        >
                          <Icon size={56} style={{ color: course.accentColor, opacity: 0.7 }} />
                        </div>
                        {/* Overlay */}
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,15,30,0.85) 0%, transparent 50%)' }} />
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                            style={{ background: `${course.accentColor}22`, color: course.accentColor, border: `1px solid ${course.accentColor}44`, backdropFilter: 'blur(8px)' }}>
                            {course.category}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-black/40 text-gray-200 border border-white/15 backdrop-blur-sm">
                            {course.mode}
                          </span>
                        </div>
                        {/* Duration badge */}
                        <div className="absolute bottom-3 right-3">
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-black/60 text-gray-200 border border-white/15 backdrop-blur-sm">
                            <FiClock size={11} /> {course.duration}
                          </span>
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="flex flex-col flex-1 p-5">
                        {/* Accent line */}
                        <div className="h-0.5 w-8 rounded-full mb-3 group-hover:w-14 transition-all duration-300"
                             style={{ background: course.accentColor }} />

                        <div className="flex items-start gap-3 mb-2">
                          <div className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                               style={{ background: `${course.accentColor}18`, border: `1px solid ${course.accentColor}35` }}>
                            <Icon size={18} style={{ color: course.accentColor }} />
                          </div>
                          <h3 className="font-bold text-white text-base leading-snug group-hover:text-primary-300 transition-colors duration-200">
                            {course.title}
                          </h3>
                        </div>

                        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
                          {course.description}
                        </p>

                        {/* Topics */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {course.topics.slice(0, 3).map(t => (
                            <span key={t} className="px-2 py-0.5 rounded-lg text-xs font-medium text-gray-400 border border-white/8"
                                  style={{ background: '#ffffff08' }}>
                              {t}
                            </span>
                          ))}
                          {course.topics.length > 3 && (
                            <span className="px-2 py-0.5 rounded-lg text-xs font-medium text-gray-600 border border-white/6"
                                  style={{ background: '#ffffff05' }}>
                              +{course.topics.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/6">
                          <div>
                            <span className="font-extrabold text-white text-lg">
                              {course.price.toLocaleString()}
                            </span>
                            <span className="text-gray-500 text-xs ml-1">ETB</span>
                          </div>
                          <div
                            className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all duration-200"
                            style={{ color: course.accentColor }}
                          >
                            View Course
                            <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses
