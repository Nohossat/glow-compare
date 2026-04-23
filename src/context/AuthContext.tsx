import { createContext, useCallback, useEffect, useReducer, useRef } from 'react'

export type AuthUser = { id: number; email: string }

type AuthState = {
  user: AuthUser | null
  token: string | null
  isLoading: boolean
  error: string | null
}

type AuthAction =
  | { type: 'LOADING' }
  | { type: 'SET_USER'; user: AuthUser; token: string }
  | { type: 'CLEAR_USER' }
  | { type: 'ERROR'; error: string }

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true, error: null }
    case 'SET_USER':
      return { user: action.user, token: action.token, isLoading: false, error: null }
    case 'CLEAR_USER':
      return { user: null, token: null, isLoading: false, error: null }
    case 'ERROR':
      return { ...state, isLoading: false, error: action.error }
  }
}

const TOKEN_KEY = 'glow-auth-token'

export type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    token: null,
    isLoading: true,
    error: null,
  })

  const initialised = useRef(false)

  useEffect(() => {
    if (initialised.current) return
    initialised.current = true

    const stored = localStorage.getItem(TOKEN_KEY)
    if (!stored) {
      dispatch({ type: 'CLEAR_USER' })
      return
    }

    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${stored}` } })
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then((user: AuthUser) => dispatch({ type: 'SET_USER', user, token: stored }))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY)
        dispatch({ type: 'CLEAR_USER' })
      })
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOADING' })
    const r = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await r.json()
    if (!r.ok) {
      dispatch({ type: 'ERROR', error: data.error ?? 'Login failed' })
      return false
    }
    localStorage.setItem(TOKEN_KEY, data.token)
    dispatch({ type: 'SET_USER', user: data.user, token: data.token })
    return true
  }, [])

  const register = useCallback(async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOADING' })
    const r = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await r.json()
    if (!r.ok) {
      dispatch({ type: 'ERROR', error: data.error ?? 'Registration failed' })
      return false
    }
    localStorage.setItem(TOKEN_KEY, data.token)
    dispatch({ type: 'SET_USER', user: data.user, token: data.token })
    return true
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    dispatch({ type: 'CLEAR_USER' })
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
