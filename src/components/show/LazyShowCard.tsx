import { useEffect, useRef, useState } from 'react';
import { ShowCard } from './ShowCard';
import type { Show } from '../../types';

export function LazyShowCard({ show }: { show: Show }) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '100px',
                threshold: 0.01,
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    if (!isVisible) {
        return (
            <div ref={cardRef} className="w-full">
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-neutral-800 animate-pulse shadow-lg" />
                <div className="mt-2 h-3 sm:h-4 bg-neutral-800 rounded animate-pulse" />
            </div>
        );
    }

    return <ShowCard show={show} />;
}

