import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import { ApiError, type Review, type Show } from "../types";
import { ReviewList } from "../components/ReviewList";
import { ReviewForm } from "../components/ReviewForm";

function ShowPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState<Show | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const [showResponse, reviewsResponse] = await Promise.all([
          api.getShowById(id!),
          api.getReviewsByShowId(id!)
        ]);
        if (!showResponse.data) {
          setError('Show not found');
          setLoading(false);
          return;
        }
        setShow(showResponse.data);
        setReviews(reviewsResponse.data || []);
      } catch (error) {
        setError(error instanceof ApiError ? error.message : 'Failed to load show');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const refreshReviews = async () => {
    if (!id) return;
    try {
      const reviewsResponse = await api.getReviewsByShowId(id);
      setReviews(reviewsResponse.data || []);
    } catch (error) {
      console.error('Failed to refresh reviews:', error);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-12 py-8 h-full">
      {loading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-neutral-400">Loading...</div>
        </div>
      )}
      {error && (
        <div className="rounded bg-red-900/20 border border-red-500/50 p-4 text-red-200">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      )}
      {show && (
        <>
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 005.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                      />
                    </svg>
                    <span>{formatDate(show.release_date)}</span>
                  </div>
                )}
                {show.tmdb_rating && (
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
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