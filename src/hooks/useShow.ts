import { useQuery } from '@tanstack/react-query';
import { getShowById } from '../api/endpoints/shows';

export function useShow(showId: string) {
    return useQuery({
        queryKey: ['show', showId],
        queryFn: () => getShowById(showId),
    });
}
