import ReactMarkdown from "react-markdown";
import type { Review } from "../../types";

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-neutral-400 mt-6">
        No reviews yet. Be the first to review!
      </p>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="rounded-xl bg-neutral-900 border border-neutral-800 p-5"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{review.title}</h3>
            <span className="text-sm">Rating: {review.rating}/5</span>
          </div>

          <p className="text-sm text-neutral-400 mb-3">
            by {review.name}
          </p>

          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{review.review}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}

