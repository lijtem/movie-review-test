# Contributing to Movie Review

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)

## Code of Conduct

Please be respectful and constructive in all interactions. We're all here to build something great together.

## Getting Started

1. **Fork the repository** and clone it locally
2. **Install dependencies**: `npm install`
3. **Create a branch** for your feature or fix: `git checkout -b feature/your-feature-name`
4. **Start the dev server**: `npm run dev`

## Development Workflow

### Branch Naming

Use descriptive branch names with prefixes:

- `feature/` — New features (e.g., `feature/add-watchlist`)
- `fix/` — Bug fixes (e.g., `fix/review-form-validation`)
- `refactor/` — Code refactoring (e.g., `refactor/api-layer`)
- `docs/` — Documentation updates (e.g., `docs/update-readme`)
- `test/` — Test additions or fixes (e.g., `test/review-form`)

### Making Changes

1. Write your code following the [Code Style](#code-style) guidelines
2. Add or update tests as needed
3. Update documentation if adding new features
4. Run linting and tests before committing

```bash
npm run lint
npm run test:run
```

## Code Style

### TypeScript

- Use TypeScript for all new code
- Define proper types — avoid `any`
- Export types from `src/types/index.ts`
- Use interfaces for object shapes, types for unions/primitives

### React Components

- Use functional components with hooks
- Add JSDoc comments to all exported components
- Follow the existing component structure:

```tsx
/**
 * Brief description of the component.
 *
 * @param props - Component props
 * @param props.propName - Description of prop
 *
 * @example
 * ```tsx
 * <MyComponent propName="value" />
 * ```
 */
export function MyComponent({ propName }: Props) {
  // ...
}
```

### File Organization

- One component per file
- Place tests next to components (`Component.tsx` → `Component.test.tsx`)
- Use barrel exports (`index.ts`) for cleaner imports
- Keep files focused and under 200 lines when possible

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design tokens in `src/styles/tokens.css`
- Use semantic color names (`text-primary`, `bg-surface`)
- Ensure responsive design with Tailwind breakpoints

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ShowCard`, `ReviewForm` |
| Hooks | camelCase with `use` prefix | `useReviews`, `useFormReview` |
| Files (components) | PascalCase | `ShowCard.tsx` |
| Files (utilities) | camelCase | `formatters.ts` |
| Constants | SCREAMING_SNAKE_CASE | `PAGINATION`, `API_BASE_URL` |
| Types/Interfaces | PascalCase | `Review`, `ShowCardProps` |

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat` — New feature
- `fix` — Bug fix
- `docs` — Documentation changes
- `style` — Formatting, missing semicolons, etc.
- `refactor` — Code restructuring without behavior change
- `test` — Adding or updating tests
- `chore` — Maintenance tasks (deps, configs)

### Examples

```
feat(review): add star rating animation

fix(category): correct pagination offset calculation

docs: update README with new setup instructions

refactor(api): extract HTTP client configuration
```

## Pull Request Process

1. **Ensure your branch is up to date** with `main`

   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Run all checks** before submitting

   ```bash
   npm run lint
   npm run test:run
   npm run build
   ```

3. **Create a pull request** with:
   - Clear title following commit conventions
   - Description of changes and motivation
   - Screenshots for UI changes
   - Link to related issues

4. **Address review feedback** promptly

5. **Squash and merge** once approved

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] New features include tests
- [ ] JSDoc comments added for new components
- [ ] No console logs or debugging code
- [ ] Self-reviewed the diff for obvious issues

## Testing

### Running Tests

```bash
# Watch mode (during development)
npm run test

# Single run (CI)
npm run test:run
```

### Writing Tests

- Use React Testing Library for component tests
- Test user behavior, not implementation details
- Use descriptive test names

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShowCard } from './ShowCard';

describe('ShowCard', () => {
  it('displays the show title', () => {
    render(<ShowCard show={mockShow} />);
    expect(screen.getByText('Movie Title')).toBeInTheDocument();
  });

  it('navigates to show page on click', async () => {
    const user = userEvent.setup();
    render(<ShowCard show={mockShow} />);
    
    await user.click(screen.getByRole('img'));
    // Assert navigation...
  });
});
```

### Test File Location

Place test files next to the code they test:

```
components/
  show/
    ShowCard.tsx
    ShowCard.test.tsx
```

---

Thank you for contributing! 🎬

