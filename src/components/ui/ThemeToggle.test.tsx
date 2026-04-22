import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle', () => {
  it('renders a button with accessible label for light mode', () => {
    render(<ThemeToggle isDark={false} toggleTheme={() => {}} />)
    expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument()
  })

  it('renders a button with accessible label for dark mode', () => {
    render(<ThemeToggle isDark={true} toggleTheme={() => {}} />)
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument()
  })

  it('calls toggleTheme when clicked', async () => {
    const toggleTheme = vi.fn()
    render(<ThemeToggle isDark={false} toggleTheme={toggleTheme} />)

    await userEvent.click(screen.getByRole('button'))

    expect(toggleTheme).toHaveBeenCalledOnce()
  })

  it('shows moon icon in light mode (toggle to dark)', () => {
    const { container } = render(<ThemeToggle isDark={false} toggleTheme={() => {}} />)
    const paths = container.querySelectorAll('path')
    const hasMoonPath = Array.from(paths).some(p =>
      p.getAttribute('d')?.includes('M20.354')
    )
    expect(hasMoonPath).toBe(true)
  })

  it('shows sun icon in dark mode (toggle to light)', () => {
    const { container } = render(<ThemeToggle isDark={true} toggleTheme={() => {}} />)
    const paths = container.querySelectorAll('path')
    const hasSunPath = Array.from(paths).some(p =>
      p.getAttribute('d')?.includes('M12 3v1')
    )
    expect(hasSunPath).toBe(true)
  })
})
