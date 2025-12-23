import type { Show } from "../../types";
import { ShowCard } from "../show";

interface Props {
  title: string;
  description: string;
  shows: Show[];
}

export function CategorySection({ title, description, shows }: Props) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      <h5 className="mb-4 text-sm text-gray-400">{description}</h5>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-neutral-700">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </section>
  );
}

