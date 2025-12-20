
import { useNavigate } from "react-router-dom";
import type { Show } from "../types";

export function ShowCard({ show }: { show: Show }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/show/${show.id}`)}
      className="w-40 shrink-0 cursor-pointer group"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-neutral-800">
        <img
          src={show.thumbnail_src}
          alt={show.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <span className="absolute top-2 right-2 rounded bg-black/70 px-2 py-0.5 text-xs font-medium">
          Rating: {show.tmdb_rating.toFixed(1)}
        </span>
      </div>

      <h3 className="mt-2 text-sm font-medium line-clamp-2">
        {show.title}
      </h3>
    </div>
  );
}