import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import CategoryCollectionPage from './CategoryCollectionPage';
import { useCategoryCollection } from '../hooks/useCategoryCollection';

vi.mock('../hooks/useCategoryCollection');
vi.mock('../components/CategorySection', () => ({
    CategorySection: ({ title }: { title: string }) => <div data-testid="category-section">{title}</div>
}));

describe('CategoryCollectionPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading state', () => {
        vi.mocked(useCategoryCollection).mockReturnValue({
            isLoading: true,
            data: undefined,
            error: null,
        } as any);

        render(
            <BrowserRouter>
                <CategoryCollectionPage />
            </BrowserRouter>
        );

        expect(screen.getAllByTestId('skeleton')).not.toHaveLength(0);
    });

    it('renders error state', () => {
        vi.mocked(useCategoryCollection).mockReturnValue({
            isLoading: false,
            data: undefined,
            error: new Error('Failed to fetch'),
        } as any);

        render(
            <BrowserRouter>
                <CategoryCollectionPage />
            </BrowserRouter>
        );

        expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
    });

    it('renders categories when data is loaded', () => {
        vi.mocked(useCategoryCollection).mockReturnValue({
            isLoading: false,
            data: [
                { categoryId: '1', title: 'Action', description: 'Desc', shows: [] },
                { categoryId: '2', title: 'Comedy', description: 'Desc', shows: [] },
            ],
            error: null,
        } as any);

        render(
            <BrowserRouter>
                <CategoryCollectionPage slug="home" />
            </BrowserRouter>
        );

        expect(screen.getByText('Action')).toBeInTheDocument();
        expect(screen.getByText('Comedy')).toBeInTheDocument();
        expect(screen.getAllByTestId('category-section')).toHaveLength(2);
    });
});
