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
      <div className="relative aspect-[2/3] overflow-hidden rounded-card bg-neutral-800 shadow-card hover:shadow-card-hover transition-shadow duration-slow">
        <img
          src={show.thumbnail_src ?? undefined}
          alt={show.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-slow group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-slow" />

        {show.tmdb_rating !== null && (
          <span className="absolute top-2 right-2 rounded-button bg-background/80 backdrop-blur-sm px-2 py-1 text-xs font-semibold flex items-center gap-1">
            <Star className="w-3 h-3 text-warning fill-current" />
            {show.tmdb_rating.toFixed(1)}
          </span>
        )}
      </div>

      <h3 className="mt-2 text-xs sm:text-sm font-medium line-clamp-2 text-neutral-200 group-hover:text-text-main transition-colors">
        {show.title}
      </h3>
    </div>
  );
}
