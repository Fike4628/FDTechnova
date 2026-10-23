import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { HiLightBulb, HiUserGroup, HiAcademicCap, HiDesktopComputer } from 'react-icons/hi'

const FEATURES = [
  { icon: HiDesktopComputer, title: 'Practical Training',      desc: 'Real projects, real skills.' },
  { icon: HiUserGroup,       title: 'Flexible Learning',       desc: 'Online and physical options.' },
  { icon: HiLightBulb,       title: 'Supportive Community',    desc: 'Learn, share, grow together.' },
  { icon: HiAcademicCap,     title: 'Experienced Instructors', desc: 'Learn from professionals.' },
]

const WHY_US = [
  'Experienced and friendly instructors',
  'Affordable and flexible payment options',
  'Hands-on practical training',
  'Certificate of completion',
  'Support even after training',
]

function AboutSection() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: '#0a0f1e' }}
    >
      {/* Subtle right-side glow */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-0 w-96 h-96 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="container-xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Image */}
          <div className="relative animate-fade-in-up order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/8 aspect-[4/3]"
                 style={{ background: '#0d1426' }}>
              {/* Gradient behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-dark-800" />
              <img
                src="/images/courses/hero.png"
                alt="Students learning at FDTeknova Academy"
                className="relative w-full h-full object-cover"
                onError={e => { e.target.style.display = 'none' }}
              />
              {/* Image overlay */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top right, rgba(10,15,30,0.5) 0%, transparent 60%)' }} />
            </div>

            {/* Floating accent card */}
            <div
              className="absolute -bottom-5 -right-5 rounded-2xl p-4 shadow-xl text-white text-center hidden sm:block
                         border border-primary-500/30"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #1e3a8a)' }}
            >
              <p className="font-extrabold text-3xl leading-tight text-accent-400">5+</p>
              <p className="text-xs font-medium leading-tight text-blue-200 mt-0.5">Years of<br/>Excellence</p>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2 animate-fade-in-up" style={{ animationDelay: '120ms' }}>
            <div className="section-label">
              <span className="glow-line" />
              About FD Technova Academy
            </div>
            <h2 className="section-title mt-1 mb-5">Your Skills,<br/>Our Mission</h2>
            <p className="text-gray-400 leading-relaxed mb-6 text-base">
              FD Tech nova Academy is a technology and skills training center based in Sagure, Ethiopia.
              We are committed to providing accessible, high-quality education that helps individuals
              grow personally and professionally.
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-3 mb-7">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 rounded-xl p-4 border border-white/6 transition-all duration-250
                             hover:border-primary-500/30 hover:bg-primary-600/5 cursor-default"
                  style={{ background: '#0d1426' }}
                >
                  <div className="h-9 w-9 rounded-lg bg-primary-600/20 border border-primary-500/25 flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-primary-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Why Choose Us box */}
            <div
              className="rounded-2xl border border-white/8 p-5 mb-7"
              style={{ background: '#0d1426' }}
            >
              <p className="font-bold text-white mb-3">Why Choose Us?</p>
              <ul className="space-y-2">
                {WHY_US.map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-400">
                    <FiCheckCircle size={14} className="text-primary-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-white/8">
                <p className="text-primary-400 font-bold text-lg italic">Learn Today,</p>
                <p className="text-accent-400 font-extrabold text-xl italic">Build Tomorrow.</p>
              </div>
            </div>

            <Link to="/about" className="btn-primary">
              Learn More About Us <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
