import '@testing-library/jest-dom'

const localStorageStore: Record<string, string> = {}

const localStorageMock: Storage = {
  getItem: (key: string) => localStorageStore[key] ?? null,
  setItem: (key: string, value: string) => { localStorageStore[key] = value },
  removeItem: (key: string) => { delete localStorageStore[key] },
  clear: () => { Object.keys(localStorageStore).forEach(k => delete localStorageStore[k]) },
  get length() { return Object.keys(localStorageStore).length },
  key: (index: number) => Object.keys(localStorageStore)[index] ?? null,
}

vi.stubGlobal('localStorage', localStorageMock)

vi.stubGlobal('matchMedia', (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}))
