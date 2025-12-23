import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}


export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }
    static getDerivedStateFromError(_error: Error): Partial<State> {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.setState({
            error,
            errorInfo,
        });
    }

    handleReset = (): void => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };
    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-background flex items-center justify-center p-8">
                    <div className="max-w-2xl w-full bg-surface rounded-lg p-8 border border-white/10">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-primary mb-4">
                                Something went wrong
                            </h1>
                            <p className="text-gray-400 text-lg">
                                We apologize for the inconvenience. An unexpected error has occurred.
                            </p>
                        </div>

                        {this.state.error && (
                            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 mb-6">
                                <h2 className="text-red-400 font-semibold mb-2">Error Details:</h2>
                                <p className="text-sm text-red-300 font-mono break-all">
                                    {this.state.error.toString()}
                                </p>
                            </div>
                        )}

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={this.handleReset}
                                className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="bg-surface hover:bg-white/10 text-white border border-white/20 px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Go to Home
                            </button>
                        </div>

                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

