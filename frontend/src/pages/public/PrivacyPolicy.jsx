import React from 'react'

function PrivacyPolicy() {
  return (
    <div>
      <div className="bg-hero-gradient text-white py-12">
        <div className="container-xl">
          <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-blue-200 text-sm mt-1">Last updated: January 2025</p>
        </div>
      </div>
      <div className="container-xl py-12 max-w-3xl">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6 text-sm text-gray-600 leading-relaxed">
          {[
            { h: '1. Information We Collect', t: 'We collect information you provide when you register for an account, enroll in a course, or contact us. This includes your name, email address, phone number, and payment information where applicable.' },
            { h: '2. How We Use Your Information', t: 'We use your information to provide our educational services, process enrollments, communicate important updates, and improve our platform. We do not sell your personal information to third parties.' },
            { h: '3. Data Security', t: 'We take appropriate technical and organizational measures to protect your personal information. Passwords are stored securely and never in plain text.' },
            { h: '4. Student Records', t: 'Student records, including progress and results, are kept private and shared only with the student and authorized instructors or administrators.' },
            { h: '5. Cookies', t: 'Our website may use cookies to improve your browsing experience and maintain your session. You can disable cookies in your browser settings.' },
            { h: '6. Contact Us', t: 'If you have questions about this privacy policy, contact us at privacy@fdteknova.com or visit us in Sagure, Oromia, Ethiopia.' },
          ].map(({ h, t }) => (
            <section key={h}>
              <h2 className="font-bold text-gray-900 text-base mb-2">{h}</h2>
              <p>{t}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
