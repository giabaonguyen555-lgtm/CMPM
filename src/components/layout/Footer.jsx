import { Link } from "react-router-dom";
import { ArrowUpRight, Headphones, MapPin, Radio } from "lucide-react";

const locationLinks = [
  ["Hoan Kiem Lake & Ngoc Son Temple", "/location/hoan-kiem"],
  ["Temple of Literature", "/location/literature"],
  ["Hanoi Old Quarter", "/location/old-quarter"],
  ["Tran Quoc Pagoda", "/location/tran-quoc"],
];

export default function Footer() {
  return (
    <footer className="site-footer border-t border-slate-200 bg-white pb-32 pt-12 text-sm text-slate-500">
      <div className="container">
        <div className="grid gap-10 border-b border-slate-200 pb-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link
              to="/"
              className="text-base font-extrabold tracking-tight text-slate-900"
            >
              HANOI<span className="text-slate-400">/</span>HERITAGE
            </Link>
            <p className="mt-4 max-w-xs leading-6">
              An open audio guide for curious travelers and local storytellers.
            </p>
            <Link
              to="/location/hoan-kiem"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              Start with Hoan Kiem <ArrowUpRight size={14} />
            </Link>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[.18em] text-slate-900">
              Explore
            </h2>
            <div className="mt-4 grid gap-3">
              <Link className="transition hover:text-slate-900" to="/">
                All heritage sites
              </Link>
              <Link className="transition hover:text-slate-900" to="/map">
                Interactive map
              </Link>
              <Link className="transition hover:text-slate-900" to="/about">
                About the guide
              </Link>
              <Link className="transition hover:text-slate-900" to="/favorites">
                Saved guides
              </Link>
            </div>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[.18em] text-slate-900">
              Plan a walk
            </h2>
            <div className="mt-4 grid gap-3">
              {locationLinks.map(([label, href]) => (
                <Link
                  key={href}
                  className="truncate transition hover:text-slate-900"
                  to={href}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[.18em] text-slate-900">
              The project
            </h2>
            <div className="mt-4 grid gap-3">
              <Link className="transition hover:text-slate-900" to="/login">
                Log in
              </Link>
              <Link className="transition hover:text-slate-900" to="/register">
                Create an account
              </Link>
              <span className="inline-flex items-center gap-2 text-xs">
                <Headphones size={14} /> Browser audio guides
              </span>
              <span className="inline-flex items-center gap-2 text-xs">
                <MapPin size={14} /> Built for Hanoi
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 text-xs text-slate-400">
          <p>© 2026 Hanoi Heritage. Stories for the city.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Radio size={13} /> Web guide
            </span>
            <span>VI · EN · FR · JA · KO · ZH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
