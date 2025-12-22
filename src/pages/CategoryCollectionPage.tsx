import { useParams } from "react-router-dom";
import { CategorySection } from "../components/CategorySection";
import { ErrorMessage } from "../components/ErrorMessage";
import { useCategoryCollection } from "../hooks/useCategoryCollection";
import { CategorySectionSkeleton } from "../components/Skeleton";

function CategoryCollectionPage({ slug }: { slug?: string | undefined }) {
  const params = useParams();
  const categorySlug = slug ?? params.slug!;
  const { data: categoriesWithShows, isLoading, error } = useCategoryCollection(categorySlug);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <CategorySectionSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1200px] mx-auto py-12 px-8">
        <ErrorMessage message={error.message} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <section className="mb-10">
      <div className="flex flex-col gap-4">
        {categoriesWithShows?.map((category) => (
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