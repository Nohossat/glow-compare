import { FormEvent, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

type Props = { onSuccess: () => void }

export function LoginForm({ onSuccess }: Props) {
  const { login, isLoading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setValidationError('')
    if (!email || !password) {
      setValidationError('Please fill in all fields.')
      return
    }
    const ok = await login(email, password)
    if (ok) onSuccess()
  }

  const displayError = validationError || error

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Sign in form">
      <div className="mb-4">
        <label htmlFor="login-email" className="block text-sm font-body mb-1 dark:text-white">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-300 dark:border-dark-border dark:bg-dark-card dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="you@example.com"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="login-password" className="block text-sm font-body mb-1 dark:text-white">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
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
        {isLoading ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  )
}
