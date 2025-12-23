import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReviewForm } from './ReviewForm';
import { createReview } from '../../api/endpoints/reviews';
import { toast } from 'sonner';

vi.mock('../../api/endpoints/reviews', () => ({
    createReview: vi.fn(),
}));

vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe('ReviewForm', () => {
    const mockOnSuccess = vi.fn();
    const showId = '101';

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the form correctly', () => {
        render(<ReviewForm showId={showId} />);
        expect(screen.getByText(/Leave a Review/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Your name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Review title/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Write your review/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Submit Review/i })).toBeDisabled();
    });

    it('shows validation errors when fields are touched and invalid', async () => {
        const user = userEvent.setup();
        render(<ReviewForm showId={showId} />);

        const nameInput = screen.getByPlaceholderText(/Your name/i);
        await user.type(nameInput, 'a'); // Too short
        await user.tab(); // Blur to trigger validation

        expect(await screen.findByText(/Name must be between/i)).toBeInTheDocument();
    });

    it('enables the submit button when the form is valid', async () => {
        const user = userEvent.setup();
        render(<ReviewForm showId={showId} />);

        await user.type(screen.getByPlaceholderText(/Your name/i), 'John Doe');
        await user.type(screen.getByPlaceholderText(/Review title/i), 'Great Show');
        await user.type(screen.getByPlaceholderText(/Write your review/i), 'This is a long enough review for testing.');
        await user.selectOptions(screen.getByRole('combobox'), '5');

        // Blur all fields to trigger validation
        await user.tab();

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Submit Review/i })).not.toBeDisabled();
        });
    });

    it('submits the form successfully', async () => {
        const user = userEvent.setup();
        vi.mocked(createReview).mockResolvedValue({ data: {} as any } as any);

        render(<ReviewForm showId={showId} onSuccess={mockOnSuccess} />);

        await user.type(screen.getByPlaceholderText(/Your name/i), 'John Doe');
        await user.type(screen.getByPlaceholderText(/Review title/i), 'Great Show');
        await user.type(screen.getByPlaceholderText(/Write your review/i), 'This is a long enough review for testing.');
        await user.selectOptions(screen.getByRole('combobox'), '5');
        await user.tab();

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Submit Review/i })).not.toBeDisabled();
        });

        await user.click(screen.getByRole('button', { name: /Submit Review/i }));

        await waitFor(() => {
            expect(createReview).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalledWith('Review submitted!', expect.any(Object));
            expect(mockOnSuccess).toHaveBeenCalled();
        });
    });

    it('handles submission error', async () => {
        const user = userEvent.setup();
        vi.mocked(createReview).mockRejectedValue(new Error('Server error'));

        render(<ReviewForm showId={showId} />);

        await user.type(screen.getByPlaceholderText(/Your name/i), 'John Doe');
        await user.type(screen.getByPlaceholderText(/Review title/i), 'Great Show');
        await user.type(screen.getByPlaceholderText(/Write your review/i), 'This is a long enough review for testing.');
        await user.selectOptions(screen.getByRole('combobox'), '5');
        await user.tab();

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /Submit Review/i })).not.toBeDisabled();
        });

        await user.click(screen.getByRole('button', { name: /Submit Review/i }));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Failed to submit review', expect.any(Object));
        });
    });
});
