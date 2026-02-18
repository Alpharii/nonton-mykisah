import { History } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import HistoryCard from "~/components/HistoryCard";
import Pagination from "~/components/Pagination";
import Section from "~/components/Section";
import { getWatchHistory } from "~/lib/history";
import type { AnimeHistory } from "~/types/History";

export function meta() {
  return [{ title: 'History Anime - Lanjut Nonton' }];
}

const PER_PAGE = 20;

export default function HistoryPage() {
  const [history, setHistory] = useState<AnimeHistory[]>([]);
  const [page, setPage] = useState(1);

  // load from localStorage
  useEffect(() => {
    setHistory(getWatchHistory());
  }, []);

  // pagination logic
  const totalPages = Math.ceil(history.length / PER_PAGE);

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return history.slice(start, start + PER_PAGE);
  }, [history, page]);

  if (!history.length) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-20 text-center text-white/70">
        <p className="text-lg">Belum ada history tontonan</p>
        <p className="text-sm mt-2">
          Mulai nonton anime dan history akan muncul di sini 🎬
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <Section title="History Anime" icon={History}>
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
          {paginated.map(anime => (
            <HistoryCard key={anime.slug} anime={anime} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            pages={Array.from({ length: totalPages }, (_, i) => i + 1)}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
      </Section>
    </main>
  );
}
