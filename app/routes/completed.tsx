import { Flame, FlameIcon } from 'lucide-react';
import {
  useLoaderData,
  useSearchParams,
  type LoaderFunctionArgs,
  type MetaArgs,
} from 'react-router';

import AnimeCard from '~/components/AnimeCard';
import Pagination from '~/components/Pagination';
import Section from '~/components/Section';
import { fetchUtils } from '~/lib/fetchUtil';
import type { OngoingAndCompletedResponse } from '~/types/OngoingAndCompletedResponse';

export function meta({}: MetaArgs) {
  return [{ title: 'Completed Anime Sub Indo' }];
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page') ?? '1');

  const res = await fetchUtils.get(`/complete/${page}`);

  return res.data;
}

export default function Complete() {
  const data = useLoaderData<OngoingAndCompletedResponse>();
  const currentPage = data.page;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <Section title="All Completed Anime" icon={FlameIcon}>
        {/* Grid */}
        <div
          className="
            grid gap-5
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            "
        >
          {data.data.map(anime => (
            <AnimeCard
              key={anime.slug}
              anime={{
                ...anime,
                episodeInfo: anime.episode,
                meta: anime.day,
                type: 'ongoing',
              }}
              isHaveStatus={false}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          pages={data.pagination.available_pages}
          currentPage={currentPage}
        />
      </Section>
    </main>
  );
}
