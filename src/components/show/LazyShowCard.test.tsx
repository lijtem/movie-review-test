import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { LazyShowCard } from './LazyShowCard';
import type { Show } from '../../types';

class MockIntersectionObserver {
    observe = vi.fn();
    disconnect = vi.fn();
    unobserve = vi.fn();
    callback: IntersectionObserverCallback;

    constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
    }
}

window.IntersectionObserver = MockIntersectionObserver as any;

const mockShow: Show = {
    id: '1',
    title: 'Test Movie',
    description: 'Test Description',
    thumbnail_src: 'test.jpg',
    tmdb_rating: 8.5,
    tmdb_id: 123,
    release_date: '2024-01-01',
    reviews: [],
};

describe('LazyShowCard', () => {
    it('renders skeleton placeholder initially', () => {
        const { container } = render(
            <BrowserRouter>
                <LazyShowCard show={mockShow} />
            </BrowserRouter>
        );

        const skeleton = container.querySelector('.animate-pulse');
        expect(skeleton).toBeInTheDocument();
        expect(screen.queryByText('Test Movie')).not.toBeInTheDocument();
    });

    it('renders ShowCard when visible', () => {
        render(
            <BrowserRouter>
                <LazyShowCard show={mockShow} />
            </BrowserRouter>
        );
        
        expect(screen.queryByText('Test Movie')).not.toBeInTheDocument();
    });
});

