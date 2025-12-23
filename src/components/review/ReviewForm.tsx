import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { type Review } from "../../types";
import { createReview } from "../../api/endpoints/reviews";
import { reviewFormSchema, type ReviewFormData } from "../../lib/schemas/review.schema";
import { VALIDATION } from "../../lib/config/validation";

interface Props {
    showId: string;
    onSuccess?: () => void;
}

export function ReviewForm({ showId, onSuccess }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isValid },
    } = useForm<ReviewFormData>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: {
            name: '',
            title: '',
            content: '',
            rating: 0,
        },
        mode: 'onBlur',
    });

    const onSubmit = async (data: ReviewFormData) => {
        try {
            const review: Review = {
                name: data.name,
                title: data.title,
                review: data.content,
                rating: data.rating,
                show_id: showId,
                date_created: new Date().toISOString(),
            };
            const response = await createReview(review);
            if (response.data) {
                reset();
                toast.success('Review submitted!', {
                    description: 'Thanks for sharing your thoughts.',
                });
                onSuccess?.();
            }
        } catch (_err) {
            toast.error('Failed to submit review', {
                description: 'Please try again.',
            });
        }
    };

    return (
        <form className="mt-10 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-xl font-semibold">Leave a Review</h2>

            <div>
                <input
                    {...register('name')}
                    className={`w-full rounded bg-neutral-900 border p-3 ${
                        errors.name ? 'border-red-600' : 'border-neutral-800'
                    }`}
                    placeholder="Your name"
                    maxLength={VALIDATION.REVIEW.NAME_MAX_LENGTH}
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                )}
            </div>

            <div>
                <input
                    {...register('title')}
                    className={`w-full rounded bg-neutral-900 border p-3 ${
                        errors.title ? 'border-red-600' : 'border-neutral-800'
                    }`}
                    placeholder="Review title"
                    maxLength={VALIDATION.REVIEW.TITLE_MAX_LENGTH}
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
                )}
            </div>

            <div>
                <textarea
                    {...register('content')}
                    rows={5}
                    className={`w-full rounded bg-neutral-900 border p-3 ${
                        errors.content ? 'border-red-600' : 'border-neutral-800'
                    }`}
                    placeholder="Write your review (Markdown supported)"
                    maxLength={VALIDATION.REVIEW.CONTENT_MAX_LENGTH}
                />
                {errors.content && (
                    <p className="mt-1 text-sm text-red-400">{errors.content.message}</p>
                )}
            </div>

            <div>
                <select
                    {...register('rating', { valueAsNumber: true })}
                    className={`w-full rounded bg-neutral-900 border p-3 ${
                        errors.rating ? 'border-red-600' : 'border-neutral-800'
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
                    <p className="mt-1 text-sm text-red-400">{errors.rating.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`rounded px-6 py-3 font-medium transition align-right ${
                    isValid && !isSubmitting
                        ? 'bg-red-600 hover:bg-red-700 cursor-pointer'
                        : 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                }`}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
        </form>
    );
}
