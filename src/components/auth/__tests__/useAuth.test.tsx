import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider } from '../../../context/AuthContext'
import { useAuth } from '../../../hooks/useAuth'

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

function mockResponse(body: unknown, status = 200) {
  return Promise.resolve({ ok: status >= 200 && status < 300, status, json: () => Promise.resolve(body) })
}

function TestConsumer() {
  const { user, token, isLoading, error, login, logout, register } = useAuth()
  return (
    <div>
      <span data-testid="user">{user ? user.email : 'none'}</span>
      <span data-testid="token">{token ?? 'none'}</span>
      <span data-testid="loading">{String(isLoading)}</span>
      <span data-testid="error">{error ?? ''}</span>
      <button onClick={() => login('a@b.com', 'password123')}>login</button>
      <button onClick={() => register('new@b.com', 'password123')}>register</button>
      <button onClick={logout}>logout</button>
    </div>
  )
}

function renderWithProvider() {
  return render(
    <AuthProvider>
      <TestConsumer />
    </AuthProvider>
  )
}

beforeEach(() => {
  localStorage.clear()
  mockFetch.mockReset()
})

describe('useAuth', () => {
  it('throws when used outside AuthProvider', () => {
    const err = console.error
    console.error = vi.fn()
    expect(() => render(<TestConsumer />)).toThrow('useAuth must be used inside <AuthProvider>')
    console.error = err
  })

  it('starts with no user when localStorage has no token', async () => {
    mockFetch.mockReturnValue(mockResponse({}, 401))
    renderWithProvider()
    await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('false'))
    expect(screen.getByTestId('user')).toHaveTextContent('none')
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('rehydrates user from stored token on mount', async () => {
    localStorage.setItem('glow-auth-token', 'stored-token')
    mockFetch.mockReturnValue(mockResponse({ id: 1, email: 'stored@example.com' }, 200))
    renderWithProvider()
    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent('stored@example.com'))
    expect(screen.getByTestId('token')).toHaveTextContent('stored-token')
  })

  it('clears stored token when rehydration fails', async () => {
    localStorage.setItem('glow-auth-token', 'bad-token')
    mockFetch.mockReturnValue(mockResponse({ error: 'Unauthorized' }, 401))
    renderWithProvider()
    await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('false'))
    expect(screen.getByTestId('user')).toHaveTextContent('none')
    expect(localStorage.getItem('glow-auth-token')).toBeNull()
  })

  it('login sets user and token', async () => {
    // No stored token → useEffect skips fetch; only the login call needs mocking
    mockFetch.mockReturnValueOnce(
      mockResponse({ token: 'jwt-token', user: { id: 1, email: 'a@b.com' } }, 200)
    )

    renderWithProvider()
    await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('false'))

    await userEvent.click(screen.getByRole('button', { name: 'login' }))

    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent('a@b.com'))
    expect(screen.getByTestId('token')).toHaveTextContent('jwt-token')
    expect(localStorage.getItem('glow-auth-token')).toBe('jwt-token')
  })

  it('login sets error on failure', async () => {
    // No stored token → useEffect skips fetch; only the login call needs mocking
    mockFetch.mockReturnValueOnce(mockResponse({ error: 'Invalid credentials' }, 401))

    renderWithProvider()
    await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('false'))

    await userEvent.click(screen.getByRole('button', { name: 'login' }))

    await waitFor(() => expect(screen.getByTestId('error')).toHaveTextContent('Invalid credentials'))
    expect(screen.getByTestId('user')).toHaveTextContent('none')
  })

  it('logout clears user and removes token from localStorage', async () => {
    localStorage.setItem('glow-auth-token', 'stored-token')
    mockFetch.mockReturnValue(mockResponse({ id: 1, email: 'stored@example.com' }, 200))
    renderWithProvider()
    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent('stored@example.com'))

    await userEvent.click(screen.getByRole('button', { name: 'logout' }))

    expect(screen.getByTestId('user')).toHaveTextContent('none')
    expect(localStorage.getItem('glow-auth-token')).toBeNull()
  })

  it('register sets user and token', async () => {
    // No stored token → useEffect skips fetch; only the register call needs mocking
    mockFetch.mockReturnValueOnce(
      mockResponse({ token: 'new-token', user: { id: 2, email: 'new@b.com' } }, 201)
    )

    renderWithProvider()
    await waitFor(() => expect(screen.getByTestId('loading')).toHaveTextContent('false'))

    await userEvent.click(screen.getByRole('button', { name: 'register' }))

    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent('new@b.com'))
    expect(localStorage.getItem('glow-auth-token')).toBe('new-token')
  })
})
