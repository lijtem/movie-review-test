# Movie Review

A modern React application for browsing movies and shows, reading reviews, and submitting your own ratings. Built with React 19, TypeScript, and Vite.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwindcss)

## Features

- 🎬 **Browse Movies & Shows** — Explore categorized collections with lazy-loaded content
- ⭐ **User Reviews** — Read and submit reviews with Markdown support
- 🔍 **TMDB Ratings** — View ratings from The Movie Database
- 📱 **Responsive Design** — Optimized for mobile, tablet, and desktop
- ⚡ **Performance Optimized** — Intersection Observer for lazy loading, React Query for caching

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [React 19](https://react.dev) |
| Language | [TypeScript 5.9](https://www.typescriptlang.org) |
| Build Tool | [Vite 7](https://vite.dev) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| State Management | [Jotai](https://jotai.org) |
| Server State | [TanStack Query](https://tanstack.com/query) |
| Routing | [React Router 7](https://reactrouter.com) |
| Forms | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| HTTP Client | [Axios](https://axios-http.com) |
| Notifications | [Sonner](https://sonner.emilkowal.ski) |
| Icons | [Lucide React](https://lucide.dev) |
| Testing | [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/movie-review-test.git
cd movie-review-test

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (TypeScript check + Vite build) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once (CI mode) |

## Project Structure

```
src/
├── api/                  # API layer
│   └── endpoints/        # API endpoint functions
├── components/           # React components
│   ├── category/         # Category-related components
│   ├── layout/           # Layout components (NavBar, ErrorBoundary)
│   ├── review/           # Review form and list components
│   ├── show/             # Show card components
│   └── ui/               # Reusable UI primitives
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configuration
│   ├── config/           # App configuration
│   ├── constants/        # Constants and magic values
│   ├── http/             # HTTP client setup
│   ├── schemas/          # Zod validation schemas
│   ├── store/            # Jotai atoms
│   └── utils/            # Utility functions
├── pages/                # Page components
├── styles/               # Global styles and tokens
└── types/                # TypeScript type definitions
```

## Component Documentation

All components include JSDoc documentation. Key components:

### UI Components

- **`Button`** — Reusable button with variants (primary, secondary, ghost, error) and sizes
- **`Input`** — Form input with label, error, and helper text support
- **`Skeleton`** — Loading placeholder with pulse animation
- **`ErrorMessage`** — Error display with optional retry action
- **`GlobalLoading`** — Global loading overlay for pending requests

### Feature Components

- **`LazyCategorySection`** — Lazily-loaded category with paginated shows
- **`ShowCard`** / **`LazyShowCard`** — Movie/show cards with lazy loading
- **`ReviewForm`** — Form for submitting reviews with validation
- **`ReviewList`** — Display list of reviews with Markdown rendering

### Layout Components

- **`NavBar`** — Responsive navigation with mobile menu
- **`ErrorBoundary`** — Catches and displays React errors gracefully

## Testing

Tests are written using Vitest and React Testing Library:

```bash
# Run all tests
npm run test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test -- --coverage
```

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is private and not licensed for public use.
