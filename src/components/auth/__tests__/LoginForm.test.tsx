import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '../LoginForm'

const mockLogin = vi.hoisted(() => vi.fn())

vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    token: null,
    isLoading: false,
    error: null,
    login: mockLogin,
    register: vi.fn(),
    logout: vi.fn(),
  }),
}))

beforeEach(() => {
  mockLogin.mockReset()
})

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    render(<LoginForm onSuccess={vi.fn()} />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('shows validation error when submitted empty', async () => {
    render(<LoginForm onSuccess={vi.fn()} />)
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent(/fill in all fields/i)
    expect(mockLogin).not.toHaveBeenCalled()
  })

  it('calls login with email and password on valid submit', async () => {
    mockLogin.mockResolvedValue(true)
    render(<LoginForm onSuccess={vi.fn()} />)
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    await waitFor(() => expect(mockLogin).toHaveBeenCalledWith('user@example.com', 'password123'))
  })

  it('calls onSuccess when login returns true', async () => {
    mockLogin.mockResolvedValue(true)
    const onSuccess = vi.fn()
    render(<LoginForm onSuccess={onSuccess} />)
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    await waitFor(() => expect(onSuccess).toHaveBeenCalled())
  })

  it('does not call onSuccess when login returns false', async () => {
    mockLogin.mockResolvedValue(false)
    const onSuccess = vi.fn()
    render(<LoginForm onSuccess={onSuccess} />)
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    await waitFor(() => expect(mockLogin).toHaveBeenCalled())
    expect(onSuccess).not.toHaveBeenCalled()
  })
})
