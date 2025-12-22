import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ShowPage from './ShowPage';
import { useShow } from '../hooks/useShow';
import { useReviews } from '../hooks/useReviews';
import { ApiError } from '../types';
import React from 'react';

vi.mock('../hooks/useShow');
vi.mock('../hooks/useReviews');
vi.mock('../api/api', () => ({
    api: {
        getReviewsByShowId: vi.fn(),
    },
}));

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false },
    },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
);

describe('ShowPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading state', () => {
        vi.mocked(useShow).mockReturnValue({ isLoading: true } as any);
        vi.mocked(useReviews).mockReturnValue({ isLoading: true } as any);

        render(<ShowPage />, { wrapper });
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('renders error state', () => {
        vi.mocked(useShow).mockReturnValue({ isLoading: false, error: new ApiError('Show error') } as any);
        vi.mocked(useReviews).mockReturnValue({ isLoading: false, data: { data: [] } } as any);

        render(<ShowPage />, { wrapper });
        expect(screen.getByText('Show error')).toBeInTheDocument();
    });

    it('renders show details and reviews when data is loaded', () => {
        const mockShow = {
            data: {
                id: '1',
                title: 'Interstellar',
                description: 'Epic space movie',
                thumbnail_src: 'interstellar.jpg',
                release_date: '2014-11-07',
                tmdb_rating: 8.6,
            },
        };
        const mockReviews = {
            data: [{ id: 'r1', title: 'Masterpiece', rating: 5, name: 'User1', review: 'Wow' }],
        };

        vi.mocked(useShow).mockReturnValue({ isLoading: false, data: mockShow, error: null } as any);
        vi.mocked(useReviews).mockReturnValue({ isLoading: false, data: mockReviews, error: null } as any);

        render(<ShowPage />, { wrapper });

        expect(screen.getByText('Interstellar')).toBeInTheDocument();
        expect(screen.getByText('Epic space movie')).toBeInTheDocument();
        expect(screen.getByText('Masterpiece')).toBeInTheDocument();
    });
});
