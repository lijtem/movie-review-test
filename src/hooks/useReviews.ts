import { useQuery } from '@tanstack/react-query';
import { getReviewsByShowId } from '../api/endpoints/reviews';

export function useReviews(showId: string) {
    return useQuery({
        queryKey: ['reviews', showId],
        queryFn: () => getReviewsByShowId(showId),
    });
}
