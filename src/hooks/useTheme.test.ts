import { renderHook, act } from '@testing-library/react'
import { useTheme } from './useTheme'

function mockMatchMedia(matches: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
  vi.clearAllMocks()
})

describe('useTheme', () => {
  it('defaults to light mode when localStorage is empty and system prefers light', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useTheme())
    expect(result.current.isDark).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('defaults to dark mode when system prefers dark and localStorage is empty', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useTheme())
    expect(result.current.isDark).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('reads theme from localStorage over system preference', () => {
    localStorage.setItem('kbeauty-theme', 'light')
    mockMatchMedia(true)
    const { result } = renderHook(() => useTheme())
    expect(result.current.isDark).toBe(false)
  })

  it('toggleTheme switches from light to dark', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useTheme())

    act(() => result.current.toggleTheme())

    expect(result.current.isDark).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('toggleTheme switches from dark to light', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useTheme())

    act(() => result.current.toggleTheme())

    expect(result.current.isDark).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('persists dark theme to localStorage on toggle', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useTheme())

    act(() => result.current.toggleTheme())

    expect(localStorage.getItem('kbeauty-theme')).toBe('dark')
  })

  it('persists light theme to localStorage when toggling back', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useTheme())

    act(() => result.current.toggleTheme())

    expect(localStorage.getItem('kbeauty-theme')).toBe('light')
  })
})
