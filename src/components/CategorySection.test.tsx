import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { CategorySection } from './CategorySection';
import type { Show } from '../types';

const mockShows: Show[] = [
    {
        id: '1',
        title: 'Movie 1',
        description: 'Description 1',
        thumbnail_src: 'img1.jpg',
        release_date: '2023-01-01',
        tmdb_id: 1,
        tmdb_rating: 8.0,
        reviews: [],
    },
];

describe('CategorySection', () => {
    it('renders the title and description', () => {
        render(
            <BrowserRouter>
                <CategorySection title="Action" description="Action movies" shows={mockShows} />
            </BrowserRouter>
        );

        expect(screen.getByText('Action')).toBeInTheDocument();
        expect(screen.getByText('Action movies')).toBeInTheDocument();
    });

    it('renders the list of shows', () => {
        render(
            <BrowserRouter>
                <CategorySection title="Action" description="Action movies" shows={mockShows} />
            </BrowserRouter>
        );

        expect(screen.getByText('Movie 1')).toBeInTheDocument();
    });
});
