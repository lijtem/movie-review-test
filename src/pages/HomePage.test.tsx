import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomePage from './HomePage';

vi.mock('./CategoryCollectionPage', () => ({
    default: ({ slug }: { slug: string }) => <div data-testid="category-collection-page">{slug}</div>,
}));

describe('HomePage', () => {
    it('renders CategoryCollectionPage with slug "home"', () => {
        render(<HomePage />);
        const categoryPage = screen.getByTestId('category-collection-page');
        expect(categoryPage).toBeInTheDocument();
        expect(categoryPage).toHaveTextContent('home');
    });
});
