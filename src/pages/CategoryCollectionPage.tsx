import { useParams } from "react-router-dom";
import { LazyCategorySection } from "../components/category";
import { ErrorMessage, CategorySectionSkeleton } from "../components/ui";
import { useCategoryCollection } from "../hooks/useCategoryCollection";

function CategoryCollectionPage({ slug }: { slug?: string | undefined }) {
  const params = useParams();
  const categorySlug = slug ?? params.slug!;
  const { data: categories, isLoading, error } = useCategoryCollection(categorySlug);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 py-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <CategorySectionSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1200px] mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <ErrorMessage message={error.message} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <section className="py-4 sm:py-6 lg:py-8">
      <div className="flex flex-col gap-6 sm:gap-8">
        {categories?.map((category) => (
          <LazyCategorySection
            key={category.categoryId}
            categoryId={category.categoryId}
            title={category.title}
            description={category.description}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoryCollectionPage;
