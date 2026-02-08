import { ArrowLeft, Flame, Star, StarIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router';
import type { LoaderFunctionArgs, MetaArgs } from 'react-router';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { fetchUtils } from '~/lib/fetchUtil';
import type { DetailAnimeResponse } from '~/types/DetailAnimeResponse';

type Mirror = {
  quality: string;
  provider: string;
  url: string;
};

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

  const PRIORITY_PROVIDERS = ['onedesuhd', 'updesu'];

  const QUALITY_ORDER = ['4K', '1080p', '720p', '480p', '360p'];

  const normalizedMirrors: Mirror[] = (() => {
    const mirrors = [...data.mirrors];

    if (data.iframe) {
      const exists = mirrors.some(m => m.url === data.iframe);

      if (!exists) {
        mirrors.push({
          quality: '360p',
          provider: 'Auto',
          url: data.iframe,
        });
      }
    }

    return mirrors;
  })();

  function pickInitialMirror(mirrors: Mirror[]) {
    // priority provider
    const priority = mirrors.find(m =>
      PRIORITY_PROVIDERS.some(p => m.provider.toLowerCase().includes(p))
    );

    if (priority) return priority;

    // fallback iframe
    const iframeMatch = mirrors.find(m => m.url === data.iframe);
    if (iframeMatch) return iframeMatch;

    // fallback highest quality
    return [...mirrors].sort(
      (a, b) =>
        QUALITY_ORDER.indexOf(a.quality) - QUALITY_ORDER.indexOf(b.quality)
    )[0];
  }

  // ✅ lazy init (VERY IMPORTANT)
  const [activeMirror, setActiveMirror] = useState<Mirror | null>(() =>
    pickInitialMirror(normalizedMirrors)
  );

  // ✅ grouping mirrors
  const groupedMirrors = Object.values(
    data.mirrors.reduce((acc: any, mirror: Mirror) => {
      if (!mirror.url) return acc;

      if (!acc[mirror.quality]) {
        acc[mirror.quality] = {
          quality: mirror.quality,
          providers: [],
        };
      }

      acc[mirror.quality].providers.push(mirror);

      // priority sort
      acc[mirror.quality].providers.sort((a: Mirror, b: Mirror) => {
        const aPriority = PRIORITY_PROVIDERS.some(p =>
          a.provider.toLowerCase().includes(p)
        )
          ? 0
          : 1;

        const bPriority = PRIORITY_PROVIDERS.some(p =>
          b.provider.toLowerCase().includes(p)
        )
          ? 0
          : 1;

        return aPriority - bPriority;
      });

      return acc;
    }, {})
  ).sort(
    (a: any, b: any) =>
      QUALITY_ORDER.indexOf(a.quality) - QUALITY_ORDER.indexOf(b.quality)
  );

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
              src={activeMirror?.url || data.iframe}
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
            <div></div>

            {data.navigation.next && (
              <Button className="text-sm" asChild>
                <Link to={`/episode/${data.navigation.next.slug}`}>Next →</Link>
              </Button>
            )}
          </div>
        </section>

        {/* SIDEBAR */}
        <aside className="space-y-6 hidden xl:block">
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
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-8">Mirrors</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedMirrors.map((group: any) => {
              const isGroupActive = group.providers.some(
                (p: Mirror) => p.url === activeMirror?.url
              );

              const activeProvider =
                group.providers.find(
                  (p: Mirror) => p.url === activeMirror?.url
                ) ?? group.providers[0];

              return (
                <div
                  key={group.quality}
                  className={`
                  bg-slate-900
                  border
                  rounded-2xl
                  p-5
                  space-y-4
                  transition
                  ${
                    isGroupActive
                      ? 'border-indigo-500 shadow-lg shadow-indigo-500/10'
                      : 'border-slate-800 hover:border-indigo-500'
                  }
                `}
                >
                  {/* QUALITY */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">
                      {group.quality}
                    </span>

                    {isGroupActive && (
                      <span className="text-xs text-indigo-400">
                        Now Playing
                      </span>
                    )}
                  </div>

                  {/* DROPDOWN */}
                  <div className="relative">
                    <select
                      className="
                      w-full
                      appearance-none
                      bg-slate-800
                      border border-slate-700
                      rounded-xl
                      px-4 py-2.5
                      text-sm
                      focus:outline-none
                      focus:ring-2
                      focus:ring-indigo-500
                      hover:border-indigo-500
                      transition
                      cursor-pointer
                    "
                      value={
                        group.providers.some((p: Mirror) => p.url === activeMirror?.url)
                          ? activeMirror?.url
                          : ''
                      }
                      onChange={e => {
                        const selected: any = normalizedMirrors.find(
                          (m: Mirror) => m.url === e.target.value
                        );
                        setActiveMirror(selected);
                      }}
                    >
                      <option value="" disabled>
                        Select provider
                      </option>

                      {group.providers.map((p: Mirror) => (
                        <option key={p.url} value={p.url}>
                          {p.provider}
                        </option>
                      ))}
                    </select>

                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      ▼
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

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

        <aside className="space-y-6 block xl:hidden">
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
      </section>
    </main>
  );
}
