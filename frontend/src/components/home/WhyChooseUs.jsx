import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { HiAcademicCap, HiCurrencyDollar, HiDesktopComputer, HiBadgeCheck, HiSupport, HiUserGroup } from 'react-icons/hi'

const REASONS = [
  { icon: HiAcademicCap,    title: 'Expert Instructors',    desc: 'Learn from experienced professionals passionate about teaching real-world skills.',          color: '#3b82f6' },
  { icon: HiCurrencyDollar, title: 'Affordable Pricing',    desc: 'High-quality education at accessible, transparent pricing with flexible payment options.', color: '#10b981' },
  { icon: HiDesktopComputer,title: 'Hands-on Training',     desc: 'Every course is built around real projects so you graduate with a portfolio.',               color: '#a855f7' },
  { icon: HiBadgeCheck,     title: 'Certificate',           desc: 'Earn a recognized certificate of completion to boost your career opportunities.',            color: '#f59e0b' },
  { icon: HiSupport,        title: 'Ongoing Support',       desc: 'We do not stop when class ends. Get guidance and support even after your training.',         color: '#ec4899' },
  { icon: HiUserGroup,      title: 'Online & Physical',     desc: 'Attend in-person in Sagure or join live online classes from anywhere in Ethiopia.',          color: '#06b6d4' },
]

function WhyChooseUs() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: '#060c1a' }}
    >
      {/* Center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.07) 0%, transparent 65%)' }}
      />

      <div className="container-xl relative z-10">
        <div className="text-center mb-12">
          <div className="section-label justify-center">
            <span className="glow-line" />
            Why Choose Us
            <span className="glow-line" />
          </div>
          <h2 className="section-title mx-auto mt-1">What Sets Us Apart</h2>
          <p className="section-subtitle mx-auto mt-3 text-center">
            We are committed to delivering practical, high-impact education that transforms lives in our community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {REASONS.map(({ icon: Icon, title, desc, color }, i) => (
            <div
              key={title}
              className="group relative rounded-2xl p-6 border transition-all duration-300
                         hover:-translate-y-1.5 cursor-default animate-fade-in-up"
              style={{
                animationDelay: `${i * 70}ms`,
                background: 'linear-gradient(145deg, #0d1426, #0a1020)',
                borderColor: `${color}18`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${color}45`
                e.currentTarget.style.boxShadow = `0 8px 32px ${color}18`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${color}18`
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Corner glow */}
              <div
                className="absolute top-0 right-0 h-24 w-24 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle, ${color}12 0%, transparent 70%)` }}
                aria-hidden="true"
              />
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <h3 className="font-bold text-white mb-2 group-hover:text-primary-300 transition-colors duration-200">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-200">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/courses" className="btn-primary mx-auto">
            Explore Our Courses <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
