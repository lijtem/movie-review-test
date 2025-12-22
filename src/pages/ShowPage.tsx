import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ApiError } from "../types";
import { ReviewList } from "../components/ReviewList";
import { ReviewForm } from "../components/ReviewForm";
import { ErrorMessage } from "../components/ErrorMessage";
import { useShow } from "../hooks/useShow";
import { useReviews } from "../hooks/useReviews";
import { formatDate } from "../utils/formatters";
import { ArrowLeftIcon, CalendarIcon, StarIcon } from "../components/Icons";
import { Skeleton } from "../components/Skeleton";

function ShowPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: showData, isLoading: showLoading, error: showError } = useShow(id!);
  const { data: reviewsData, isLoading: reviewsLoading, error: reviewsError } = useReviews(id!);

  const loading = showLoading || reviewsLoading;
  const error = showError || reviewsError;
  const show = showData?.data;
  const reviews = reviewsData?.data || [];


  const refreshReviews = () => {
    queryClient.invalidateQueries({ queryKey: ['reviews', id] });
  };

  return (
    <div className="max-w-[1400px] mx-auto px-12 py-8 h-full">
      {loading && (
        <div className="flex flex-col md:flex-row gap-8 mb-8 animate-pulse">
          <div className="w-full md:w-80 shrink-0">
            <Skeleton className="aspect-[2/3] w-full" />
          </div>
          <div className="flex-1">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <div className="flex gap-4 mb-6">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </div>
      )}
      {error && (
        <div className="max-w-[1200px] mx-auto py-12 px-8">
          <ErrorMessage message={error instanceof ApiError ? error.message : 'Failed to load show'} onRetry={() => window.location.reload()} />
        </div>
      )}
      {show && (
        <>
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon />
            Back
          </button>

          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-80 shrink-0">
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-neutral-800">
                <img
                  src={show.thumbnail_src}
                  alt={show.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{show.title}</h1>

              <div className="flex flex-wrap items-center gap-4 mb-6 text-neutral-400">
                {show.release_date && (
                  <div className="flex items-center gap-2">
                    <CalendarIcon />
                    <span>{formatDate(show.release_date)}</span>
                  </div>
                )}
                {show.tmdb_rating && (
                  <div className="flex items-center gap-2">
                    <StarIcon />
                    <span className="font-semibold text-white">
                      {show.tmdb_rating.toFixed(1)} / 10
                    </span>
                  </div>
                )}
                {show.tmdb_id && (
                  <div className="text-sm">
                    TMDB ID: {show.tmdb_id}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-neutral-300 leading-relaxed">{show.description}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <ReviewList reviews={reviews} />
            <ReviewForm showId={id!} onSuccess={refreshReviews} />
          </div>
        </>
      )}
    </div>
  );
}

export default ShowPage;