import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronDown, FiArrowRight } from 'react-icons/fi'

const FAQS = [
  { q: 'What courses does FDTeknova Academy offer?', a: 'We currently offer five courses: Web Design & Development, Video Editing, Graphic Design, Basic Computer Skills, and English Language. All courses are beginner-friendly and practical.' },
  { q: 'How do I enroll in a course?', a: 'You can enroll online by creating a free account, browsing our courses, and clicking "Enroll Now." You can also visit us directly in Sagure or contact us by phone or email.' },
  { q: 'Are the courses online or in-person?', a: 'Most courses are available both online and in-person at our campus in Sagure, Oromia. Basic Computer Skills is currently offered in-person only.' },
  { q: 'Do I need prior experience to join?', a: 'No prior experience is required for most courses. Our courses are designed for complete beginners and take you from the basics to practical skills.' },
  { q: 'How much do the courses cost?', a: 'Course fees range from 800 to 1,500 ETB depending on the course. We offer flexible payment options. Contact us for details.' },
  { q: 'Will I receive a certificate when I finish?', a: 'Yes, students who complete their course requirements receive a certificate of completion from FDTeknova Academy.' },
  { q: 'What is the duration of each course?', a: 'Courses range from 3–4 weeks for Basic Computer Skills to 6–8 weeks for Web Design & Development and English Language. See individual course pages for exact durations.' },
  { q: 'Can I get a refund if I change my mind?', a: 'We review refund requests on a case-by-case basis. Please contact us within 7 days of enrollment to discuss your situation.' },
]

function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <div>
      <div className="bg-hero-gradient text-white py-14">
        <div className="container-xl">
          <div className="section-label text-blue-300">
            <span className="h-px w-6 bg-blue-300 inline-block" />Support
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">Frequently Asked Questions</h1>
          <p className="text-blue-200 text-lg max-w-xl">Everything you need to know about FDTeknova Academy and our courses.</p>
        </div>
      </div>

      <div className="container-xl py-14 max-w-3xl">
        <div className="space-y-3 mb-12">
          {FAQS.map(({ q, a }, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                className="w-full flex items-center justify-between text-left px-6 py-4 gap-4"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-semibold text-gray-900 text-sm sm:text-base">{q}</span>
                <FiChevronDown
                  size={18}
                  className={`text-gray-400 shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                  <p className="mt-3">{a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-primary-50 rounded-2xl p-6 text-center border border-primary-100">
          <p className="font-bold text-gray-900 mb-1">Still have questions?</p>
          <p className="text-gray-500 text-sm mb-4">We are happy to help. Reach out to us directly.</p>
          <Link to="/contact" className="btn-primary mx-auto">
            Contact Us <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FAQ
