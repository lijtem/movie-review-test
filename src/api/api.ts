import { apiClient, buildFields, buildFilter } from '../utils/apiClient';
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
                sort: ['sort'],
                meta: 'filter_count'
            },
        }
    );

    return response.data;
}


export async function getCategoryShows(
    categoryId: string,
    options?: {
        limit?: number;
        offset?: number;
    }
): Promise<DirectusResponse<CategoryShowItem[]>> {
    const limit = options?.limit || 50;
    const offset = options?.offset || 0;

    const fields = buildFields([
        'show_id.id',
        'show_id.title',
        'show_id.thumbnail_src',
        'show_id.tmdb_rating',
        'show_id.release_date',
        'sort'
    ]);
    
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
                sort: ['sort', '-show_id.tmdb_rating'],
                limit,
                offset,
                meta: 'total_count,filter_count'
            },
        }
    );

    return response.data;
}

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
