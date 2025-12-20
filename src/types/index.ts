export interface CategoryCollectionItem {
    sort: number;
    category_id: {
        id: string;
        title: string;
        description: string;
    };
}

export interface Category {
    id: string;
    title: string;
    description: string;
    shows: number[];
}

export interface CategoryShowItem {
    show_id: Show;
}

export interface Show {
    id: string;
    tmdb_rating: number;
    tmdb_id: number;
    thumbnail_src: string;
    release_date: string;
    title: string;
    description: string;
    reviews: string[];
}

// to do
export interface Review {
    id: string;
    date_created: string;
    review: string;
    rating: number;
    title: string;
    show_id: string;
    name: string;
}


export interface DirectusResponse<T> {
    data: T;
    meta?: {
        total_count: number;
        filter_count: number;
    };
}

export class ApiError extends Error {
    public readonly statusCode?: number;
    public readonly originalError?: unknown;

    constructor(message: string, statusCode?: number, originalError?: unknown) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.originalError = originalError;
    }
}

export class NetworkError extends ApiError {
    constructor(message: string, originalError?: unknown) {
        super(message, undefined, originalError);
        this.name = 'NetworkError';
    }
}

export class RetryExhaustedError extends ApiError {
    constructor(message: string, originalError?: unknown) {
        super(message, undefined, originalError);
        this.name = 'RetryExhaustedError';
    }
}

