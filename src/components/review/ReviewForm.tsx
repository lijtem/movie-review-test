import { useState, useMemo } from "react";
import { type Review } from "../../types";
import { createReview } from "../../api/endpoints/reviews";
import { VALIDATION, VALIDATION_MESSAGES } from "../../lib/config/validation";

interface Props {
    showId: string;
    onSuccess?: () => void;
}

interface ValidationErrors {
    name?: string;
    title?: string;
    content?: string;
    rating?: string;
}

export function ReviewForm({ showId, onSuccess }: Props) {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const validateName = (value: string): string | undefined => {
        if (!value.trim()) {
            return VALIDATION_MESSAGES.REVIEW.NAME_REQUIRED;
        }
        if (value.length < VALIDATION.REVIEW.NAME_MIN_LENGTH || value.length > VALIDATION.REVIEW.NAME_MAX_LENGTH) {
            return VALIDATION_MESSAGES.REVIEW.NAME_LENGTH;
        }
        return undefined;
    };

    const validateTitle = (value: string): string | undefined => {
        if (!value.trim()) {
            return VALIDATION_MESSAGES.REVIEW.TITLE_REQUIRED;
        }
        if (value.length < VALIDATION.REVIEW.TITLE_MIN_LENGTH || value.length > VALIDATION.REVIEW.TITLE_MAX_LENGTH) {
            return VALIDATION_MESSAGES.REVIEW.TITLE_LENGTH;
        }
        return undefined;
    };

    const validateContent = (value: string): string | undefined => {
        if (!value.trim()) {
            return VALIDATION_MESSAGES.REVIEW.CONTENT_REQUIRED;
        }
        if (value.length < VALIDATION.REVIEW.CONTENT_MIN_LENGTH || value.length > VALIDATION.REVIEW.CONTENT_MAX_LENGTH) {
            return VALIDATION_MESSAGES.REVIEW.CONTENT_LENGTH;
        }
        return undefined;
    };

    const validateRating = (value: number): string | undefined => {
        if (value === 0) {
            return VALIDATION_MESSAGES.REVIEW.RATING_REQUIRED;
        }
        return undefined;
    };

    const isFormValid = useMemo(() => {
        const nameError = validateName(name);
        const titleError = validateTitle(title);
        const contentError = validateContent(content);
        const ratingError = validateRating(rating);

        return !nameError && !titleError && !contentError && !ratingError;
    }, [name, title, content, rating]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        const error = validateName(value);
        setValidationErrors(prev => ({ ...prev, name: error }));
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTitle(value);
        const error = validateTitle(value);
        setValidationErrors(prev => ({ ...prev, title: error }));
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setContent(value);
        const error = validateContent(value);
        setValidationErrors(prev => ({ ...prev, content: error }));
    };

    const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = Number(e.target.value);
        setRating(value);
        const error = validateRating(value);
        setValidationErrors(prev => ({ ...prev, rating: error }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        const nameError = validateName(name);
        const titleError = validateTitle(title);
        const contentError = validateContent(content);
        const ratingError = validateRating(rating);

        const errors: ValidationErrors = {
            name: nameError,
            title: titleError,
            content: contentError,
            rating: ratingError,
        };

        setValidationErrors(errors);

        if (nameError || titleError || contentError || ratingError) {
            return;
        }

        try {
            const review: Review = {
                name,
                title,
                review: content,
                rating,
                show_id: showId,
                date_created: new Date().toISOString(),
            };
            const response = await createReview(review);
            if (response.data) {
                setName('');
                setTitle('');
                setContent('');
                setRating(0);
                setValidationErrors({});
                setSuccess(true);
                setError(null);
                onSuccess?.();
            }
        } catch (_err) {
            setError('Failed to submit review. Please try again.');
            setSuccess(false);
        }
    };
    return (
        <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold">Leave a Review</h2>

            {success && (
                <div className="rounded bg-green-600/20 border border-green-600 text-green-400 p-3">
                    Review submitted successfully!
                </div>
            )}

            {error && (
                <div className="rounded bg-red-600/20 border border-red-600 text-red-400 p-3">
                    {error}
                </div>
            )}

            <div>
                <input
                    className={`w-full rounded bg-neutral-900 border p-3 ${validationErrors.name ? 'border-red-600' : 'border-neutral-800'
                        }`}
                    placeholder="Your name"
                    value={name}
                    onChange={handleNameChange}
                    maxLength={VALIDATION.REVIEW.NAME_MAX_LENGTH}
                />
                {validationErrors.name && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.name}</p>
                )}
            </div>

            <div>
                <input
                    className={`w-full rounded bg-neutral-900 border p-3 ${validationErrors.title ? 'border-red-600' : 'border-neutral-800'
                        }`}
                    placeholder="Review title"
                    value={title}
                    onChange={handleTitleChange}
                    maxLength={VALIDATION.REVIEW.TITLE_MAX_LENGTH}
                />
                {validationErrors.title && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.title}</p>
                )}
            </div>

            <div>
                <textarea
                    rows={5}
                    className={`w-full rounded bg-neutral-900 border p-3 ${validationErrors.content ? 'border-red-600' : 'border-neutral-800'
                        }`}
                    placeholder="Write your review (Markdown supported)"
                    value={content}
                    onChange={handleContentChange}
                    maxLength={VALIDATION.REVIEW.CONTENT_MAX_LENGTH}
                />
                {validationErrors.content && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.content}</p>
                )}
            </div>

            <div>
                <select
                    className={`w-full rounded bg-neutral-900 border p-3 ${validationErrors.rating ? 'border-red-600' : 'border-neutral-800'
                        }`}
                    value={rating}
                    onChange={handleRatingChange}
                >
                    <option value={0}>Rating</option>
                    {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>
                            {r} Star{r > 1 ? "s" : ""}
                        </option>
                    ))}
                </select>
                {validationErrors.rating && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.rating}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={!isFormValid}
                className={`rounded px-6 py-3 font-medium transition align-right ${isFormValid
                    ? 'bg-red-600 hover:bg-red-700 cursor-pointer'
                    : 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                    }`}
            >
                Submit Review
            </button>
        </form>
    );
}

