import { useEffect, useState } from 'react'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'

type Tab = 'login' | 'signup'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: Props) {
  const [tab, setTab] = useState<Tab>('login')

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Authentication"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-sm bg-white dark:bg-dark-surface rounded-2xl shadow-2xl p-8">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
        >
          ✕
        </button>

        <h2 className="font-heading text-2xl mb-6 dark:text-white">
          {tab === 'login' ? 'Welcome back' : 'Create an account'}
        </h2>

        <div className="flex border-b border-gray-200 dark:border-dark-border mb-6">
          <button
            onClick={() => setTab('login')}
            className={`pb-2 px-1 mr-4 text-sm font-body font-semibold border-b-2 transition-colors ${
              tab === 'login'
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`pb-2 px-1 text-sm font-body font-semibold border-b-2 transition-colors ${
              tab === 'signup'
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
            }`}
          >
            Sign Up
          </button>
        </div>

        {tab === 'login' ? (
          <LoginForm onSuccess={onClose} />
        ) : (
          <SignupForm onSuccess={onClose} />
        )}
      </div>
    </div>
  )
}
