import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiMonitor, FiAward, FiGlobe, FiPlay } from 'react-icons/fi'

const BADGES = [
  { icon: FiMonitor, text: 'Learn from experts' },
  { icon: FiAward,   text: 'Get a certificate of completion' },
  { icon: FiGlobe,   text: 'Online & physical classes' },
]

const STATS = [
  { value: '100+', label: 'Students' },
  { value: '5',    label: 'Courses' },
  { value: '100%', label: 'Practical' },
  { value: 'Sagure', label: 'Ethiopia' },
]

function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="FDTeknova Academy hero section"
    >
      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/courses/hero.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center scale-[1.02]"
          style={{ filter: 'brightness(0.45) saturate(0.9)' }}
        />
        {/* Primary dark gradient — strongest on left where text is */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(110deg, rgba(6,10,24,0.97) 0%, rgba(10,22,64,0.92) 40%, rgba(15,40,100,0.75) 65%, rgba(10,22,64,0.55) 100%)',
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: 'linear-gradient(to top, #0a0f1e 0%, transparent 100%)' }}
        />
        {/* Top fade */}
        <div
          className="absolute top-0 left-0 right-0 h-20"
          style={{ background: 'linear-gradient(to bottom, rgba(6,10,24,0.6) 0%, transparent 100%)' }}
        />
      </div>

      {/* ── Decorative glow blobs ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-20 right-10 h-64 w-64 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)', filter: 'blur(50px)' }}
        />
      </div>

      {/* ── Content ── */}
      <div className="container-xl relative z-10 pt-24 pb-32 lg:pt-32 lg:pb-36">
        <div className="max-w-3xl">

          {/* Tagline pill */}
          <div
            className="inline-flex items-center gap-2 mb-6 animate-fade-in-up"
            style={{ animationDelay: '0ms' }}
          >
            <span className="h-px w-8 bg-primary-400 inline-block" />
            <span className="text-primary-300 font-bold text-xs sm:text-sm tracking-[0.2em] uppercase">
              Learn • Practice • Grow
            </span>
          </div>

          {/* Main headline — maximum contrast */}
          <h1
            className="hero-heading font-extrabold leading-[1.08] mb-6 animate-fade-in-up"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
              animationDelay: '80ms',
            }}
          >
            <span className="block text-white mb-1">Welcome to</span>
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              FD Tech nova
            </span>
            <span className="block text-accent-400">Academy</span>
          </h1>

          {/* Sub-text — bright enough to read over dark overlay */}
          <p
            className="hero-text text-gray-100 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl animate-fade-in-up"
            style={{ animationDelay: '160ms' }}
          >
            Get practical tech and language skills for a better future. We offer quality training in
            <strong className="text-white font-semibold"> web design, video editing, graphic design,
            basic computer skills</strong> and <strong className="text-white font-semibold">English language</strong>
            &nbsp;— both online and in person.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-wrap gap-3 mb-10 animate-fade-in-up"
            style={{ animationDelay: '240ms' }}
          >
            <Link
              to="/courses"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 text-white font-bold rounded-xl
                         hover:bg-primary-500 transition-all duration-250 shadow-glow hover:shadow-glow
                         focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Explore Courses
              <FiArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 font-bold rounded-xl
                         border-2 border-white/40 text-white
                         hover:bg-white/12 hover:border-white/70
                         transition-all duration-250
                         focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Contact Us
            </Link>
          </div>

          {/* Feature badges */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 animate-fade-in-up"
            style={{ animationDelay: '320ms' }}
          >
            {BADGES.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="glass flex items-center gap-3 px-4 py-3 rounded-xl
                           hover:border-primary-400/40 hover:bg-white/10
                           transition-all duration-250 cursor-default"
              >
                <div className="h-9 w-9 rounded-lg bg-primary-600/40 flex items-center justify-center shrink-0 border border-primary-400/30">
                  <Icon size={16} className="text-accent-400" />
                </div>
                <span className="text-white text-sm font-semibold leading-tight hero-text">{text}</span>
              </div>
            ))}
          </div>

          {/* Stats strip */}
          <div
            className="flex flex-wrap gap-3 animate-fade-in-up"
            style={{ animationDelay: '400ms' }}
          >
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="glass-dark flex items-center gap-2.5 px-4 py-2.5 rounded-xl
                           hover:border-primary-500/50 transition-all duration-250"
              >
                <span className="text-white font-extrabold text-lg leading-none">{value}</span>
                <span className="text-primary-300 text-xs font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom wave transition ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full"
        >
          <path
            d="M0 64L1440 64L1440 0C1080 52 720 64 360 56C180 52 60 40 0 32L0 64Z"
            fill="#0a0f1e"
          />
        </svg>
      </div>
    </section>
  )
}

export default HeroSection
