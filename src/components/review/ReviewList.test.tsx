import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ReviewList } from './ReviewList';
import type { Review } from '../../types';

const mockReviews: Review[] = [
    {
        id: '1',
        name: 'John Doe',
        title: 'Great show!',
        review: 'I really enjoyed this one.',
        rating: 5,
        show_id: '101',
        date_created: '2023-01-01T00:00:00Z',
    },
    {
        id: '2',
        name: 'Jane Smith',
        title: 'Not bad',
        review: 'It was okay, but a bit slow.',
        rating: 3,
        show_id: '101',
        date_created: '2023-01-02T00:00:00Z',
    },
];

describe('ReviewList', () => {
    it('renders a message when there are no reviews', () => {
        render(<ReviewList reviews={[]} />);
        expect(screen.getByText(/No reviews yet/i)).toBeInTheDocument();
    });

    it('renders a list of reviews', () => {
        render(<ReviewList reviews={mockReviews} />);

        expect(screen.getByText('Great show!')).toBeInTheDocument();
        expect(screen.getByText('by John Doe')).toBeInTheDocument();
        expect(screen.getByText('Rating: 5/5')).toBeInTheDocument();
        expect(screen.getByText('I really enjoyed this one.')).toBeInTheDocument();

        expect(screen.getByText('Not bad')).toBeInTheDocument();
        expect(screen.getByText('by Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('Rating: 3/5')).toBeInTheDocument();
        expect(screen.getByText('It was okay, but a bit slow.')).toBeInTheDocument();
    });
});

