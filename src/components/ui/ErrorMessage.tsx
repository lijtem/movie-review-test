interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <div className="my-10 flex flex-col items-center justify-center">
            <div className="rounded bg-red-900/20 border border-red-500/50 p-4 text-black-200">
                <h3>Error</h3>
                <p>{message}</p>
            </div>
            {onRetry && (
                <button onClick={onRetry} className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">
                    Try Again
                </button>
            )}
        </div>
    );
}

