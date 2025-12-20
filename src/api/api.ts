import { apiClient, buildFields, buildFilter } from '../utils/apiClient';
import { withRetry } from '../utils/retry';
import type {
    DirectusResponse,
    CategoryCollectionItem,
    CategoryShowItem
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
        const fields = buildFields(['category_id.*','show_id.*']);
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


export const api = {
    getCategoryCollection: async (slug: string) => {
        const result = await getCategoryCollection(slug);
        return result;
    },
    getCategoryShows: async (categoryId: string) => {
        const result = await getCategoryShows(categoryId);
        return result;
    },
};
