import { Link, useLocation } from 'react-router';

type Props = {
  currentPage: number;
  pages: number[];
};

export default function Pagination({ currentPage, pages }: Props) {
  const location = useLocation();

  const createLink = (page: number) => {
    const params = new URLSearchParams(location.search);
    params.set('page', String(page));
    return `?${params.toString()}`;
  };

  const sorted = [...new Set(pages)].sort((a, b) => a - b);

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap pt-8">
      {/* PREV */}
      {currentPage > 1 && (
        <Link
          to={createLink(currentPage - 1)}
          className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition"
        >
          Prev
        </Link>
      )}

      {sorted.map((page, i) => {
        const prev = sorted[i - 1];

        const showEllipsis = prev && page - prev > 1;

        return (
          <div key={page} className="flex items-center gap-2">
            {showEllipsis && <span className="px-2 text-slate-500">...</span>}

            <Link
              to={createLink(page)}
              className={`
                min-w-[40px] text-center
                px-3 py-2 rounded-lg
                text-sm font-semibold
                transition
                ${
                  currentPage === page
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }
              `}
            >
              {page}
            </Link>
          </div>
        );
      })}

      {/* NEXT */}
      {pages.includes(currentPage + 1) && (
        <Link
          to={createLink(currentPage + 1)}
          className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition"
        >
          Next
        </Link>
      )}
    </div>
  );
}
