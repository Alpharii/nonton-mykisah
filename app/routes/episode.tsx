import { ArrowLeft, Flame, Star } from 'lucide-react';
import { Link, useLoaderData, useNavigate } from 'react-router';
import type { LoaderFunctionArgs, MetaArgs } from 'react-router';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { fetchUtils } from '~/lib/fetchUtil';
import type { DetailAnimeResponse } from '~/types/DetailAnimeResponse';

// export function meta({ data }: { data: DetailAnimeResponse }) {
//   if (!data) {
//     return [{ title: 'Nonton Anime Sub Indo' }];
//   }

//   return [
//     { title: `${data.info.judul} — Nonton Anime Sub Indo` },
//     {
//       name: 'description',
//       content: data.streaming_title || data.info.judul,
//     },
//   ];
// }

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  const data = await fetchUtils.get(`/episode/${slug}`);

  return data.data.data
}


export default function DetailAnime() {
  const data = useLoaderData();
  const navigate = useNavigate();

  return (
    <main className="max-w-screen-2xl mx-auto px-6 lg:px-10 py-10 space-y-10">

      {/* HEADER */}
      <div className="space-y-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            {data.title}
          </h1>

          <p className="text-slate-400 mt-1">
            Author: {data.metadata.author} • {data.metadata.release}
          </p>
        </div>
      </div>

      {/* PLAYER (HERO) */}
      <section className="space-y-6">
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-xl">
          <iframe
            src={data.iframe}
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* NAVIGATION */}
        <div className="flex w-full justify-between">
          {data.navigation.previous && (
            <Button size="lg" asChild>
              <Link to={`/episode/${data.navigation.previous.slug}`}>
                ← Previous Episode
              </Link>
            </Button>
          )}

          {data.navigation.next && (
            <Button size="lg" asChild>
              <Link to={`/episode/${data.navigation.next.slug}`}>
                Next Episode →
              </Link>
            </Button>
          )}
        </div>
      </section>

      {/* 2 COLUMN LAYOUT */}
      <div className="grid xl:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="xl:col-span-2 space-y-8">

          {/* EPISODES */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold mb-6">
              <Flame className="w-5 h-5 text-orange-400" />
              All Episodes
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {data.episodes.map((ep:any) => (
                <Link
                  key={ep.slug}
                  to={`/episode/${ep.slug}`}
                  className="
                    p-3
                    rounded-xl
                    border border-slate-800
                    bg-slate-900
                    hover:bg-slate-800
                    hover:border-indigo-500
                    transition
                  "
                >
                  {ep.title}
                </Link>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-8">

          {/* DOWNLOAD */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-5">
              Download
            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-1 gap-4">
              {data.downloads.map((dl:any) => (
                <div
                  key={dl.quality}
                  className="
                    border border-slate-800
                    rounded-xl
                    p-4
                    bg-slate-900
                    space-y-3
                  "
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">
                      {dl.quality}
                    </span>

                    <span className="text-slate-400 text-sm">
                      {dl.size}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {dl.providers.map((p:any) => (
                      <a
                        key={p.provider}
                        href={p.url}
                        target="_blank"
                        className="
                          px-3 py-1.5
                          text-sm
                          rounded-lg
                          bg-slate-800
                          hover:bg-indigo-600
                          hover:text-white
                          transition
                        "
                      >
                        {p.provider}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* INFO */}
          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold">
              Info
            </h2>

            <div className="flex flex-wrap gap-2">
              {data.info.genres.map((g:string) => (
                <Badge key={g} className="bg-slate-800">
                  {g}
                </Badge>
              ))}
            </div>

            <div className="text-sm text-slate-400 grid grid-cols-2 gap-2">
              <span>Credit: {data.info.credit}</span>
              <span>Encoder: {data.info.encoder}</span>
              <span>Duration: {data.info.duration}</span>
              <span>Type: {data.info.tipe}</span>
            </div>
          </section>

        </div>
      </div>

    </main>
  );
}

