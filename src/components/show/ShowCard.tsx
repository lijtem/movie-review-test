import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import type { Show } from "../../types";

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
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          {show.tmdb_rating.toFixed(1)}
        </span>
      </div>

      <h3 className="mt-2 text-xs sm:text-sm font-medium line-clamp-2 text-gray-200 group-hover:text-white transition-colors">
        {show.title}
      </h3>
    </div>
  );
}

