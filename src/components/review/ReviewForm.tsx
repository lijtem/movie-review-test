import { useFormReview } from '../../hooks/useFormReview';
import { VALIDATION } from '../../lib/config/validation';

interface Props {
    showId: string;
    onSuccess?: () => void;
}

export function ReviewForm({ showId, onSuccess }: Props) {
    const { onSubmit, isPending, isValid, errors, register } = useFormReview(showId, { onSuccess });

    return (
        <form className="mt-10 space-y-4" onSubmit={onSubmit}>
            <h2 className="text-xl font-semibold">Leave a Review</h2>

            <div>
                <input
                    {...register('name')}
                    className={`w-full rounded bg-surface border p-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors duration-base ${
                        errors.name ? 'border-error' : 'border-neutral-700'
                    }`}
                    placeholder="Your name"
                    maxLength={VALIDATION.REVIEW.NAME_MAX_LENGTH}
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-error">{errors.name.message}</p>
                )}
            </div>

            <div>
                <input
                    {...register('title')}
                    className={`w-full rounded bg-surface border p-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors duration-base ${
                        errors.title ? 'border-error' : 'border-neutral-700'
                    }`}
                    placeholder="Review title"
                    maxLength={VALIDATION.REVIEW.TITLE_MAX_LENGTH}
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-error">{errors.title.message}</p>
                )}
            </div>

            <div>
                <textarea
                    {...register('content')}
                    rows={5}
                    className={`w-full rounded bg-surface border p-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors duration-base ${
                        errors.content ? 'border-error' : 'border-neutral-700'
                    }`}
                    placeholder="Write your review (Markdown supported)"
                    maxLength={VALIDATION.REVIEW.CONTENT_MAX_LENGTH}
                />
                {errors.content && (
                    <p className="mt-1 text-sm text-error">{errors.content.message}</p>
                )}
            </div>

            <div>
                <select
                    {...register('rating', { valueAsNumber: true })}
                    className={`w-full rounded bg-surface border p-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors duration-base ${
                        errors.rating ? 'border-error' : 'border-neutral-700'
                    }`}
                >
                    <option value={0}>Rating</option>
                    {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>
                            {r} Star{r > 1 ? "s" : ""}
                        </option>
                    ))}
                </select>
                {errors.rating && (
                    <p className="mt-1 text-sm text-error">{errors.rating.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={!isValid || isPending}
                className={`rounded-button px-6 py-3 font-medium transition-all duration-base text-right ${
                    isValid && !isPending
                        ? 'bg-primary hover:bg-primary-hover cursor-pointer text-white'
                        : 'bg-neutral-700 text-text-muted cursor-not-allowed'
                }`}
            >
                {isPending ? 'Submitting...' : 'Submit Review'}
            </button>
        </form>
    );
}
