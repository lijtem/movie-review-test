import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LazyCategorySection } from './LazyCategorySection';
import { useCategoryShowsPaginated } from '../../hooks/useCategoryShowsPaginated';

vi.mock('../../hooks/useCategoryShowsPaginated');
vi.mock('../show/LazyShowCard', () => ({
    LazyShowCard: ({ show }: any) => <div data-testid="show-card">{show.title}</div>
}));

class MockIntersectionObserver {
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();
    callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
    }
}

window.IntersectionObserver = MockIntersectionObserver as any;

describe('LazyCategorySection', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders category title and description', () => {
        vi.mocked(useCategoryShowsPaginated).mockReturnValue({
            data: {
                pages: [{ shows: [], filterCount: 0, totalPages: 0, currentPage: 1, hasMore: false }],
                pageParams: []
            },
            isLoading: false,
            error: null,
            fetchNextPage: vi.fn(),
            hasNextPage: false,
            isFetchingNextPage: false,
        } as any);

        render(
            <LazyCategorySection
                categoryId="cat1"
                title="Action Movies"
                description="Best action movies"
            />
        );

        expect(screen.getByText('Action Movies')).toBeInTheDocument();
        expect(screen.getByText('Best action movies')).toBeInTheDocument();
    });

    it('renders loading skeletons when loading', () => {
        vi.mocked(useCategoryShowsPaginated).mockReturnValue({
            data: undefined,
            isLoading: true,
            error: null,
            fetchNextPage: vi.fn(),
            hasNextPage: false,
            isFetchingNextPage: false,
        } as any);

        const { container } = render(
            <LazyCategorySection
                categoryId="cat1"
                title="Action Movies"
                description="Best action movies"
            />
        );

        const skeletons = container.querySelectorAll('.animate-pulse');
        expect(skeletons.length).toBeGreaterThan(0);
    });

    it('does not fetch shows when not visible', () => {
        vi.mocked(useCategoryShowsPaginated).mockReturnValue({
            data: undefined,
            isLoading: false,
            error: null,
            fetchNextPage: vi.fn(),
            hasNextPage: false,
            isFetchingNextPage: false,
        } as any);

        render(
            <LazyCategorySection
                categoryId="cat1"
                title="Action Movies"
                description="Best action movies"
            />
        );

        expect(useCategoryShowsPaginated).toHaveBeenCalledWith('cat1', false);
    });
});

