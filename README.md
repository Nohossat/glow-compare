# Glow Compare

A single-page marketing app for comparing K-beauty products by ingredients, skin type compatibility, effects, and price.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite 5, Tailwind CSS v3
- **Backend**: Express, better-sqlite3, bcryptjs, JWT
- **Testing**: Vitest, React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Environment

Copy `.env.example` to `.env` and set your values:

```bash
cp .env.example .env
```

### Development

Run only the frontend:

```bash
npm run dev
```

Run only the API server:

```bash
npm run server:dev
```

Run both together:

```bash
npm run dev:full
```

- Frontend: http://localhost:5173
- API server: http://localhost:3001

### Tests

```bash
npm test
```

With coverage:

```bash
npm run test:coverage
```

### Production Build

```bash
npm run build
```

## Project Structure

```
agentic-app/
├── server/             # Express API server
│   ├── db.ts           # SQLite schema & helpers
│   ├── routes/auth.ts  # Auth endpoints
│   ├── middleware/     # JWT auth middleware
│   └── __tests__/      # Backend tests
└── src/
    ├── components/     # React components
    ├── context/        # AuthContext
    ├── hooks/          # useTheme, useAuth
    └── data/           # Static data arrays
```

## License

Apache 2.0 — see [LICENSE](LICENSE).
