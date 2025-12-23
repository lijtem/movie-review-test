import { useQuery } from '@tanstack/react-query';
import { getCategoryCollection } from '../api/endpoints/categories';

export function useCategoryCollection(slug: string) {
    return useQuery({
        queryKey: ['categoryCollection', slug],
        queryFn: async () => {
            const collectionResponse = await getCategoryCollection(slug);
            const categories = collectionResponse.data;

            if (!categories || categories.length === 0) {
                throw new Error('Category collection not found');
            }

            const sortedCategories = [...categories].sort((a, b) => a.sort - b.sort);

            return sortedCategories.map((categoryItem) => ({
                categoryId: categoryItem.category_id.id,
                title: categoryItem.category_id.title,
                description: categoryItem.category_id.description,
                sort: categoryItem.sort,
            }));
        },
    });
}
