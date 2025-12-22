export function Skeleton({ className }: { className?: string }) {
    return (
        <div data-testid="skeleton" className={`animate-pulse rounded bg-neutral-800 ${className}`} />
    );
}

export function ShowCardSkeleton() {
    return (
        <div className="w-40 shrink-0">
            <Skeleton className="aspect-[2/3] w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-1" />
            <Skeleton className="h-4 w-1/2" />
        </div>
    );
}

export function CategorySectionSkeleton() {
    return (
        <div className="mb-10">
            <Skeleton className="h-7 w-48 mb-4" />
            <Skeleton className="h-5 w-64 mb-4" />
            <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 6 }).map((_, i) => (
                    <ShowCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}
