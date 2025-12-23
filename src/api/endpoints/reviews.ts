import { apiClient, buildFields, buildFilter } from '../../lib/http';
import type { DirectusResponse, Review } from '../../types';

export async function getReviewsByShowId(showId: string): Promise<DirectusResponse<Review[]>> {
    const fields = buildFields([
        'id',
        'title',
        'review',
        'rating',
        'name',
        'date_created'
    ]);

    const filter = buildFilter({
        show_id: showId,
    });
    
    const response = await apiClient.get<DirectusResponse<Review[]>>(
        `/items/review`,
        {
            params: {
                filter,
                fields,
                sort: ['-date_created'],
                limit: 50,
                meta: 'total_count'
            },
        }
    );
    return response.data;
}

export async function createReview(review: Review): Promise<DirectusResponse<Review>> {
    const response = await apiClient.post<DirectusResponse<Review>>('/items/review', review, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}

