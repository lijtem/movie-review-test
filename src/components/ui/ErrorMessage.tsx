import { Button } from './Button';

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <div className="my-10 flex flex-col items-center justify-center">
            <div className="rounded-card bg-error-light border border-error/50 p-4 text-text-main">
                <h3>Error</h3>
                <p>{message}</p>
            </div>
            {onRetry && (
                <Button variant="error" size="sm" onClick={onRetry} className="mt-4">
                    Try Again
                </Button>
            )}
        </div>
    );
}
