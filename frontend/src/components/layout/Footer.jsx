import React from 'react'
import { Link } from 'react-router-dom'
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiLinkedin, FiMapPin, FiPhone, FiMail, FiArrowRight } from 'react-icons/fi'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#060c1a' }}>
      {/* Top CTA bar */}
      <div
        className="border-b border-white/6"
        style={{ background: 'linear-gradient(135deg, #0d1f4e 0%, #1d4ed8 50%, #0d1f4e 100%)' }}
      >
        <div className="container-xl py-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-white font-extrabold text-xl">Ready to start learning?</p>
            <p className="text-blue-200 text-sm mt-0.5">
              Join hundreds of students building real skills in Sagure, Ethiopia.
            </p>
          </div>
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 shrink-0 px-6 py-3 bg-white text-primary-700 font-bold rounded-xl
                       hover:bg-primary-50 transition-colors shadow-lg"
          >
            Start Learning Today
            <FiArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-xl py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="h-10 w-10 rounded-xl overflow-hidden border border-primary-500/30 shrink-0">
                <img
                  src="/images/courses/logo.png"
                  alt="FDTeknova Academy"
                  className="w-full h-full object-cover"
                  onError={e => {
                    e.target.parentElement.className = 'h-10 w-10 bg-primary-700 rounded-xl flex items-center justify-center shrink-0'
                    e.target.outerHTML = '<span class="text-white font-extrabold text-sm">FD</span>'
                  }}
                />
              </div>
              <div>
                <p className="text-white font-extrabold text-base leading-tight group-hover:text-primary-300 transition-colors">FD Tech nova</p>
                <p className="text-gray-600 text-xs leading-tight uppercase tracking-widest">Academy</p>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Learn Skills. Build Your Future.<br/>
              Practical tech and language training in Sagure, Ethiopia — online and in person.
            </p>
            {/* Social */}
            <div className="flex items-center gap-2.5">
              {[
                { icon: FiFacebook, href: '#', label: 'Facebook' },
                { icon: FiInstagram, href: '#', label: 'Instagram' },
                { icon: FiTwitter, href: '#', label: 'Twitter' },
                { icon: FiYoutube, href: '#', label: 'YouTube' },
                { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-9 w-9 rounded-lg bg-white/5 border border-white/8
                             flex items-center justify-center text-gray-400
                             hover:bg-primary-600 hover:text-white hover:border-primary-500
                             transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[['/', 'Home'], ['/courses', 'Courses'], ['/about', 'About Us'], ['/instructors', 'Instructors'], ['/blog', 'Blog']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors group">
                    <span className="h-px w-3 bg-primary-600 group-hover:w-5 transition-all duration-200 rounded-full" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Our Courses</h3>
            <ul className="space-y-2.5">
              {[
                ['web-design', 'Web Design & Dev'],
                ['video-editing', 'Video Editing'],
                ['graphic-design', 'Graphic Design'],
                ['basic-computer', 'Basic Computer Skills'],
                ['english-language', 'English Language'],
              ].map(([id, label]) => (
                <li key={id}>
                  <Link to={`/courses/${id}`} className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors group">
                    <span className="h-px w-3 bg-primary-600 group-hover:w-5 transition-all duration-200 rounded-full" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="space-y-3 mb-5">
              <li className="flex items-start gap-3 text-sm text-gray-500">
                <FiMapPin size={14} className="mt-0.5 shrink-0 text-primary-500" />
                Sagure, Arsi Zone, Oromia, Ethiopia
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FiPhone size={14} className="shrink-0 text-primary-500" />
                <a href="tel:+251900000000" className="text-gray-500 hover:text-white transition-colors">+251 900 000 000</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FiMail size={14} className="shrink-0 text-primary-500" />
                <a href="mailto:info@fdteknova.com" className="text-gray-500 hover:text-white transition-colors">info@fdtechnova.com</a>
              </li>
            </ul>
            <div className="space-y-1.5">
              {[['/faq', 'FAQ'], ['/privacy-policy', 'Privacy Policy'], ['/terms', 'Terms of Service']].map(([to, label]) => (
                <Link key={to} to={to} className="block text-gray-600 hover:text-gray-300 text-xs transition-colors">{label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6">
        <div className="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>&copy; {year} FD Tech nova Academy. All rights reserved.</p>
          <p>Built with ❤️ in Sagure, Ethiopia</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
