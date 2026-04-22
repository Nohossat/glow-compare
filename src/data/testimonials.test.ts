import { testimonials } from './testimonials'

describe('testimonials data', () => {
  it('exports a non-empty array', () => {
    expect(testimonials.length).toBeGreaterThan(0)
  })

  it('every entry has a unique id', () => {
    const ids = testimonials.map(t => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every entry has required string fields', () => {
    for (const t of testimonials) {
      expect(typeof t.name).toBe('string')
      expect(t.name.length).toBeGreaterThan(0)
      expect(typeof t.location).toBe('string')
      expect(typeof t.text).toBe('string')
      expect(t.text.length).toBeGreaterThan(0)
      expect(typeof t.product).toBe('string')
      expect(typeof t.avatar).toBe('string')
    }
  })

  it('every rating is between 1 and 5 inclusive', () => {
    for (const t of testimonials) {
      expect(t.rating).toBeGreaterThanOrEqual(1)
      expect(t.rating).toBeLessThanOrEqual(5)
    }
  })

  it('every avatar is a valid URL', () => {
    for (const t of testimonials) {
      expect(() => new URL(t.avatar)).not.toThrow()
    }
  })
})
