
import { useNavigate } from "react-router-dom";
import type { Show } from "../types";

export function ShowCard({ show }: { show: Show }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/show/${show.id}`)}
      className="w-full cursor-pointer group"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-neutral-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img
          src={show.thumbnail_src}
          alt={show.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <span className="absolute top-2 right-2 rounded-md bg-black/80 backdrop-blur-sm px-2 py-1 text-xs font-semibold flex items-center gap-1">
          <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {show.tmdb_rating.toFixed(1)}
        </span>
      </div>

      <h3 className="mt-2 text-xs sm:text-sm font-medium line-clamp-2 text-gray-200 group-hover:text-white transition-colors">
        {show.title}
      </h3>
    </div>
  );
}