import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiMapPin, FiPhone, FiMail, FiSend, FiCheckCircle } from 'react-icons/fi'
import { FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi'

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true)
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-hero-gradient text-white py-14">
        <div className="container-xl">
          <div className="section-label text-blue-300">
            <span className="h-px w-6 bg-blue-300 inline-block" />Contact
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2">Get in Touch</h1>
          <p className="text-blue-200 text-lg max-w-xl">
            Have a question about our courses or want to visit us? We would love to hear from you.
          </p>
        </div>
      </div>

      <div className="container-xl py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Contact info */}
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Contact Information</h2>
              <p className="text-gray-500 text-sm">Reach us through any of the channels below.</p>
            </div>

            {[
              { icon: FiMapPin, title: 'Location', detail: 'Sagure, Arsi Zone\nOromia, Ethiopia', color: 'bg-blue-50 text-blue-600' },
              { icon: FiPhone, title: 'Phone', detail: '+251 900 000 000', color: 'bg-green-50 text-green-600', href: 'tel:+251900000000' },
              { icon: FiMail, title: 'Email', detail: 'info@fdteknova.com', color: 'bg-purple-50 text-purple-600', href: 'mailto:info@fdteknova.com' },
            ].map(({ icon: Icon, title, detail, color, href }) => (
              <div key={title} className="flex gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className={`h-11 w-11 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{title}</p>
                  {href ? (
                    <a href={href} className="text-primary-600 hover:underline text-sm">{detail}</a>
                  ) : (
                    <p className="text-gray-500 text-sm whitespace-pre-line">{detail}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="font-semibold text-gray-900 mb-3 text-sm">Follow Us</p>
              <div className="flex gap-3">
                {[FiFacebook, FiInstagram, FiYoutube].map((Icon, i) => (
                  <a key={i} href="#" className="h-10 w-10 rounded-xl bg-gray-50 hover:bg-primary-50 hover:text-primary-600 flex items-center justify-center text-gray-400 transition-colors border border-gray-100">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 h-40 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <FiMapPin size={28} className="mx-auto mb-2 text-primary-400" />
                <p className="text-sm font-medium text-gray-600">Sagure, Ethiopia</p>
                <p className="text-xs text-gray-400">Map integration coming soon</p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <FiCheckCircle size={36} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500">Thank you for reaching out. We will get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 text-primary-600 hover:underline text-sm font-medium">
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Send Us a Message</h2>
                  <p className="text-gray-500 text-sm mb-6">Fill in the form below and we will respond as soon as possible.</p>

                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label">Full Name *</label>
                        <input
                          {...register('name', { required: 'Full name is required' })}
                          className={`form-input ${errors.name ? 'border-red-300 bg-red-50' : ''}`}
                          placeholder="Your full name"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="form-label">Email Address *</label>
                        <input
                          type="email"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
                          })}
                          className={`form-input ${errors.email ? 'border-red-300 bg-red-50' : ''}`}
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        {...register('phone')}
                        className="form-input"
                        placeholder="+251 9XX XXX XXX"
                      />
                    </div>

                    <div>
                      <label className="form-label">Subject *</label>
                      <select
                        {...register('subject', { required: 'Please select a subject' })}
                        className={`form-input ${errors.subject ? 'border-red-300 bg-red-50' : ''}`}
                      >
                        <option value="">Select a topic...</option>
                        <option value="course-inquiry">Course Inquiry</option>
                        <option value="enrollment">Enrollment / Registration</option>
                        <option value="pricing">Pricing & Payment</option>
                        <option value="schedule">Schedule Information</option>
                        <option value="general">General Question</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                    </div>

                    <div>
                      <label className="form-label">Message *</label>
                      <textarea
                        {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Message must be at least 10 characters' } })}
                        rows={5}
                        className={`form-input resize-none ${errors.message ? 'border-red-300 bg-red-50' : ''}`}
                        placeholder="Write your message here..."
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-3.5">
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2"><FiSend size={16} /> Send Message</span>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
