import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiClock } from 'react-icons/fi'

const POSTS = [
  {
    title: '5 Reasons to Learn Web Development in 2024',
    excerpt: "Web development remains one of the most in-demand skills in Ethiopia and globally. Here's why you should start learning today.",
    category: 'Web Development',
    date: 'November 2024',
    readTime: '4 min read',
    color: 'bg-blue-500',
  },
  {
    title: 'How Video Editing Can Boost Your Career in Ethiopia',
    excerpt: 'Content creation is booming across Ethiopian social media platforms. Discover how video editing skills can open new income opportunities.',
    category: 'Video Editing',
    date: 'October 2024',
    readTime: '3 min read',
    color: 'bg-purple-500',
  },
  {
    title: 'The Importance of English Language Skills for Employment',
    excerpt: "Many job opportunities in Ethiopia and internationally require strong English communication skills. Here's how to get started.",
    category: 'English Language',
    date: 'October 2024',
    readTime: '5 min read',
    color: 'bg-amber-500',
  },
]

function Blog() {
  return (
    <div>
      <div className="bg-hero-gradient text-white py-14">
        <div className="container-xl">
          <div className="section-label text-blue-300">
            <span className="h-px w-6 bg-blue-300 inline-block" />Blog
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">Learning Resources & Insights</h1>
          <p className="text-blue-200 text-lg max-w-xl">Articles, tips, and career guides from the FDTeknova Academy team.</p>
        </div>
      </div>

      <div className="container-xl section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {POSTS.map(post => (
            <div key={post.title} className="card flex flex-col">
              <div className={`h-2 w-full ${post.color}`} />
              <div className="p-6 flex flex-col flex-1">
                <span className="badge bg-gray-100 text-gray-600 self-start mb-3">{post.category}</span>
                <h3 className="font-bold text-gray-900 text-base leading-snug mb-2">{post.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1"><FiClock size={11} />{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200">
          <p className="text-2xl mb-3">✍️</p>
          <h3 className="font-bold text-gray-900 mb-2">More Articles Coming Soon</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            We are working on more guides and resources to support your learning journey. Check back soon!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Blog
