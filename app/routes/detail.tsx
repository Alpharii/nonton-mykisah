import { ArrowLeft, Flame, Star } from 'lucide-react';
import { useLoaderData, useNavigate } from 'react-router';
import type { LoaderFunctionArgs, MetaArgs } from 'react-router';
import AnimeCard from '~/components/AnimeCard';
import { Badge } from '~/components/ui/badge';
import { fetchUtils } from '~/lib/fetchUtil';
import type { Anime } from '~/types/Anime';
import type { DetailAnimeResponse } from '~/types/DetailAnimeResponse';

export function meta({ data }: { data: DetailAnimeResponse }) {
  if (!data) {
    return [{ title: 'Nonton Anime Sub Indo' }];
  }

  return [
    { title: `${data.info.judul} — Nonton Anime Sub Indo` },
    {
      name: 'description',
      content: data.streaming_title || data.info.judul,
    },
  ];
}

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  const data = await fetchUtils.get(`/anime/${slug}`);

  return data.data.data as DetailAnimeResponse;
}

export default function DetailAnime() {
  const data = useLoaderData();
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto px-4 pt-2 pb-10">
      <button
        onClick={() => navigate(-1)}
        className="
          flex items-center gap-2
          w-fit
          px-3 py-2
          rounded-lg
          text-slate-300
          hover:text-white
          hover:bg-slate-800
          transition mb-3
        "
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="space-y-10">
        {/* TOP INFO */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <div className="grid md:grid-cols-[250px_1fr] gap-8">
            <img
              src={data.thumbnail}
              alt={data.title}
              className="
                w-full
                aspect-[2/3]
                object-cover
                rounded-xl
                ring-1 ring-slate-800
              "
            />

            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold">{data.info.judul}</h1>
                <p className="text-slate-400">{data.info.japanese}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-lg font-semibold">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  {data.info.skor}
                </div>

                <Badge className="bg-indigo-600 border-0">
                  {data.info.status}
                </Badge>

                <Badge variant="secondary">{data.info.tipe}</Badge>
              </div>

              <div className="flex flex-wrap gap-2">
                {data.info.genres.map((genre: string) => (
                  <Badge
                    key={genre}
                    className="bg-slate-800 hover:bg-slate-700"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-slate-300">
                <span>Studio: {data.info.studio}</span>
                <span>Produser: {data.info.produser}</span>
                <span>Durasi: {data.info.durasi}</span>
                <span>Total Episode: {data.info.total_episode}</span>
                <span>Rilis: {data.info.tanggal_rilis}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SYNOPSIS */}
        {data.synopsis && (
          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-3">Synopsis</h2>

            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {data.synopsis}
            </p>
          </section>
        )}

        {/* EPISODES */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold mb-5">
            <Flame className="w-5 h-5 text-orange-400" />
            Episodes
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {data.episodes.map((ep: any) => (
              <a
                key={ep.slug}
                href={`/episode/${ep.slug}`}
                className="
                  p-4
                  bg-slate-800
                  hover:bg-slate-700
                  rounded-xl
                  transition
                  border border-slate-700
                  hover:border-indigo-500
                "
              >
                <p className="font-semibold line-clamp-2">{ep.title}</p>

                <p className="text-sm text-slate-400 mt-1">{ep.release_date}</p>
              </a>
            ))}
          </div>
        </section>

        {/* 🔥 REKOMENDASI */}
        {data.rekomendasi?.length > 0 && (
          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-5">
              Rekomendasi Anime Lainnya
            </h2>

            <div
              className="
              grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              gap-4
            "
            >
              {data.rekomendasi.map((anime: Anime) => (
                <AnimeCard
                  key={anime.slug}
                  anime={anime}
                  isHaveStatus={false}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
