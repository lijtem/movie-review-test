import { useQuery } from '@tanstack/react-query';
import { getCategoryShows } from '../api/api';

export function useCategoryShows(categoryId: string, enabled: boolean = true) {
    return useQuery({
        queryKey: ['categoryShows', categoryId],
        queryFn: async () => {
            const showsResponse = await getCategoryShows(categoryId);
            return showsResponse.data.map((item) => item.show_id);
        },
        enabled,
        staleTime: 5 * 60 * 1000,
    });
}

