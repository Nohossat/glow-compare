import { render, screen } from '@testing-library/react'
import { TestimonialCard } from './TestimonialCard'
import type { Testimonial } from '../../data/testimonials'

const mockTestimonial: Testimonial = {
  id: 1,
  name: 'Sophie Marchand',
  location: 'Paris, France',
  avatar: 'https://example.com/avatar.jpg',
  rating: 5,
  text: 'This tool changed my skincare routine completely.',
  product: 'COSRX Niacinamide vs. Some By Mi',
}

describe('TestimonialCard', () => {
  it('renders the reviewer name', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />)
    expect(screen.getByText('Sophie Marchand')).toBeInTheDocument()
  })

  it('renders the reviewer location', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />)
    expect(screen.getByText('Paris, France')).toBeInTheDocument()
  })

  it('renders the review text in quotes', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />)
    expect(screen.getByText(/"This tool changed my skincare routine completely\."/)).toBeInTheDocument()
  })

  it('renders the product comparison badge', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />)
    expect(screen.getByText('COSRX Niacinamide vs. Some By Mi')).toBeInTheDocument()
  })

  it('renders the avatar image with correct alt text', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />)
    const img = screen.getByRole('img', { name: 'Sophie Marchand' })
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg')
  })

  it('renders 5 stars for a rating of 5', () => {
    render(<TestimonialCard testimonial={mockTestimonial} />)
    const ratingEl = screen.getByLabelText('5 out of 5 stars')
    expect(ratingEl).toBeInTheDocument()
  })

  it('renders correct star count for rating of 3', () => {
    render(<TestimonialCard testimonial={{ ...mockTestimonial, rating: 3 }} />)
    expect(screen.getByLabelText('3 out of 5 stars')).toBeInTheDocument()
  })
})
