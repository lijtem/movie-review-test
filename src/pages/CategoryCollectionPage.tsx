import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CategorySection } from "../components/CategorySection";
import { getCategoryCollection, getCategoryShows } from "../api/api";
import type { Show } from "../types";
import { ApiError } from "../types";

interface CategoryWithShows {
    categoryId: string;
    title: string;
    description: string;
    sort: number;
    shows: Show[];
}

function CategoryCollectionPage({slug}:{slug?:string | undefined}) {
  const params = useParams();
  const categorySlug = slug ?? params.slug!;
  const [categoriesWithShows, setCategoriesWithShows] = useState<CategoryWithShows[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const collectionResponse = await getCategoryCollection(categorySlug);
        const categories = collectionResponse.data;

        if (!categories || categories.length === 0) {
          setError('Category collection not found');
          setLoading(false);
          return;
        }

        const sortedCategories = [...categories].sort((a, b) => a.sort - b.sort);

        const showsPromises = sortedCategories.map(async (categoryItem) => {
          const showsResponse = await getCategoryShows(categoryItem.category_id.id);
          const shows = showsResponse.data.map((item) => item.show_id);
          return {
            categoryId: categoryItem.category_id.id,
            title: categoryItem.category_id.title,
            description: categoryItem.category_id.description,
            sort: categoryItem.sort,
            shows,
          };
        });

        const categoriesWithShowsData = await Promise.all(showsPromises);
        setCategoriesWithShows(categoriesWithShowsData);
      } catch (err) {
        const errorMessage = err instanceof ApiError 
          ? err.message 
          : 'Failed to load category collection';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [categorySlug]);

  if (loading) {
    return (
      <section className="mb-10">
        <div className="mb-4 h-6 w-48 rounded bg-neutral-800 animate-pulse" />
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <CategorySection key={i} title="Loading..." description="" shows={[]} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="my-10">
        <div className="rounded bg-red-900/20 border border-red-500/50 p-4 text-black-200">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-10">
      <div className="flex flex-col gap-4">
        {categoriesWithShows.map((category) => (
          <CategorySection
            key={category.categoryId}
            title={category.title}
            description={category.description}
            shows={category.shows}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoryCollectionPage;