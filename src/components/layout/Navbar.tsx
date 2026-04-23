import { useState } from 'react'
import { ThemeToggle } from '../ui/ThemeToggle'
import { useTheme } from '../../hooks/useTheme'
import { useAuth } from '../../hooks/useAuth'
import { AuthModal } from '../auth/AuthModal'

const navLinks = [
  { label: 'Compare', href: '#compare' },
  { label: 'How It Works', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'About', href: '#footer' },
]

export function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-dark-surface/80 border-b border-gray-100/60 dark:border-dark-border/60">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2" aria-label="Glow Compare home">
            <svg className="h-7 w-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#38A169"/>
              <path d="M16 6C16 6 10 12 10 18C10 21.314 12.686 24 16 24C19.314 24 22 21.314 22 18C22 12 16 6 16 6Z" fill="white"/>
              <ellipse cx="16" cy="18" rx="3" ry="4" fill="#38A169"/>
            </svg>
            <span className="font-heading text-xl font-semibold text-primary-500 tracking-wide">
              Glow Compare
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            {user ? (
              <div className="flex items-center gap-3">
                <span className="font-body text-sm text-gray-600 dark:text-gray-300">{user.email}</span>
                <button
                  onClick={logout}
                  className="font-body text-sm text-primary-500 hover:text-primary-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                aria-label="Open sign in modal"
                className="bg-primary-500 hover:bg-primary-700 text-white font-body text-sm font-semibold px-4 py-2 rounded-full transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-dark-card transition-colors"
            >
              {menuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-dark-surface/95 border-t border-gray-100 dark:border-dark-border px-4 py-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-body text-sm text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-300 py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
            {user ? (
              <>
                <span className="font-body text-sm text-gray-600 dark:text-gray-300">{user.email}</span>
                <button
                  onClick={() => { logout(); setMenuOpen(false) }}
                  className="font-body text-sm text-primary-500 hover:text-primary-700 text-left transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => { setAuthOpen(true); setMenuOpen(false) }}
                className="font-body text-sm text-primary-500 hover:text-primary-700 text-left font-semibold transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        )}
      </header>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
