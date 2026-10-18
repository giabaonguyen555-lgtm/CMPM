import { Link } from "react-router-dom";
import {
  ArrowRight,
  Headphones,
  Languages,
  MapPin,
  Route,
  Sparkles,
} from "lucide-react";
import { sites } from "../core/data/hanoiHeritageSites";

const principles = [
  [
    "01",
    "Local context first",
    "Every story starts with a real place, a street, a courtyard or a view across the city.",
  ],
  [
    "02",
    "Made for a walk",
    "Short audio chapters help you keep exploring while the city moves around you.",
  ],
  [
    "03",
    "Stories without barriers",
    "Six languages make Hanoi's heritage easier to approach for visitors and locals alike.",
  ],
];

const steps = [
  [
    "01",
    "Choose a place",
    "Browse nine heritage sites by district, category or map.",
    "/",
  ],
  [
    "02",
    "Read or listen",
    "Open a location guide and experience its story at your own pace.",
    "/location/hoan-kiem",
  ],
  [
    "03",
    "Plan your walk",
    "Save favorites or connect the places you want to discover next.",
    "/map",
  ],
];

export default function AboutUsPage() {
  const districts = new Set(sites.map((site) => site.district)).size;
  const featured = sites.slice(0, 3);

  return (
    <main className="about-page site-main">
      <section className="bg-slate-950 py-16 text-white md:py-24">
        <div className="container">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.3em] text-slate-400">
                The Hanoi Heritage Guide
              </p>
              <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
                A slower, more personal way to meet Hanoi.
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300">
                Stories for the places you pass, the landmarks you remember and
                the corners of the city that deserve a little more time.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
                >
                  Start exploring <ArrowRight size={16} />
                </Link>
                <Link
                  to="/map"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  <MapPin size={16} /> Open the map
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 mt-8 overflow-hidden rounded-2xl">
                <img
                  src={featured[0].image}
                  alt={featured[0].name.en}
                  className="h-52 w-full object-cover md:h-64"
                />
              </div>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={featured[1].image}
                  alt={featured[1].name.en}
                  className="h-52 w-full object-cover md:h-64"
                />
              </div>
              <div className="col-span-3 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-300">
                <span>Nine places. Many ways into Hanoi.</span>
                <span className="text-slate-500">01 — 09</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-14 md:py-20">
        <div className="grid grid-cols-2 gap-5 border-b border-slate-200 pb-12 md:grid-cols-4">
          <Fact
            icon={<MapPin size={18} />}
            value={sites.length}
            label="heritage sites"
          />
          <Fact
            icon={<Languages size={18} />}
            value="6"
            label="listening languages"
          />
          <Fact
            icon={<Route size={18} />}
            value={districts}
            label="districts represented"
          />
          <Fact
            icon={<Headphones size={18} />}
            value="1"
            label="audio-first guide"
          />
        </div>
        <div className="grid gap-10 border-b border-slate-200 py-16 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-slate-400">
              Why we built it
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
              Heritage feels different when you have time to notice it.
            </h2>
          </div>
          <div className="space-y-5 text-sm leading-7 text-slate-600">
            <p>
              Hanoi is not a museum behind glass. It is a city of morning
              streets, quiet courtyards, old trees, changing shopfronts and
              stories that continue to live in the everyday.
            </p>
            <p>
              Hanoi Heritage brings those stories closer through a calm,
              audio-first guide. It is designed for independent travelers,
              curious residents and anyone who wants to look up from the
              itinerary for a moment.
            </p>
          </div>
        </div>
        <div className="py-16">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.25em] text-slate-400">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
                Take the city at your own pace.
              </h2>
            </div>
            <Link to="/" className="text-sm font-semibold underline">
              Browse all sites
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map(([number, title, text, href]) => (
              <Link
                to={href}
                key={number}
                className="group border-t-2 border-slate-900 pt-5 transition hover:-translate-y-1"
              >
                <span className="text-xs text-slate-400">{number}</span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{text}</p>
                <ArrowRight
                  size={17}
                  className="mt-6 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-900"
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="border-y border-slate-200 py-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.25em] text-slate-400">
            <Sparkles size={15} /> A small selection
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featured.map((site) => (
              <Link
                to={`/location/${site.id}`}
                key={site.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-md"
              >
                <img
                  src={site.image}
                  alt={site.name.en}
                  className="h-44 w-full object-cover transition group-hover:scale-[1.02]"
                />
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    {site.category} · {site.district}
                  </p>
                  <h3 className="mt-2 font-bold text-slate-900">
                    {site.name.en}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500">
                    Heritage since {site.year} · {site.duration} min audio
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-slate-400">
              Our principles
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight">
              Useful, respectful, close to the place.
            </h2>
          </div>
          <div className="divide-y divide-slate-200">
            {principles.map(([number, title, text]) => (
              <div
                key={number}
                className="grid gap-4 py-5 sm:grid-cols-[48px_180px_1fr]"
              >
                <span className="text-xs text-slate-400">{number}</span>
                <h3 className="font-bold text-slate-900">{title}</h3>
                <p className="text-sm leading-6 text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <section className="rounded-3xl bg-slate-50 p-8 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.25em] text-slate-400">
                Available now
              </p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
                Start with one place. Let the city lead you on.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Explore sites, listen in your language, save the places that
                stay with you and build your own way through Hanoi.
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
            >
              Explore Hanoi <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

function Fact({ icon, value, label }) {
  return (
    <div>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        {icon}
      </div>
      <p className="mt-4 text-2xl font-extrabold text-slate-900">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}
