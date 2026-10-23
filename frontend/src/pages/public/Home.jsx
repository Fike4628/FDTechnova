import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import HeroSection from '../../components/home/HeroSection'
import FeaturedCourses from '../../components/home/FeaturedCourses'
import AboutSection from '../../components/home/AboutSection'
import WhyChooseUs from '../../components/home/WhyChooseUs'
import StatsSection from '../../components/home/StatsSection'
import Testimonials from '../../components/home/Testimonials'

function CTABanner() {
  return (
    <section
      className="relative py-16 lg:py-20 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1d4ed8 50%, #0a1628 100%)' }}
    >
      {/* Animated glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(96,165,250,0.15) 0%, transparent 60%)' }}
      />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-xl relative z-10 text-center">
        <div className="section-label justify-center mb-4">
          <span className="glow-line" />
          Start Today
          <span className="glow-line" />
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight hero-heading">
          Ready to Build<br/>Your Future?
        </h2>
        <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
          Join FD Tech nova Academy today and start your journey toward practical skills and better opportunities.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/courses"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-colors shadow-lg"
          >
            Browse Courses
            <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-accent-500 hover:bg-accent-400 text-white font-bold rounded-xl transition-colors shadow-lg"
          >
            Register Now — Free
            <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function Home() {
  return (
    <div style={{ background: '#0a0f1e' }}>
      <HeroSection />
      <StatsSection />
      <FeaturedCourses />
      <AboutSection />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
    </div>
  )
}

export default Home
