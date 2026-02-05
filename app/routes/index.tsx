import { CheckCircle2, Flame } from 'lucide-react';
import { useLoaderData } from 'react-router';
import type { LoaderFunctionArgs, MetaArgs } from 'react-router';

import AnimeCard from '~/components/AnimeCard';
import Navbar from '~/components/Navbar';
import Section from '~/components/Section';
import { fetchUtils } from '~/lib/fetchUtil';
import type { HomeResponse } from '~/types/HomeResponse';

export function meta({}: MetaArgs) {
  return [{ title: 'Nonton Anime Sub Indo' }];
}

export async function loader({ request }: LoaderFunctionArgs) {
  const data = await fetchUtils.get(`/`);
  return data.data as HomeResponse;
}

export default function Home() {
  const data = useLoaderData<HomeResponse>();

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <Section title="Ongoing Anime" to="/ongoing" icon={Flame}>
        <div
          className="
            grid gap-5
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
          "
        >
          {data.ongoing.data.slice(0, 10).map(anime => (
            <AnimeCard key={anime.slug} anime={anime} />
          ))}
        </div>
      </Section>

      <Section title="Completed Anime" to="/completed" icon={CheckCircle2}>
        <div
          className="
            grid gap-5
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
          "
        >
          {data.completed.data.slice(0, 10).map(anime => (
            <AnimeCard key={anime.slug} anime={anime} />
          ))}
        </div>
      </Section>
    </main>
  );
}
