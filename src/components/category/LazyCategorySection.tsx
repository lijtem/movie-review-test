import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCategoryShowsPaginated } from '../../hooks/useCategoryShowsPaginated';
import { LazyShowCard } from '../show';

interface Props {
    categoryId: string;
    title: string;
    description: string;
}

export function LazyCategorySection({ categoryId, title, description }: Props) {
    const [isVisible, setIsVisible] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '200px',
                threshold: 0.1,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useCategoryShowsPaginated(categoryId, isVisible);

    const currentPageData = data?.pages[currentPageIndex];
    const currentPageShows = currentPageData?.shows || [];
    const filterCount = data?.pages[0]?.filterCount || 0;
    const totalPages = data?.pages[0]?.totalPages || 0;
    const currentPage = currentPageData?.currentPage || 0;

    const canGoToPrevPage = currentPageIndex > 0;
    const canGoToNextPage = currentPageIndex < (data?.pages.length || 0) - 1 || hasNextPage;

    const handlePrevPage = useCallback(() => {
        if (canGoToPrevPage) {
            setCurrentPageIndex(prev => prev - 1);
        }
    }, [canGoToPrevPage]);

    const handleNextPage = useCallback(() => {
        if (currentPageIndex < (data?.pages.length || 0) - 1) {
            setCurrentPageIndex(prev => prev + 1);
        } else if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage().then(() => {
                setCurrentPageIndex(prev => prev + 1);
            });
        }
    }, [currentPageIndex, data?.pages.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <section ref={sectionRef} className="mb-8 sm:mb-10 lg:mb-12">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between mb-2 sm:mb-3">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">{title}</h2>
                    {filterCount > 0 && (
                        <span className="text-xs sm:text-sm text-gray-500">
                            Page {currentPage}/{totalPages} • {filterCount} total
                        </span>
                    )}
                </div>
                <p className="mb-4 text-xs sm:text-sm text-gray-400">{description}</p>
            </div>

            {!isVisible || isLoading ? (
                <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8 scrollbar-thin scrollbar-thumb-neutral-700">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div 
                            key={i} 
                            className="w-32 sm:w-36 md:w-40 lg:w-44 h-48 sm:h-54 md:h-60 lg:h-66 bg-neutral-800 rounded-lg animate-pulse shrink-0" 
                        />
                    ))}
                </div>
            ) : (
                <div className="relative group">
                    {canGoToPrevPage && (
                        <button
                            onClick={handlePrevPage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/90 hover:scale-110 transition-all duration-200 shadow-xl opacity-70 group-hover:opacity-100"
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    )}

                    <div 
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8"
                    >
                        {isFetchingNextPage ? (
                            Array.from({ length: 6 }).map((_, i) => (
                                <div 
                                    key={`loading-${i}`} 
                                    className="w-full aspect-[2/3] bg-neutral-800 rounded-lg animate-pulse" 
                                />
                            ))
                        ) : (
                            currentPageShows.map((show) => (
                                <LazyShowCard key={show.id} show={show} />
                            ))
                        )}
                    </div>

                    {canGoToNextPage && (
                        <button
                            onClick={handleNextPage}
                            disabled={isFetchingNextPage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/90 hover:scale-110 transition-all duration-200 shadow-xl opacity-70 group-hover:opacity-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                            aria-label="Next page"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    )}
                </div>
            )}
        </section>
    );
}

