import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';

export function useReviews(showId: string) {
    return useQuery({
        queryKey: ['reviews', showId],
        queryFn: () => api.getReviewsByShowId(showId),
    });
}
