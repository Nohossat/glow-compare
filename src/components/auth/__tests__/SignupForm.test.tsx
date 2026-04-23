import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SignupForm } from '../SignupForm'

const mockRegister = vi.hoisted(() => vi.fn())

vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    token: null,
    isLoading: false,
    error: null,
    login: vi.fn(),
    register: mockRegister,
    logout: vi.fn(),
  }),
}))

beforeEach(() => {
  mockRegister.mockReset()
})

describe('SignupForm', () => {
  it('renders email, password, and confirm password fields', () => {
    render(<SignupForm onSuccess={vi.fn()} />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
  })

  it('shows validation error when submitted empty', async () => {
    render(<SignupForm onSuccess={vi.fn()} />)
    await userEvent.click(screen.getByRole('button', { name: /create account/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent(/fill in all fields/i)
    expect(mockRegister).not.toHaveBeenCalled()
  })

  it('shows error when passwords do not match', async () => {
    render(<SignupForm onSuccess={vi.fn()} />)
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.type(screen.getByLabelText(/^password/i), 'password123')
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'different123')
    await userEvent.click(screen.getByRole('button', { name: /create account/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent(/do not match/i)
    expect(mockRegister).not.toHaveBeenCalled()
  })

  it('shows error when password is too short', async () => {
    render(<SignupForm onSuccess={vi.fn()} />)
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.type(screen.getByLabelText(/^password/i), 'short')
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'short')
    await userEvent.click(screen.getByRole('button', { name: /create account/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent(/at least 8 characters/i)
  })

  it('calls register with email and password on valid submit', async () => {
    mockRegister.mockResolvedValue(true)
    render(<SignupForm onSuccess={vi.fn()} />)
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.type(screen.getByLabelText(/^password/i), 'password123')
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /create account/i }))
    await waitFor(() => expect(mockRegister).toHaveBeenCalledWith('user@example.com', 'password123'))
  })

  it('calls onSuccess when register returns true', async () => {
    mockRegister.mockResolvedValue(true)
    const onSuccess = vi.fn()
    render(<SignupForm onSuccess={onSuccess} />)
    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.type(screen.getByLabelText(/^password/i), 'password123')
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /create account/i }))
    await waitFor(() => expect(onSuccess).toHaveBeenCalled())
  })
})
