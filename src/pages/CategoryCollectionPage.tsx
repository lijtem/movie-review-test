import { useParams } from "react-router-dom";
import { CategorySection } from "../components/CategorySection";
import { ErrorMessage } from "../components/ErrorMessage";
import { useCategoryCollection } from "../hooks/useCategoryCollection";

function CategoryCollectionPage({ slug }: { slug?: string | undefined }) {
  const params = useParams();
  const categorySlug = slug ?? params.slug!;
  const { data: categoriesWithShows, isLoading, error } = useCategoryCollection(categorySlug);

  if (isLoading) {
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