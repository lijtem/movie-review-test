import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReviews } from './useReviews';
import { getReviewsByShowId } from '../api/endpoints/reviews';
import React from 'react';

vi.mock('../api/endpoints/reviews', () => ({
    getReviewsByShowId: vi.fn(),
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

describe('useReviews hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('fetches reviews successfully', async () => {
        const mockData = { data: [{ id: '1', title: 'Great!' }] };
        vi.mocked(getReviewsByShowId).mockResolvedValue(mockData as any);

        const { result } = renderHook(() => useReviews('1'), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual(mockData);
    });

    it('handles error state', async () => {
        vi.mocked(getReviewsByShowId).mockRejectedValue(new Error('Fetch failed'));

        const { result } = renderHook(() => useReviews('1'), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error).toBeInstanceOf(Error);
    });
});
