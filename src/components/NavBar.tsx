import { Link, useLocation } from "react-router-dom";

export function NavBar() {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? 'text-white font-bold' : 'text-gray-400 hover:text-white transition-colors';
    };
    return (
        <nav className="bg-black/50 backdrop-blur-md sticky top-0 z-50 border-b border-white/10 mb-3">
            <div className="max-w-[1400px] mx-auto px-12 py-4 flex items-center justify-between">
                <Link to={'/'} className="text-primary text-3xl font-bold no-underline">
                    Movie Review Test
                </Link>
                <div className="flex gap-8">
                    <Link to={'/'} className={`${isActive('/')} text-lg no-underline`}>
                        Home
                    </Link>
                    <Link to={'/category/genres'} className={`${isActive('/category/genres')} text-lg no-underline`}>
                        Genres
                    </Link>
                </div>
            </div>
        </nav>
    );
}