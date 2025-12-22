import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';

export function useShow(showId: string) {
    return useQuery({
        queryKey: ['show', showId],
        queryFn: () => api.getShowById(showId),
    });
}
