import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ShowCard } from './ShowCard';
import type { Show } from '../../types';

const mockShow: Show = {
    id: '1',
    title: 'Test Movie',
    description: 'Test description',
    thumbnail_src: 'test-image.jpg',
    release_date: '2023-01-01',
    tmdb_id: 123,
    tmdb_rating: 8.5,
    reviews: [],
};

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('ShowCard', () => {
    it('renders show details correctly', () => {
        render(
            <BrowserRouter>
                <ShowCard show={mockShow} />
            </BrowserRouter>
        );

        expect(screen.getByText(mockShow.title)).toBeInTheDocument();
        expect(screen.getByText('8.5')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', mockShow.thumbnail_src);
    });

    it('navigates to show details page on click', () => {
        render(
            <BrowserRouter>
                <ShowCard show={mockShow} />
            </BrowserRouter>
        );

        const card = screen.getByText(mockShow.title).parentElement;
        fireEvent.click(card!);

        expect(mockNavigate).toHaveBeenCalledWith(`/show/${mockShow.id}`);
    });
});

