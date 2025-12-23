import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCategoryShows } from './useCategoryShows';
import * as api from '../api/api';
import React from 'react';

vi.mock('../api/api', () => ({
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

describe('useCategoryShows hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('fetches shows for a category successfully when enabled', async () => {
        const mockShowsResponse = {
            data: [
                {
                    show_id: { id: 'show1', title: 'Movie 1', description: 'Desc 1', thumbnail_src: 'img1.jpg' },
                },
                {
                    show_id: { id: 'show2', title: 'Movie 2', description: 'Desc 2', thumbnail_src: 'img2.jpg' },
                },
            ],
        };

        vi.mocked(api.getCategoryShows).mockResolvedValue(mockShowsResponse as any);

        const { result } = renderHook(() => useCategoryShows('cat1', true), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual([
            mockShowsResponse.data[0].show_id,
            mockShowsResponse.data[1].show_id,
        ]);
    });

    it('does not fetch shows when enabled is false', async () => {
        const { result } = renderHook(() => useCategoryShows('cat1', false), {
            wrapper: createWrapper(),
        });

        expect(result.current.data).toBeUndefined();
        expect(result.current.isLoading).toBe(false);
        expect(api.getCategoryShows).not.toHaveBeenCalled();
    });

    it('handles API errors gracefully', async () => {
        vi.mocked(api.getCategoryShows).mockRejectedValue(new Error('API Error'));

        const { result } = renderHook(() => useCategoryShows('cat1', true), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error).toEqual(new Error('API Error'));
    });
});

