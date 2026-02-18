import type { AnimeHistory } from "~/types/History";

type Props = {
  anime: AnimeHistory;
};

export default function HistoryCard({ anime }: Props) {
  const ep = anime.lastEpisode;

  return (
    <a
      href={ep.link}
      className="
        group relative block
        rounded-2xl overflow-hidden
        bg-slate-900
        ring-1 ring-slate-800
        hover:ring-indigo-500
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

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* play overlay */}
      <div
        className="
          absolute inset-0
          flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition
        "
      >
        <div className="bg-black/60 rounded-full p-3 backdrop-blur">
          ▶
        </div>
      </div>

      {/* info */}
      <div className="absolute bottom-0 p-4 w-full text-white">
        <h3 className="font-bold leading-tight line-clamp-2">
          {anime.title}
        </h3>

        <p className="text-sm text-indigo-300 font-medium">
          {ep.episode}
        </p>

        <div className="flex justify-between text-xs text-white/70 mt-1">
          <span>Lanjut nonton</span>
          <span>{new Date(ep.date).toLocaleDateString()}</span>
        </div>
      </div>
    </a>
  );
}
