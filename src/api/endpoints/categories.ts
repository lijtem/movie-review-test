import { apiClient, buildFields, buildFilter } from '../../lib/http';
import type {
    DirectusResponse,
    CategoryCollectionItem,
    CategoryShowItem
} from '../../types';

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

