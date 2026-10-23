import React from 'react'
import { HiUserGroup, HiBookOpen, HiStar, HiLocationMarker } from 'react-icons/hi'

const STATS = [
  { icon: HiUserGroup,      value: '100+',   label: 'Students Enrolled',      sub: 'Target — First Year',          color: '#3b82f6' },
  { icon: HiBookOpen,       value: '5',       label: 'Courses',                sub: 'Practical & Industry-Focused', color: '#a855f7' },
  { icon: HiStar,           value: '100%',    label: 'Practical Focus',        sub: 'Hands-on learning approach',   color: '#f59e0b' },
  { icon: HiLocationMarker, value: 'Sagure',  label: 'Our Location',           sub: 'Arsi Zone, Oromia, Ethiopia',  color: '#10b981' },
]

function StatsSection() {
  return (
    <section
      className="py-12 lg:py-14 relative overflow-hidden"
      style={{ background: '#060c1a' }}
    >
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #2563eb55, #7c3aed55, #2563eb55, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #2563eb33, transparent)' }} />

      <div className="container-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STATS.map(({ icon: Icon, value, label, sub, color }, i) => (
            <div
              key={label}
              className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4
                         rounded-2xl px-5 py-5 border transition-all duration-300
                         hover:-translate-y-1 cursor-default animate-fade-in-up"
              style={{
                animationDelay: `${i * 80}ms`,
                background: 'linear-gradient(145deg, #0d1426, #0a1020)',
                borderColor: `${color}18`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${color}45`
                e.currentTarget.style.boxShadow = `0 8px 32px ${color}20`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${color}18`
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${color}18`, border: `1px solid ${color}35` }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <div>
                <p className="text-white font-extrabold text-2xl lg:text-3xl leading-tight"
                   style={{ textShadow: `0 0 20px ${color}40` }}>
                  {value}
                </p>
                <p className="text-gray-300 text-sm font-semibold leading-tight">{label}</p>
                <p className="text-gray-600 text-xs mt-0.5 hidden sm:block">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
