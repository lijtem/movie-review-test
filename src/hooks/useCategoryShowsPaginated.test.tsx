import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCategoryShowsPaginated } from './useCategoryShowsPaginated';
import { getCategoryShows } from '../api/endpoints/categories';
import React from 'react';

vi.mock('../api/endpoints/categories', () => ({
    getCategoryShows: vi.fn(),
}));

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('useCategoryShowsPaginated hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('fetches first page of shows successfully', async () => {
        const mockShowsResponse = {
            data: [
                {
                    show_id: { id: 'show1', title: 'Movie 1', thumbnail_src: 'img1.jpg', tmdb_rating: 8.5 },
                },
                {
                    show_id: { id: 'show2', title: 'Movie 2', thumbnail_src: 'img2.jpg', tmdb_rating: 7.8 },
                },
            ],
            meta: {
                total_count: 50,
                filter_count: 50
            }
        };

        vi.mocked(getCategoryShows).mockResolvedValue(mockShowsResponse as any);

        const { result } = renderHook(() => useCategoryShowsPaginated('cat1', true), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data?.pages[0].shows).toHaveLength(2);
        expect(result.current.data?.pages[0].filterCount).toBe(50);
        expect(result.current.data?.pages[0].totalPages).toBe(9);
        expect(result.current.data?.pages[0].currentPage).toBe(1);
        expect(result.current.data?.pages[0].hasMore).toBe(true);
    });

    it('does not fetch when enabled is false', async () => {
        const { result } = renderHook(() => useCategoryShowsPaginated('cat1', false), {
            wrapper: createWrapper(),
        });

        expect(result.current.data).toBeUndefined();
        expect(result.current.isLoading).toBe(false);
        expect(getCategoryShows).not.toHaveBeenCalled();
    });

    it('indicates no more pages when all data loaded', async () => {
        const mockShowsResponse = {
            data: [
                {
                    show_id: { id: 'show1', title: 'Movie 1', thumbnail_src: 'img1.jpg', tmdb_rating: 8.5 },
                },
            ],
            meta: {
                total_count: 6,
                filter_count: 6
            }
        };

        vi.mocked(getCategoryShows).mockResolvedValue(mockShowsResponse as any);

        const { result } = renderHook(() => useCategoryShowsPaginated('cat1', true), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data?.pages[0].totalPages).toBe(1);
        expect(result.current.data?.pages[0].hasMore).toBe(false);
        expect(result.current.hasNextPage).toBe(false);
    });
});
