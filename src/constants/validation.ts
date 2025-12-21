export const VALIDATION = {
    REVIEW: {
        TITLE_MAX_LENGTH: 100,
        TITLE_MIN_LENGTH: 3,
        CONTENT_MIN_LENGTH: 10,
        CONTENT_MAX_LENGTH: 5000,
        NAME_MAX_LENGTH: 50,
        NAME_MIN_LENGTH: 2,
    },
} as const;

export const VALIDATION_MESSAGES = {
    REVIEW: {
        RATING_REQUIRED: 'Rating is required',
        TITLE_REQUIRED: 'Review title is required',
        TITLE_LENGTH: `Title must be between ${VALIDATION.REVIEW.TITLE_MIN_LENGTH} and ${VALIDATION.REVIEW.TITLE_MAX_LENGTH} characters`,
        CONTENT_REQUIRED: 'Review content is required',
        CONTENT_LENGTH: `Review must be between ${VALIDATION.REVIEW.CONTENT_MIN_LENGTH} and ${VALIDATION.REVIEW.CONTENT_MAX_LENGTH} characters`,
        NAME_REQUIRED: 'Name is required',
        NAME_LENGTH: `Name must be between ${VALIDATION.REVIEW.NAME_MIN_LENGTH} and ${VALIDATION.REVIEW.NAME_MAX_LENGTH} characters`,
    },
} as const;