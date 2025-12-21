import { apiClient, buildFields, buildFilter } from '../utils/apiClient';
import { withRetry } from '../utils/retry';
import type {
    DirectusResponse,
    CategoryCollectionItem,
    CategoryShowItem,
    Show,
    Review
} from '../types';


export async function getCategoryCollection(
    slug: string
): Promise<DirectusResponse<CategoryCollectionItem[]>> {
    return withRetry(async () => {
        const fields = buildFields([
            'sort',
            'category_id.id',
            'category_id.title',
            'category_id.description',
        ]);
        const filter = buildFilter({
            category_collection_id: {
                slug: slug,
            },
        });

        const response = await apiClient.get<DirectusResponse<CategoryCollectionItem[]>>(
            '/items/category_collection_category',
            {
                params: {
                    fields,
                    filter,
                },
            }
        );

        return response.data;
    });
}


export async function getCategoryShows(
    categoryId: string
): Promise<DirectusResponse<CategoryShowItem[]>> {
    return withRetry(async () => {
        const fields = buildFields(['category_id.*', 'show_id.*']);
        const filter = buildFilter({
            category_id: {
                id: categoryId,
            },
        });

        const response = await apiClient.get<DirectusResponse<CategoryShowItem[]>>(
            '/items/category_show',
            {
                params: {
                    fields,
                    filter,
                },
            }
        );

        return response.data;
    });
}

export async function getShowById(showId: string): Promise<DirectusResponse<Show>> {
    return withRetry(async () => {
        const response = await apiClient.get<DirectusResponse<Show>>(
            `/items/show/${showId}`,

        );
        return response.data;
    });
}

export async function getReviewsByShowId(showId: string): Promise<DirectusResponse<Review[]>> {
    return withRetry(async () => {

        const filter = buildFilter({
            show_id: showId,
        });
        const response = await apiClient.get<DirectusResponse<Review[]>>(
            `/items/review`,
            {
                params: {
                    filter,
                },
            }
        );
        return response.data;
    });
}

export async function createReview(review: Review): Promise<DirectusResponse<Review>> {
    return withRetry(async () => {
        const response = await apiClient.post<DirectusResponse<Review>>('/items/review', review, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    });
}

export const api = {
    getCategoryCollection: async (slug: string) => {
        const result = await getCategoryCollection(slug);
        return result;
    },
    getCategoryShows: async (categoryId: string) => {
        const result = await getCategoryShows(categoryId);
        return result;
    },
    getShowById: async (showId: string) => {
        const result = await getShowById(showId);
        return result;
    },
    getReviewsByShowId: async (showId: string) => {
        const result = await getReviewsByShowId(showId);
        return result;
    },
    createReview: async (review: Review) => {
        const result = await createReview(review);
        return result;
    },
};
