import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  FiSearch, FiX, FiMenu, FiChevronDown, FiUser,
  FiLogOut, FiBookOpen, FiGrid
} from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const getDashboardLink = () => {
    if (!user) return null
    return { student: '/student/dashboard', instructor: '/instructor/dashboard', admin: '/admin/dashboard' }[user.role] || null
  }

  const NAV_LINKS = [
    { to: '/', label: 'Home', end: true },
    { to: '/courses', label: 'Courses' },
    { to: '/about', label: 'About Us' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ]

  const navBg = scrolled
    ? 'bg-dark-800/95 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-white/6'
    : 'bg-dark-800/80 backdrop-blur-md border-b border-white/6'

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="container-xl">
        <div className="flex items-center justify-between h-16 lg:h-[70px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="FDTeknova Academy home">
            <div className="h-10 w-10 rounded-xl overflow-hidden shadow-glow-sm border border-primary-500/30 shrink-0 group-hover:shadow-glow transition-shadow duration-300">
              <img
                src="/images/courses/logo.png"
                alt="FDTeknova Academy logo"
                className="w-full h-full object-cover"
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.parentElement.className = 'h-10 w-10 bg-primary-600 rounded-xl flex items-center justify-center shrink-0'
                  const span = document.createElement('span')
                  span.className = 'text-white font-extrabold text-sm'
                  span.textContent = 'FD'
                  e.target.parentElement.appendChild(span)
                }}
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-extrabold text-white text-[15px] leading-tight group-hover:text-primary-300 transition-colors">FDTeknova</p>
              <p className="text-gray-500 text-[10px] leading-tight tracking-widest uppercase font-medium">Academy</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `nav-link relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive ? 'text-primary-300 active' : 'text-gray-300 hover:text-white hover:bg-white/6'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center gap-1.5">
                  <input
                    autoFocus
                    type="search"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search courses..."
                    className="w-44 lg:w-60 px-3.5 py-2 text-sm bg-dark-500 border border-white/15 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                    aria-label="Search courses"
                  />
                  <button type="button" onClick={() => setSearchOpen(false)} className="p-1.5 text-gray-400 hover:text-white" aria-label="Close search">
                    <FiX size={17} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/8 rounded-lg transition-colors"
                  aria-label="Open search"
                >
                  <FiSearch size={19} />
                </button>
              )}
            </div>

            {/* Auth */}
            {user ? (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setUserMenuOpen(o => !o)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/8 transition-colors"
                  aria-expanded={userMenuOpen}
                >
                  <div className="h-8 w-8 rounded-full bg-primary-700 border border-primary-500/50 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{user.name?.[0] || 'U'}</span>
                  </div>
                  <span className="text-gray-200 text-sm font-medium max-w-[100px] truncate">{user.name}</span>
                  <FiChevronDown size={13} className={`text-gray-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-52 bg-dark-600 rounded-2xl shadow-xl border border-white/10 py-2 z-50 animate-fade-in">
                    {getDashboardLink() && (
                      <Link to={getDashboardLink()} onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/6 hover:text-white transition-colors">
                        <FiGrid size={14} />Dashboard
                      </Link>
                    )}
                    <Link to="/student/my-courses" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/6 hover:text-white transition-colors">
                      <FiBookOpen size={14} />My Courses
                    </Link>
                    <Link to="/student/profile" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/6 hover:text-white transition-colors">
                      <FiUser size={14} />Profile
                    </Link>
                    <hr className="my-1 border-white/8" />
                    <button onClick={() => { logout(); setUserMenuOpen(false) }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                      <FiLogOut size={14} />Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white border border-white/15 hover:border-white/35 rounded-xl transition-all duration-200">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-500 rounded-xl transition-all duration-200 shadow-glow-sm hover:shadow-glow">
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/8 rounded-lg transition-colors"
              onClick={() => setMenuOpen(o => !o)}
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden border-t border-white/8 bg-dark-800/98 backdrop-blur-xl shadow-xl">
          <div className="container-xl py-4 space-y-1">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-primary-600/20 text-primary-300' : 'text-gray-300 hover:bg-white/6 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="pt-3 border-t border-white/8 flex gap-2">
              {user ? (
                <>
                  {getDashboardLink() && (
                    <Link to={getDashboardLink()} onClick={() => setMenuOpen(false)} className="flex-1 text-center px-4 py-2.5 bg-primary-600/20 text-primary-300 text-sm font-semibold rounded-xl border border-primary-500/30">
                      Dashboard
                    </Link>
                  )}
                  <button onClick={() => { logout(); setMenuOpen(false) }} className="flex-1 text-center px-4 py-2.5 bg-red-500/10 text-red-400 text-sm font-semibold rounded-xl border border-red-500/20">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center px-4 py-2.5 border border-white/15 text-gray-200 text-sm font-semibold rounded-xl">Login</Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="flex-1 text-center px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl shadow-glow-sm">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
