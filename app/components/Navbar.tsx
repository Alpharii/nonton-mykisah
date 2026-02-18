import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { FaSearch } from 'react-icons/fa';
import { NavLink, Link } from 'react-router';
import { Clapperboard, Flame, CheckCircle2, History } from 'lucide-react';
import NavbarSearch from './NavSearch';

export default function Navbar() {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `
    flex items-center gap-2
    text-sm font-medium transition
    ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}
  `;

  return (
    <nav
      className="
      sticky top-0 z-50
      border-b border-slate-800
      bg-slate-950/70
      backdrop-blur-xl
    "
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          {/* LOGO */}
          <Link
            to="/"
            className="
              flex items-center gap-2
              text-xl font-extrabold
              tracking-tight text-white
            "
          >
            <Clapperboard className="w-6 h-6 text-indigo-500" />
            Nonton Mykisah
          </Link>

          {/* MENU */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/ongoing" className={navClass}>
              <Flame className="w-4 h-4" />
              Ongoing
            </NavLink>

            <NavLink to="/completed" className={navClass}>
              <CheckCircle2 className="w-4 h-4" />
              Completed
            </NavLink>
            
            <NavLink to="/history" className={navClass}>
              <History className="w-4 h-4" />
              History
            </NavLink>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* desktop search */}
          <div className="hidden md:block w-[400px]">
            <NavbarSearch />
          </div>

          {/* mobile search */}
          <div className="md:hidden">
            <NavbarSearch mobile />
          </div>
        </div>
      </div>
    </nav>
  );
}
