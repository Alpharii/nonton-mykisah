import { Badge } from '~/components/ui/badge';
import type { Anime } from '~/types/Anime';

type Props = {
  anime: Anime;
  isHaveStatus: boolean;
};

export default function AnimeCard({ anime, isHaveStatus }: Props) {
  return (
    <a
      href={`/detail/${anime.slug}`}
      className="
        group relative block
        rounded-2xl
        overflow-hidden
        bg-slate-900
        ring-1 ring-slate-800
        hover:ring-slate-600
        transition
      "
    >
      <img
        src={anime.thumbnail}
        alt={anime.title}
        className="
          aspect-[2/3] w-full object-cover
          transition duration-500
          group-hover:scale-110
        "
      />

      <div
        className="
        absolute inset-0
        bg-gradient-to-t
        from-black
        via-black/40
        to-transparent
      "
      />

      <div className="absolute bottom-0 p-4 w-full text-white">
        {isHaveStatus && (
          <Badge className="mb-2 capitalize bg-indigo-600 border-0">
            {anime.type}
          </Badge>
        )}

        <h3 className="font-bold leading-tight line-clamp-2">{anime.title}</h3>

        <p className="text-sm text-white/80">{anime.episodeInfo}</p>

        <div className="flex justify-between text-xs text-white/70 mt-1">
          <span>{anime.meta}</span>
          <span>{anime.date}</span>
        </div>
      </div>
    </a>
  );
}
