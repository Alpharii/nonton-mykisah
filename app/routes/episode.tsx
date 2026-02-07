import { ArrowLeft, Flame, Star, StarIcon } from 'lucide-react';
import { Link, useLoaderData, useNavigate } from 'react-router';
import type { LoaderFunctionArgs, MetaArgs } from 'react-router';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { fetchUtils } from '~/lib/fetchUtil';
import type { DetailAnimeResponse } from '~/types/DetailAnimeResponse';

export function meta({ data }: { data: DetailAnimeResponse }) {
  if (!data) {
    return [{ title: 'Nonton Anime Sub Indo' }];
  }

  return [
    { title: `${data.title} — Nonton Anime Sub Indo` },
    {
      name: 'description',
      content: data.title || data.info.judul,
    },
  ];
}

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  const data = await fetchUtils.get(`/episode/${slug}`);

  return data.data.data;
}

export default function DetailAnime() {
  const data = useLoaderData();
  const navigate = useNavigate();

  return (
    <main className="max-w-screen-2xl mx-auto w-full px-3 sm:px-4 lg:px-8 py-6 space-y-8 overflow-x-hidden">
      {/* HEADER */}
      <div className="space-y-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
            {data.title}
          </h1>
        </div>
      </div>

      {/* PLAYER + SIDEBAR */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* PLAYER */}
        <section className="xl:col-span-3 space-y-6 min-w-0">
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-xl">
            <iframe
              src={data.iframe}
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* EP NAVIGATION */}
          <div className="flex justify-between">
            {data.navigation.previous && (
              <Button className="text-sm" asChild>
                <Link to={`/episode/${data.navigation.previous.slug}`}>
                  ← Previous
                </Link>
              </Button>
            )}

            {/* <Button className="text-sm">
              <Link to={'https://github.com/Alpharii/nonton-mykisah'}>
                Support dengan memberi bintang kesini
              </Link>
              <span className="text-yellow-400">
                <StarIcon />
              </span>
            </Button> */}
            <div>
              
            </div>

            {data.navigation.next && (
              <Button className="text-sm" asChild>
                <Link to={`/episode/${data.navigation.next.slug}`}>Next →</Link>
              </Button>
            )}
          </div>
        </section>

        {/* SIDEBAR */}
        <aside className="space-y-6">
          <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4 sticky top-6">
            <img
              src={data.info.thumbnail}
              alt={data.title}
              className="rounded-xl w-full object-cover"
            />

            <div className="flex flex-wrap gap-2">
              {data.info.genres.map((g: string) => (
                <Badge key={g} className="bg-slate-800">
                  {g}
                </Badge>
              ))}
            </div>

            <div className="text-sm text-slate-400 space-y-1">
              <p>Credit: {data.info.credit}</p>
              <p>Encoder: {data.info.encoder}</p>
              <p>Duration: {data.info.duration}</p>
              <p>Type: {data.info.tipe}</p>
              <p>Author: {data.metadata.author}</p>
              <p>Rilis: {data.metadata.release}</p>
            </div>
          </section>
        </aside>
      </div>

      {/* FULL WIDTH SECTION */}
      <section className="space-y-8">
        {/* EPISODES */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-5">Episodes</h2>

          <div className="grid sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 gap-2">
            {data.episodes.map((ep: any) => (
              <Link
                key={ep.slug}
                to={`/episode/${ep.slug}`}
                className="
                  text-sm
                  p-2
                  rounded-lg
                  border border-slate-800
                  bg-slate-900
                  hover:bg-indigo-600
                  hover:border-indigo-400
                  transition
                  text-center
                "
              >
                {ep.title}
              </Link>
            ))}
          </div>
        </div>

        {/* DOWNLOAD */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-5">Download</h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
            {data.downloads.map((dl: any) => (
              <div
                key={dl.quality}
                className="border border-slate-800 rounded-xl p-4 bg-slate-900 space-y-3 hover:border-indigo-500 transition"
              >
                <div className="flex justify-between">
                  <span className="font-semibold">{dl.quality}</span>
                  <span className="text-slate-400 text-sm">{dl.size}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {dl.providers.map((p: any) => (
                    <a
                      key={p.provider}
                      href={p.url}
                      target="_blank"
                      className="
                        px-3 py-1
                        text-xs
                        rounded-md
                        bg-slate-800
                        hover:bg-indigo-600
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
        </div>
      </section>
    </main>
  );
}
