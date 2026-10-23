import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

const INSTRUCTORS = [
  {
    name: 'Web Development Instructor',
    specialty: 'Web Design & Development',
    initial: 'W',
    color: 'bg-blue-100 text-blue-700',
    bio: 'Experienced web developer specializing in HTML, CSS, JavaScript, and React. Passionate about teaching practical coding skills.',
    courses: ['Web Design & Development'],
    experience: '3+ years teaching',
  },
  {
    name: 'Creative Media Instructor',
    specialty: 'Video Editing & Graphic Design',
    initial: 'C',
    color: 'bg-purple-100 text-purple-700',
    bio: 'Professional designer and video editor with experience in content creation, branding, and digital media production.',
    courses: ['Video Editing', 'Graphic Design'],
    experience: '5+ years industry',
  },
  {
    name: 'Computer Skills Instructor',
    specialty: 'Basic Computer & IT',
    initial: 'T',
    color: 'bg-emerald-100 text-emerald-700',
    bio: 'IT professional dedicated to empowering beginners with foundational computer literacy and digital skills.',
    courses: ['Basic Computer Skills'],
    experience: '4+ years teaching',
  },
  {
    name: 'English Language Instructor',
    specialty: 'English Language',
    initial: 'E',
    color: 'bg-amber-100 text-amber-700',
    bio: 'Certified English language instructor with a focus on practical communication skills for everyday and professional use.',
    courses: ['English Language'],
    experience: '6+ years teaching',
  },
]

function Instructors() {
  return (
    <div>
      <div className="bg-hero-gradient text-white py-14">
        <div className="container-xl">
          <div className="section-label text-blue-300">
            <span className="h-px w-6 bg-blue-300 inline-block" />Our Team
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">Meet Our Instructors</h1>
          <p className="text-blue-200 text-lg max-w-xl">
            Learn from experienced professionals who are passionate about teaching practical, real-world skills.
          </p>
        </div>
      </div>

      <div className="container-xl section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {INSTRUCTORS.map(inst => (
            <div key={inst.name} className="card p-6 flex gap-5">
              <div className={`h-16 w-16 rounded-2xl ${inst.color} flex items-center justify-center font-extrabold text-2xl shrink-0`}>
                {inst.initial}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-base">{inst.name}</h3>
                <p className={`text-sm font-semibold mb-1 ${inst.color.split(' ')[1]}`}>{inst.specialty}</p>
                <p className="text-gray-400 text-xs mb-3">{inst.experience}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{inst.bio}</p>
                <div className="flex flex-wrap gap-1.5">
                  {inst.courses.map(c => (
                    <span key={c} className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-lg">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary-50 rounded-2xl p-8 text-center border border-primary-100">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Want to Join Our Team?</h3>
          <p className="text-gray-600 text-sm mb-5 max-w-md mx-auto">
            We're always looking for experienced instructors to help us grow our course offerings. Get in touch to learn more.
          </p>
          <Link to="/contact" className="btn-primary mx-auto">
            Contact Us <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Instructors
