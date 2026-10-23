import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiStar } from 'react-icons/fi'

const TESTIMONIALS = [
  {
    name: 'Tesfaye A.',
    role: 'Web Design Student',
    initial: 'T',
    color: '#3b82f6',
    quote: 'The web design course at FDTeknova Academy helped me build my first website. The instructors are very supportive and patient.',
    rating: 5,
  },
  {
    name: 'Hanan M.',
    role: 'Video Editing Student',
    initial: 'H',
    color: '#a855f7',
    quote: 'I learned video editing from scratch and now I can create videos for my YouTube channel. The classes are practical and easy to follow.',
    rating: 5,
  },
  {
    name: 'Abebe K.',
    role: 'English Language Student',
    initial: 'A',
    color: '#f59e0b',
    quote: 'The English language course improved my speaking and confidence. I can now communicate better in my daily life and at work.',
    rating: 5,
  },
]

function Stars({ count = 5 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <FiStar key={i} size={13} className="fill-current text-accent-400" />
      ))}
    </div>
  )
}

function Testimonials() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: '#0a0f1e' }}
    >
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[600px] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <div className="section-label">
              <span className="glow-line" />
              What Our Students Say
            </div>
            <h2 className="section-title mt-1">Real People. Real Progress.</h2>
            <p className="section-subtitle mt-2">
              Hear from our students who have transformed their skills and careers.
            </p>
          </div>
          <Link to="/about" className="group inline-flex items-center gap-2 text-primary-400 font-semibold text-sm hover:text-primary-300 transition-colors shrink-0">
            View More
            <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, role, initial, color, quote, rating }, i) => (
            <div
              key={name}
              className="group relative flex flex-col gap-4 rounded-2xl p-6 border transition-all duration-300
                         hover:-translate-y-1.5 cursor-default animate-fade-in-up"
              style={{
                animationDelay: `${i * 100}ms`,
                background: 'linear-gradient(145deg, #0d1426, #0a1020)',
                borderColor: `${color}20`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${color}50`
                e.currentTarget.style.boxShadow = `0 8px 32px ${color}18`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${color}20`
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Quote mark */}
              <div className="text-5xl font-serif leading-none" style={{ color: `${color}35` }}>&ldquo;</div>

              <p className="text-gray-300 text-sm leading-relaxed flex-1 -mt-4">
                {quote}
              </p>

              <Stars count={rating} />

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/6">
                <div
                  className="h-11 w-11 rounded-full flex items-center justify-center font-extrabold text-lg border-2 shrink-0"
                  style={{ background: `${color}20`, color, borderColor: `${color}40` }}
                >
                  {initial}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{name}</p>
                  <p className="text-gray-500 text-xs">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
