import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
    it('renders correct message', () => {
        const message = 'Test error message';
        render(<ErrorMessage message={message} />);
        expect(screen.getByText(message)).toBeInTheDocument();
    });

    it('calls onRetry when retry button is clicked', () => {
        const onRetry = vi.fn();
        render(<ErrorMessage message="Error" onRetry={onRetry} />);

        const retryButton = screen.getByText(/try again/i);
        fireEvent.click(retryButton);

        expect(onRetry).toHaveBeenCalledTimes(1);
    });

    it('does not render retry button if onRetry is not provided', () => {
        render(<ErrorMessage message="Error" />);
        expect(screen.queryByText(/try again/i)).not.toBeInTheDocument();
    });
});

