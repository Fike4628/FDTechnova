import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { HiAcademicCap, HiEye, HiHeart, HiLightBulb } from 'react-icons/hi'

const TEAM = [
  { name: 'Academy Director', role: 'Founder & Director', initial: 'D', color: 'bg-blue-100 text-blue-700', bio: 'Passionate about making quality tech education accessible in rural Ethiopia.' },
  { name: 'Lead Instructor', role: 'Web & Tech Instructor', initial: 'I', color: 'bg-purple-100 text-purple-700', bio: 'Experienced developer and educator committed to practical skills training.' },
  { name: 'Creative Instructor', role: 'Design & Media Instructor', initial: 'C', color: 'bg-pink-100 text-pink-700', bio: 'Professional designer with expertise in graphic design and video production.' },
]

const VALUES = [
  { icon: HiLightBulb, title: 'Practical Learning', desc: 'Every course is built around real-world projects and hands-on practice, not just theory.' },
  { icon: HiHeart, title: 'Community First', desc: 'We believe in building skills that strengthen our local community in Sagure and beyond.' },
  { icon: HiAcademicCap, title: 'Excellence', desc: 'We hold ourselves to high standards so every graduate is confident and job-ready.' },
  { icon: HiEye, title: 'Accessibility', desc: 'Quality education should be affordable and available to everyone who wants to learn.' },
]

function About() {
  return (
    <div>
      {/* Hero */}
      <div className="relative bg-hero-gradient text-white py-16 overflow-hidden">
        {/* Background image overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/courses/hero.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20"
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-700/70" />
        </div>
        <div className="container-xl relative z-10">
          <div className="section-label text-blue-300">
            <span className="h-px w-6 bg-blue-300 inline-block" />About Us
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 max-w-2xl">
            Empowering Learners in Sagure, Ethiopia
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            FD Tech nova Academy is a technology and skills training center dedicated to helping individuals gain practical skills for education, employment, and entrepreneurship.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-primary-50 rounded-2xl p-8 border border-primary-100">
              <div className="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                <HiAcademicCap size={24} className="text-primary-600" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To make high-quality, career-ready technology and language education accessible to everyone in Sagure, Oromia, and beyond — regardless of background or prior experience.
              </p>
              <ul className="mt-4 space-y-2">
                {['Practical, project-based learning', 'Affordable and flexible programs', 'Both online and in-person delivery', 'Ongoing student support'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <FiCheckCircle size={14} className="text-primary-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                <HiEye size={24} className="text-amber-600" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To grow FDTech nova Academy from a local training center in Sagure into a recognized technology education institution serving learners across Ethiopia and beyond — enabling every graduate to contribute to the digital economy.
              </p>
              <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200 text-center">
                <p className="text-primary-700 font-bold text-lg italic">Learn Skills.</p>
                <p className="text-accent-500 font-extrabold text-xl italic">Build Your Future.</p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-10">
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-card transition-all">
                <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-primary-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Story */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="section-title mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                FD Tech nova Academy was founded with a clear purpose: to bridge the gap between traditional education and the rapidly evolving technology sector in our community. Seeing the growing demand for digital skills in Sagure and across Oromia, we set out to create a training center where anyone — student, job seeker, or aspiring entrepreneur — could gain practical, job-ready skills.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We started with five core training areas — Web Design & Development, Video Editing, Graphic Design, Basic Computer Skills, and English Language — because these are the skills that open the most doors. Every course is designed around real-world practice, not just theory, because we believe the best way to learn is by doing.
              </p>
            </div>
          </div>

          {/* Team */}
          <div className="text-center mb-10">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle mx-auto mt-2">Passionate educators committed to your success.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {TEAM.map(({ name, role, initial, color, bio }) => (
              <div key={name} className="card p-6 text-center">
                <div className={`h-20 w-20 rounded-full ${color} flex items-center justify-center text-3xl font-extrabold mx-auto mb-4`}>
                  {initial}
                </div>
                <h3 className="font-bold text-gray-900">{name}</h3>
                <p className="text-primary-600 text-sm font-medium mb-2">{role}</p>
                <p className="text-gray-500 text-sm">{bio}</p>
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
    </div>
  )
}

export default About
