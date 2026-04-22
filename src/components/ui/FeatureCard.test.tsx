import { render, screen } from '@testing-library/react'
import { FeatureCard } from './FeatureCard'
import type { Feature } from '../../data/features'

const mockFeature: Feature = {
  id: 1,
  title: 'Ingredient Breakdown',
  description: 'Compare INCI lists side by side with plain-language explanations.',
  image: 'https://example.com/serum.jpg',
  imageAlt: 'Serum dropper bottle on marble',
}

describe('FeatureCard', () => {
  it('renders the feature title', () => {
    render(<FeatureCard feature={mockFeature} />)
    expect(screen.getByText('Ingredient Breakdown')).toBeInTheDocument()
  })

  it('renders the feature description', () => {
    render(<FeatureCard feature={mockFeature} />)
    expect(screen.getByText('Compare INCI lists side by side with plain-language explanations.')).toBeInTheDocument()
  })

  it('renders the image with correct src and alt text', () => {
    render(<FeatureCard feature={mockFeature} />)
    const img = screen.getByRole('img', { name: 'Serum dropper bottle on marble' })
    expect(img).toHaveAttribute('src', 'https://example.com/serum.jpg')
  })

  it('applies lazy loading to the image', () => {
    render(<FeatureCard feature={mockFeature} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('loading', 'lazy')
  })
})
