import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function NavBar() {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path: string) => {
        return location.pathname === path ? 'text-white font-bold' : 'text-gray-400 hover:text-white transition-colors';
    };

    return (
        <nav className="bg-black/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-4">
                <div className="flex items-center justify-between">
                    <Link to={'/'} className="text-primary text-2xl sm:text-3xl font-bold no-underline truncate">
                        Movie Review
                    </Link>

                    <div className="hidden md:flex gap-6 lg:gap-8">
                        <Link to={'/'} className={`${isActive('/')} text-base lg:text-lg no-underline`}>
                            Home
                        </Link>
                        <Link to={'/category/genres'} className={`${isActive('/category/genres')} text-base lg:text-lg no-underline`}>
                            Genres
                        </Link>
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-2 flex flex-col gap-3">
                        <Link
                            to={'/'}
                            className={`${isActive('/')} text-base no-underline py-2`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to={'/category/genres'}
                            className={`${isActive('/category/genres')} text-base no-underline py-2`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Genres
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

