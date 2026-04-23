import { FormEvent, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

type Props = { onSuccess: () => void }

export function SignupForm({ onSuccess }: Props) {
  const { register, isLoading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [validationError, setValidationError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setValidationError('')
    if (!email || !password || !confirm) {
      setValidationError('Please fill in all fields.')
      return
    }
    if (password.length < 8) {
      setValidationError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirm) {
      setValidationError('Passwords do not match.')
      return
    }
    const ok = await register(email, password)
    if (ok) onSuccess()
  }

  const displayError = validationError || error

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Sign up form">
      <div className="mb-4">
        <label htmlFor="signup-email" className="block text-sm font-body mb-1 dark:text-white">
          Email
        </label>
        <input
          id="signup-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="you@example.com"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="signup-password" className="block text-sm font-body mb-1 dark:text-white">
          Password
        </label>
        <input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Min. 8 characters"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="signup-confirm" className="block text-sm font-body mb-1 dark:text-white">
          Confirm password
        </label>
        <input
          id="signup-confirm"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          className="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="••••••••"
        />
      </div>
      {displayError && (
        <p role="alert" className="text-red-500 text-sm mb-3">
          {displayError}
        </p>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary-500 hover:bg-primary-700 text-white font-body font-semibold py-2 rounded-lg transition-colors disabled:opacity-60"
      >
        {isLoading ? 'Creating account…' : 'Create Account'}
      </button>
    </form>
  )
}
