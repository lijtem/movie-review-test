import { useInfiniteQuery } from '@tanstack/react-query';
import { getCategoryShows } from '../api/api';

const SHOWS_PER_PAGE = 6;

export function useCategoryShowsPaginated(categoryId: string, enabled: boolean = true) {
    return useInfiniteQuery({
        queryKey: ['categoryShows', categoryId, 'paginated'],
        queryFn: async ({ pageParam = 0 }) => {
            const showsResponse = await getCategoryShows(categoryId, {
                limit: SHOWS_PER_PAGE,
                offset: pageParam * SHOWS_PER_PAGE
            });

            const filterCount = showsResponse.meta?.filter_count || 0;
            const totalPages = Math.ceil(filterCount / SHOWS_PER_PAGE);
            const currentPage = pageParam + 1;

            return {
                shows: showsResponse.data.map((item) => item.show_id),
                filterCount,
                totalPages,
                currentPage,
                hasMore: currentPage < totalPages
            };
        },
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.hasMore ? allPages.length : undefined;
        },
        initialPageParam: 0,
        enabled,
        staleTime: 5 * 60 * 1000,
    });
}

