# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Vite dev server → http://localhost:5173
npm run build        # tsc -b + vite build (type-check first)
npm run lint         # ESLint
npm test             # Vitest in watch mode
npm run test:coverage  # Single run with v8 coverage report
```

Run a single test file:
```bash
npx vitest run src/hooks/useTheme.test.ts
```

Run tests matching a name pattern:
```bash
npx vitest run -t "toggleTheme"
```

## Architecture

**Pure frontend SPA** — no router, no backend (yet). Entry: `src/main.tsx` → `src/App.tsx` assembles four sections in order.

### Dark mode

`useTheme` hook (`src/hooks/useTheme.ts`) is the single source of truth. It mutates the `dark` class on `<html>` directly and persists to `localStorage` under key `kbeauty-theme`. Tailwind's `darkMode: 'class'` strategy means every `dark:` variant in any component works automatically — no React context needed.

### Static data

`src/data/features.ts` and `src/data/testimonials.ts` export typed arrays consumed directly by section components. These are the stand-in for a future API.

### Custom Tailwind tokens

Extend, don't override — all custom colors and font families are under `theme.extend` in `tailwind.config.ts`:
- Colors: `primary-{50,100,300,500,700,900}`, `secondary-{100,200,300,400,600}`, `dark-{bg,surface,card,border}`
- Fonts: `font-heading` (Cormorant Garamond), `font-body` (Nunito) — loaded via Google Fonts `@import` in `src/index.css`

### Test environment quirks

Vitest runs under jsdom. Two globals are stubbed in `src/test/setup.ts` because jsdom doesn't implement them:
- `localStorage` — replaced with a plain-object mock (jsdom's version lacks `.clear()` in Vitest 4.x)
- `matchMedia` — replaced with a no-op stub (default `matches: false`)

Tests that need a specific `matchMedia` result call `vi.stubGlobal('matchMedia', ...)` inside the test; `vi.clearAllMocks()` in `beforeEach` resets it. `vitest/globals` is added to `tsconfig.app.json` `types` so `vi`, `describe`, `it`, `expect` are typed without imports.
