import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import type { LucideIcon } from 'lucide-react';

type Props = {
  title: string;
  to?: string;
  icon: LucideIcon;
  children: React.ReactNode;
};

export default function Section({ title, to, icon: Icon, children }: Props) {
  return (
    <section
      className="
        space-y-6
        bg-slate-900/60
        backdrop-blur
        border border-slate-800
        rounded-2xl
        p-6
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-white tracking-tight">
          <Icon className="w-5 h-5 text-indigo-400" />
          {title}
        </h2>

        {to && (
          <Button
            asChild
            className="
              bg-slate-800
              hover:bg-slate-700
              text-slate-200
              border border-slate-700
            "
          >
            <Link to={to} className="text-sm">
              Lihat Semua →
            </Link>
          </Button>
        )}
      </div>

      {children}
    </section>
  );
}
