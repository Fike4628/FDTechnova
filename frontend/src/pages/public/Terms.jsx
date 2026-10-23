import React from 'react'

function Terms() {
  return (
    <div>
      <div className="bg-hero-gradient text-white py-12">
        <div className="container-xl">
          <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
          <p className="text-blue-200 text-sm mt-1">Last updated: January 2025</p>
        </div>
      </div>
      <div className="container-xl py-12 max-w-3xl">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6 text-sm text-gray-600 leading-relaxed">
          {[
            { h: '1. Acceptance of Terms', t: 'By accessing and using FDTeknova Academy\'s website and services, you agree to be bound by these Terms of Service.' },
            { h: '2. User Accounts', t: 'You are responsible for maintaining the confidentiality of your account credentials. You must not share your account or allow unauthorized access.' },
            { h: '3. Course Enrollment', t: 'Enrollment in a course constitutes an agreement to participate in good faith. Disruptive behavior may result in removal without refund.' },
            { h: '4. Intellectual Property', t: 'All course materials, content, and resources provided by FDTeknova Academy are the intellectual property of the academy and may not be reproduced without permission.' },
            { h: '5. Payments & Refunds', t: 'Course fees are due as agreed at enrollment. Refund requests must be submitted within 7 days of enrollment. Refunds are reviewed on a case-by-case basis.' },
            { h: '6. Termination', t: 'We reserve the right to suspend or terminate accounts that violate these terms or engage in abusive behavior.' },
            { h: '7. Contact', t: 'For questions regarding these terms, contact us at legal@fdteknova.com.' },
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

export default Terms
