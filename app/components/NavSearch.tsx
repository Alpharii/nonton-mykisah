import { useFetcher, useNavigate, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function NavbarSearch() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  // CLOSE dropdown setiap pindah halaman
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // debounce fetch
  useEffect(() => {
    if (query.length < 2) {
      setOpen(false);
      return;
    }

    const t = setTimeout(() => {
      fetcher.load(`/search?q=${query}`);
      setOpen(true);
    }, 350);

    return () => clearTimeout(t);
  }, [query]);

  const results = fetcher.data?.data?.slice(0, 5) ?? [];

  const submitSearch = () => {
    if (!query) return;

    navigate(`/search?q=${query}`);
    setOpen(false); // 🔥 CLOSE
  };

  return (
    <div className="relative w-[480px] max-w-[40vw]">
      
      {/* INPUT + ICON */}
      <div className="relative">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              submitSearch();
            }
          }}
          placeholder="Cari anime..."
          className="
            w-full pl-4 pr-10 py-2.5 rounded-xl
            bg-slate-900 border border-slate-700
            text-white placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
        />

        <FaSearch
          onClick={submitSearch}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-slate-400 hover:text-white
            cursor-pointer transition
          "
        />
      </div>

      {/* LOADING */}
      {fetcher.state === 'loading' && open && (
        <div className="absolute top-14 w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-slate-400">
          Searching...
        </div>
      )}

      {/* DROPDOWN */}
      {open && results.length > 0 && (
        <div
          className="
            absolute top-14 w-full
            bg-slate-900/95 backdrop-blur-xl
            border border-slate-800
            rounded-2xl shadow-2xl
            overflow-hidden
          "
        >
          {results.map((anime: any) => (
            <button
              key={anime.slug}
              onClick={() => {
                navigate(`/detail/${anime.slug}`);
                setOpen(false); // 🔥 CLOSE
              }}
              className="
                w-full flex gap-4
                p-3
                hover:bg-slate-800/70
                transition
                text-left
              "
            >
              <img
                src={anime.thumbnail}
                className="w-16 h-24 object-cover rounded-lg flex-shrink-0"
              />

              <div className="flex flex-col gap-1 overflow-hidden">
                <span className="font-semibold text-sm line-clamp-2">
                  {anime.title}
                </span>

                <div className="text-xs text-slate-400 flex gap-2">
                  {anime.rating && <span>⭐ {anime.rating}</span>}
                  {anime.status && <span>• {anime.status}</span>}
                </div>

                <div className="text-xs text-slate-500 line-clamp-1">
                  {anime.genres?.join(' • ')}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
