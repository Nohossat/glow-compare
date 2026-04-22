const navLinks = [
  { label: 'Compare', href: '#compare' },
  { label: 'How It Works', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Use', href: '#' },
  { label: 'Cookie Settings', href: '#' },
]

export function Footer() {
  return (
    <footer id="footer" className="bg-gray-50 dark:bg-dark-surface border-t border-gray-100 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <svg className="h-7 w-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#38A169"/>
                <path d="M16 6C16 6 10 12 10 18C10 21.314 12.686 24 16 24C19.314 24 22 21.314 22 18C22 12 16 6 16 6Z" fill="white"/>
                <ellipse cx="16" cy="18" rx="3" ry="4" fill="#38A169"/>
              </svg>
              <span className="font-heading text-lg font-semibold text-primary-500">Glow Compare</span>
            </div>
            <p className="font-body text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Skincare decisions, powered by data. Because glowing skin deserves informed choices.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-gray-900 dark:text-white mb-4">Navigation</h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="font-body text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
            <ul className="flex flex-col gap-2">
              {legalLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="font-body text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-dark-card transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" aria-label="Pinterest" className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-dark-card transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-dark-card transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-border text-center">
          <p className="font-body text-xs text-gray-400 dark:text-gray-500">
            © 2026 Glow Compare. Not affiliated with any brand. For informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  )
}
