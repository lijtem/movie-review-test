import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Star, Calendar, ArrowLeft } from "lucide-react";
import { ApiError } from "../types";
import { ReviewList, ReviewForm } from "../components/review";
import { ErrorMessage, Skeleton } from "../components/ui";
import { useShow } from "../hooks/useShow";
import { useReviews } from "../hooks/useReviews";
import { formatDate } from "../lib/utils";

function ShowPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: showData, isLoading: showLoading, error: showError, refetch: refetchShow } = useShow(id!);
  const { data: reviewsData, isLoading: reviewsLoading, error: reviewsError, refetch: refetchReviews } = useReviews(id!);

  const loading = showLoading || reviewsLoading;
  const error = showError || reviewsError;
  const show = showData?.data;
  const reviews = reviewsData?.data || [];


  const refreshReviews = () => {
    queryClient.invalidateQueries({ queryKey: ['reviews', id] });
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-8 h-full">
      {loading && (
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 mb-8 animate-pulse">
          <div className="w-full sm:w-64 md:w-80 lg:w-96 mx-auto lg:mx-0 shrink-0">
            <Skeleton className="aspect-[2/3] w-full rounded-xl" />
          </div>
          <div className="flex-1">
            <Skeleton className="h-8 sm:h-10 w-3/4 mb-4 rounded-lg" />
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-6">
              <Skeleton className="h-6 w-28 sm:w-32 rounded-button" />
              <Skeleton className="h-6 w-28 sm:w-32 rounded-button" />
            </div>
            <Skeleton className="h-5 w-full mb-2 rounded" />
            <Skeleton className="h-5 w-full mb-2 rounded" />
            <Skeleton className="h-5 w-2/3 rounded" />
          </div>
        </div>
      )}
      {error && (
        <div className="max-w-[1200px] mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <ErrorMessage message={error instanceof ApiError ? error.message : 'Failed to load show'} onRetry={() => {
            refetchShow();
            refetchReviews();
          }} />
        </div>
      )}
      {show && (
        <>
          <button
            onClick={() => navigate(-1)}
            className="mb-4 sm:mb-6 flex items-center gap-2 text-text-secondary hover:text-text-main transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 mb-8">
            <div className="w-full sm:w-64 md:w-80 lg:w-96 mx-auto lg:mx-0 shrink-0">
              <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-neutral-800 shadow-card-hover">
                <img
                  src={show.thumbnail_src ?? undefined}
                  alt={show.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">{show.title}</h1>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6 text-sm sm:text-base text-text-secondary">
                {show.release_date && (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{formatDate(show.release_date)}</span>
                  </div>
                )}
                {show.tmdb_rating && (
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-neutral-800/50 px-3 py-1.5 rounded-full">
                    <Star className="w-5 h-5 text-warning fill-current" />
                    <span className="font-semibold text-text-main">
                      {show.tmdb_rating.toFixed(1)} / 10
                    </span>
                  </div>
                )}
                {show.tmdb_id && (
                  <div className="text-xs sm:text-sm text-text-muted">
                    TMDB ID: {show.tmdb_id}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Description</h2>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">{show.description}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Reviews</h2>
            <ReviewList reviews={reviews} />
            <ReviewForm showId={id!} onSuccess={refreshReviews} />
          </div>
        </>
      )}
    </div>
  );
}

export default ShowPage;
