import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReviewForm } from './ReviewForm';
import { createReview } from '../../api/endpoints/reviews';

vi.mock('../../api/endpoints/reviews', () => ({
    createReview: vi.fn(),
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
        render(<ReviewForm showId={showId} />);

        const nameInput = screen.getByPlaceholderText(/Your name/i);
        fireEvent.change(nameInput, { target: { value: 'a' } }); // Too short

        expect(await screen.findByText(/Name must be between/i)).toBeInTheDocument();
    });

    it('enables the submit button when the form is valid', async () => {
        render(<ReviewForm showId={showId} />);

        fireEvent.change(screen.getByPlaceholderText(/Your name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText(/Review title/i), { target: { value: 'Great Show' } });
        fireEvent.change(screen.getByPlaceholderText(/Write your review/i), { target: { value: 'This is a long enough review for testing.' } });
        fireEvent.change(screen.getByRole('combobox'), { target: { value: '5' } });

        expect(screen.getByRole('button', { name: /Submit Review/i })).not.toBeDisabled();
    });

    it('submits the form successfully', async () => {
        vi.mocked(createReview).mockResolvedValue({ data: {} as any } as any);

        render(<ReviewForm showId={showId} onSuccess={mockOnSuccess} />);

        fireEvent.change(screen.getByPlaceholderText(/Your name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText(/Review title/i), { target: { value: 'Great Show' } });
        fireEvent.change(screen.getByPlaceholderText(/Write your review/i), { target: { value: 'This is a long enough review for testing.' } });
        fireEvent.change(screen.getByRole('combobox'), { target: { value: '5' } });

        fireEvent.click(screen.getByRole('button', { name: /Submit Review/i }));

        await waitFor(() => {
            expect(createReview).toHaveBeenCalled();
            expect(screen.getByText(/Review submitted successfully/i)).toBeInTheDocument();
            expect(mockOnSuccess).toHaveBeenCalled();
        });
    });

    it('handles submission error', async () => {
        vi.mocked(createReview).mockRejectedValue(new Error('Server error'));

        render(<ReviewForm showId={showId} />);

        fireEvent.change(screen.getByPlaceholderText(/Your name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText(/Review title/i), { target: { value: 'Great Show' } });
        fireEvent.change(screen.getByPlaceholderText(/Write your review/i), { target: { value: 'This is a long enough review for testing.' } });
        fireEvent.change(screen.getByRole('combobox'), { target: { value: '5' } });

        fireEvent.click(screen.getByRole('button', { name: /Submit Review/i }));

        await waitFor(() => {
            expect(screen.getByText(/Failed to submit review/i)).toBeInTheDocument();
        });
    });
});

