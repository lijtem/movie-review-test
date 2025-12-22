import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
    it('renders correctly', () => {
        render(
            <BrowserRouter>
                <NotFoundPage />
            </BrowserRouter>
        );

        expect(screen.getByText('404')).toBeInTheDocument();
        expect(screen.getByText(/the page you're looking for doesn't exist/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Back to Home/i })).toBeInTheDocument();
    });
});
