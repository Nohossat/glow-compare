import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navbar } from './Navbar'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

describe('Navbar', () => {
  it('renders the Glow Compare logo text', () => {
    render(<Navbar />)
    expect(screen.getByText('Glow Compare')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Navbar />)
    // Desktop nav renders Compare, How It Works, Reviews, About
    expect(screen.getAllByRole('link', { name: 'Compare' })).not.toHaveLength(0)
    expect(screen.getAllByRole('link', { name: 'How It Works' })).not.toHaveLength(0)
    expect(screen.getAllByRole('link', { name: 'Reviews' })).not.toHaveLength(0)
    expect(screen.getAllByRole('link', { name: 'About' })).not.toHaveLength(0)
  })

  it('renders the theme toggle button', () => {
    render(<Navbar />)
    // Both desktop and mobile render a toggle button
    const toggleButtons = screen.getAllByRole('button', { name: /switch to dark mode/i })
    expect(toggleButtons.length).toBeGreaterThanOrEqual(1)
  })

  it('renders the mobile menu toggle button', () => {
    render(<Navbar />)
    expect(screen.getByRole('button', { name: /toggle navigation menu/i })).toBeInTheDocument()
  })

  it('opens the mobile menu when the hamburger button is clicked', async () => {
    render(<Navbar />)
    const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i })

    await userEvent.click(menuButton)

    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes the mobile menu when a nav link is clicked', async () => {
    render(<Navbar />)
    const menuButton = screen.getByRole('button', { name: /toggle navigation menu/i })
    await userEvent.click(menuButton)

    const mobileLinks = screen.getAllByRole('link', { name: /reviews/i })
    await userEvent.click(mobileLinks[mobileLinks.length - 1])

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('logo link points to the page root', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /glow compare home/i })).toHaveAttribute('href', '#')
  })
})
