export interface RetryOptions {
    maxRetries?: number;
    initialDelayMs?: number;
    maxDelayMs?: number;
    backoffMultiplier?: number;
    retryableStatusCodes?: number[];
}

const DEFAULT_OPTIONS: Required<Omit<RetryOptions, 'retryableStatusCodes'>> & { retryableStatusCodes: number[] } = {
    maxRetries: 3,
    initialDelayMs: 1000,
    maxDelayMs: 10000,
    backoffMultiplier: 2,
    retryableStatusCodes: [408, 429, 500, 502, 503, 504],
};


function calculateDelay(attempt: number, options: Required<RetryOptions>): number {
    const exponentialDelay = options.initialDelayMs * Math.pow(options.backoffMultiplier, attempt);
    const delayWithJitter = exponentialDelay + Math.random() * 1000;
    return Math.min(delayWithJitter, options.maxDelayMs);
}


function isRetryableError(error: unknown, retryableStatusCodes: number[]): boolean {
    if (error && typeof error === 'object' && 'status' in error) {
        const status = error.status as number;
        return retryableStatusCodes.includes(status);
    }
    return true;
}


function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


export async function withRetry<T>(
    fn: () => Promise<T>,
    options: RetryOptions = {}
): Promise<T> {
    const config = { ...DEFAULT_OPTIONS, ...options };

    let lastError: unknown;

    for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (attempt === config.maxRetries) {
                break;
            }
            if (!isRetryableError(error, config.retryableStatusCodes)) {
                throw error;
            }

            const delayMs = calculateDelay(attempt, config);
            await delay(delayMs);
        }
    }

    throw lastError;
}

