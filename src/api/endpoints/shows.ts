import { apiClient, buildFields } from '../../lib/http';
import type { DirectusResponse, Show } from '../../types';

export async function getShowById(showId: string): Promise<DirectusResponse<Show>> {
    const fields = buildFields([
        'id',
        'title',
        'description',
        'thumbnail_src',
        'tmdb_rating',
        'tmdb_id',
        'release_date'
    ]);

    const response = await apiClient.get<DirectusResponse<Show>>(
        `/items/show/${showId}`,
        {
            params: {
                fields
            }
        }
    );
    return response.data;
}

