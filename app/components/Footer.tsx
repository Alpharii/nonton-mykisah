import { Github } from "lucide-react";
import { FaFolderOpen } from "react-icons/fa";
import { MdSource } from "react-icons/md";
import { RiGitRepositoryFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-2">
        
        {/* LEFT */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">
            Nonton Mykisah
          </h3>

          <p className="text-sm text-slate-400 max-w-sm">
            Stream anime easily with a fast modern interface powered by
            React Router. Built for performance and simplicity.
          </p>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Nonton Mykisah. All rights reserved.
          </p>
        </div>

        {/* RIGHT */}
        <div className="grid gap-3 text-sm">
          
          <a
            href="https://github.com/alpharii"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition"
          >
            <Github size={16} />
            Github — Alphari
          </a>

          <a
            href="https://github.com/Alpharii/otakudesu-scrapper-api"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition"
          >
            <FaFolderOpen size={16} />
            Project Repository
          </a>

          <a
            href="https://otakudesu.best"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition"
          >
            <MdSource size={16} />
            Data source — Otakudesu
          </a>

          <p className="text-xs text-slate-500 pt-4 border-t border-slate-800">
            This site does not store any files on its server. All contents are
            provided by third-party sources.
          </p>
        </div>
      </div>
    </footer>
  );
}
