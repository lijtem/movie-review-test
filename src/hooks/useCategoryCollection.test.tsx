import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCategoryCollection } from './useCategoryCollection';
import { getCategoryCollection } from '../api/endpoints/categories';
import React from 'react';

vi.mock('../api/endpoints/categories', () => ({
    getCategoryCollection: vi.fn(),
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

describe('useCategoryCollection hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('fetches category collection successfully', async () => {
        const mockCollectionResponse = {
            data: [
                {
                    sort: 1,
                    category_id: { id: 'cat1', title: 'Action', description: 'Action movies' },
                },
            ],
        };

        vi.mocked(getCategoryCollection).mockResolvedValue(mockCollectionResponse as any);

        const { result } = renderHook(() => useCategoryCollection('home'), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual([
            {
                categoryId: 'cat1',
                title: 'Action',
                description: 'Action movies',
                sort: 1,
            },
        ]);
    });

    it('handles empty collection error', async () => {
        vi.mocked(getCategoryCollection).mockResolvedValue({ data: [] } as any);

        const { result } = renderHook(() => useCategoryCollection('empty'), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error).toEqual(new Error('Category collection not found'));
    });
});
