import { features } from './features'

describe('features data', () => {
  it('exports exactly 3 features', () => {
    expect(features).toHaveLength(3)
  })

  it('every entry has a unique id', () => {
    const ids = features.map(f => f.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every entry has required string fields', () => {
    for (const f of features) {
      expect(typeof f.title).toBe('string')
      expect(f.title.length).toBeGreaterThan(0)
      expect(typeof f.description).toBe('string')
      expect(f.description.length).toBeGreaterThan(0)
      expect(typeof f.imageAlt).toBe('string')
      expect(f.imageAlt.length).toBeGreaterThan(0)
    }
  })

  it('every image is a valid URL', () => {
    for (const f of features) {
      expect(() => new URL(f.image)).not.toThrow()
    }
  })
})
