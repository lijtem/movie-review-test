import { Link } from "react-router-dom";

function NotFoundPage() {
  return <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
    <h1 className="text-6xl font-bold text-[#e50914] mb-4">404</h1>
    <p className="text-xl text-gray-400 mb-8">Oops! The page you're looking for doesn't exist.</p>
    <Link
      to="/"
      className="bg-[#e50914] text-white px-6 py-3 rounded font-semibold hover:bg-[#b20710] transition-colors decoration-none"
    >
      Back to Home
    </Link>
  </div>;
}

export default NotFoundPage;