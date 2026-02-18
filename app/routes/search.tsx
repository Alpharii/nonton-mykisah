import { Search } from 'lucide-react';
import {
  useLoaderData,
  type LoaderFunctionArgs,
  type MetaArgs,
} from 'react-router';
import AnimeCard from '~/components/AnimeCard';
import Section from '~/components/Section';
import { fetchUtils } from '~/lib/fetchUtil';

export function meta({ location }: MetaArgs) {
  const q = new URLSearchParams(location.search).get('q');

  return [{ title: `Search: ${q}` }];
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');

  if (!q) {
    return { data: [] };
  }

  const res = await fetchUtils.get(`/anime?q=${q}`);

  return res.data;
}

export default function SearchPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <Section title={`Hasil pencarian ${data.total_data}`} icon={Search}>
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {data.data.map((anime: any) => (
            <AnimeCard
              key={anime.slug}
              anime={{
                ...anime,
                episodeInfo: anime.status,
                meta: anime.rating,
              }}
              isHaveStatus
            />
          ))}
        </div>
      </Section>
    </main>
  );
}
