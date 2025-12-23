import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useShow } from './useShow';
import { getShowById } from '../api/endpoints/shows';
import React from 'react';

vi.mock('../api/endpoints/shows', () => ({
    getShowById: vi.fn(),
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

describe('useShow hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('fetches show data successfully', async () => {
        const mockData = { data: { id: '1', title: 'Test Show' } };
        vi.mocked(getShowById).mockResolvedValue(mockData as any);

        const { result } = renderHook(() => useShow('1'), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual(mockData);
    });

    it('handles error state', async () => {
        vi.mocked(getShowById).mockRejectedValue(new Error('Fetch failed'));

        const { result } = renderHook(() => useShow('1'), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error).toBeInstanceOf(Error);
    });
});
