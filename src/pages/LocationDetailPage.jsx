import { useParams, Link } from "react-router-dom";
import {
  Heart,
  Play,
  Pause,
  MapPin,
  Calendar,
  Globe,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { sites } from "../core/data/hanoiHeritageSites";
import { useHeritage } from "../core/context/HeritageContext";
import { useAudio } from "../core/context/AudioPlayerContext";
import { getCategoryTextClass } from "../core/utils/categoryStyles";
import { usePayment } from "../core/context/PaymentContext";
import { useNavigate } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

const categoryColors = {
  Cultural: "#0f766e",
  Historical: "#4f46e5",
  Architectural: "#b45309",
  Spiritual: "#be185d",
};

const formatTime = (seconds = 0) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

export default function LocationDetailPage() {
  const { id } = useParams();
  const site = sites.find((item) => item.id === id);
  const { language, favorites, toggleFavorite } = useHeritage();
  const navigate = useNavigate();
  const { hasAccess } = usePayment();
  const audio = useAudio();
  const {
    current,
    error,
    playing,
    play,
    progress,
    seek,
    seekSeconds,
    volume,
    setVolume,
    duration,
    rate,
    setRate,
    language: audioLanguage,
    setLanguage: setAudioLanguage,
  } = audio;

  if (!site) return <NotFoundPage />;

  const title = site.name[language] || site.name.en;
  const active = current?.id === site.id;
  const color = categoryColors[site.category] || "#111827";
  const currentSeconds = (progress / 100) * (duration || site.duration * 60);
  const recommendations = sites
    .filter((item) => item.id !== site.id)
    .slice(0, 3);

  const changeLanguage = (nextLanguage) => {
    setAudioLanguage(nextLanguage);
    if (active && playing) {
      audio.stop();
      window.setTimeout(() => audio.play(site), 0);
    }
  };

  return (
    <main className="site-main">
      <section className="relative h-[360px] md:h-[420px] overflow-hidden bg-gray-200">
        <img
          src={site.image}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        <div className="absolute bottom-8 inset-x-0">
          <div className="container">
            <span
              style={{ borderColor: color, color }}
              className={`inline-flex bg-white border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryTextClass(site.category)}`}
            >
              {site.category}
            </span>
            <h1 className="max-w-5xl text-4xl font-extrabold tracking-tight mt-3">
              {title}
            </h1>
            <div className="flex flex-wrap gap-2 mt-3 text-xs">
              <span className="bg-white border border-gray-200/80 rounded-lg px-3 py-2">
                <MapPin size={13} className="inline mr-1" />
                {site.district}, Hanoi
              </span>
              <span className="bg-white border border-gray-200/80 rounded-lg px-3 py-2">
                <Calendar size={13} className="inline mr-1" />
                Heritage since {site.year}
              </span>
              <button
                aria-label="Toggle favorite"
                onClick={() => toggleFavorite(site.id)}
                className="bg-white border border-gray-200/80 rounded-lg px-3 py-2 hover:bg-red-50"
              >
                <Heart
                  size={17}
                  fill={favorites.includes(site.id) ? "currentColor" : "none"}
                  className={favorites.includes(site.id) ? "text-red-500" : ""}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container grid lg:grid-cols-12 gap-8 py-8 pb-32">
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">
                Audio Guide{" "}
                <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md ml-2.5">
                  {site.duration}:00 total
                </span>
              </h2>
              <label className="flex items-center text-xs">
                <Globe className="w-4 h-4 text-slate-500 mr-2" />
                <select
                   value={audioLanguage}
                   onChange={(event) => changeLanguage(event.target.value)}
                  className="bg-slate-100/80 border border-slate-200/80 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 min-w-[130px] outline-none"
                >
                  <option value="vi">Vietnamese</option>
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="ja">Japanese</option>
                  <option value="ko">Korean</option>
                  <option value="zh">Chinese</option>
                </select>
              </label>
            </div>
            {error && <p className="mb-3 text-xs text-amber-600">{error}</p>}
            <p className="text-xs text-slate-500 leading-relaxed mb-5">
              {site.description[language] || site.description.en}
            </p>
            <div className="relative w-full h-2 bg-slate-100 rounded-full cursor-pointer">
              <div
                className="absolute inset-y-0 left-0 bg-slate-950 h-full rounded-full"
                style={{ width: `${active ? progress : 0}%` }}
              />
              <input
                aria-label="Audio progress"
                type="range"
                min="0"
                max="100"
                value={active ? progress : 0}
                onChange={(event) => seek(Number(event.target.value))}
                className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
              />
              <span
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-900 rounded-full shadow-sm pointer-events-none"
                style={{ left: `calc(${active ? progress : 0}% - 8px)` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
              <span>{formatTime(currentSeconds)}</span>
              <span>{formatTime(duration || site.duration * 60)}</span>
            </div>
            <div className="flex items-center justify-center gap-6 my-4">
              <button
                aria-label="Skip back 15 seconds"
                onClick={() => seekSeconds(-15)}
                className="p-2 text-slate-700 hover:text-slate-950 transition-colors"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                aria-label={active && playing ? "Pause audio" : "Play audio"}
                onClick={() => {
                  if (!hasAccess) {
                    navigate(`/paywall?next=/location/${site.id}`);
                    return;
                  }
                  play(site);
                }}
                className="w-11 h-11 bg-slate-950 hover:bg-slate-800 text-white rounded-xl flex items-center justify-center shadow-sm transition"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  {active && playing ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </span>
              </button>
              <button
                aria-label="Skip forward 15 seconds"
                onClick={() => seekSeconds(15)}
                className="p-2 text-slate-700 hover:text-slate-950 transition-colors"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <button
                aria-label={volume ? "Mute audio" : "Unmute audio"}
                onClick={() => setVolume(volume ? 0 : 1)}
                className="shrink-0 text-slate-600"
              >
                {volume ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>
              <div className="flex-1 h-2.5 bg-slate-100 rounded-full relative flex items-center">
                <div
                  className="bg-slate-950 h-full rounded-l-full"
                  style={{ width: `${volume * 100}%` }}
                />
                <input
                  aria-label="Volume"
                  type="range"
                  min="0"
                  max="1"
                  step=".05"
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
                <span
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-900 rounded-full pointer-events-none"
                  style={{ left: `calc(${volume * 100}% - 8px)` }}
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  setRate(
                    rate === 2
                      ? 1
                      : rate === 1
                        ? 1.25
                        : rate === 1.25
                          ? 1.5
                          : 2,
                  )
                }
                className="border border-slate-200 hover:bg-slate-50 rounded-lg px-3 py-1 text-xs font-semibold text-slate-800 shrink-0"
              >
                {rate}x
              </button>
            </div>
          </section>

          <section className="border border-gray-200/70 rounded-2xl p-6">
            <h2 className="font-bold">ⓘ About This Site</h2>
            <p className="text-sm text-gray-600 leading-7 mt-4">
              {site.description[language] || site.description.en} This landmark
              connects Hanoi’s history, architecture and living culture across
              generations.
            </p>
          </section>
          <section className="border border-gray-200/70 rounded-2xl p-6">
            <h2 className="font-bold">Key Highlights</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 mt-4">
              {site.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <section className="border border-gray-200/70 rounded-2xl p-6">
            <h2 className="font-bold border-b border-gray-100 pb-3">
              Quick Information
            </h2>
            <dl className="space-y-4 mt-4 text-sm">
              <div>
                <dt className="text-xs text-gray-500">Location</dt>
                <dd className="font-semibold mt-1">{site.district}, Hanoi</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Heritage Year</dt>
                <dd className="font-semibold mt-1">{site.year}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Category</dt>
                <dd className="font-semibold mt-1" style={{ color }}>
                  {site.category}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Audio Duration</dt>
                <dd className="font-semibold mt-1">{site.duration} minutes</dd>
              </div>
            </dl>
          </section>
          <section className="border border-gray-200 rounded-2xl p-5">
            <h2 className="font-bold mb-4">Explore More</h2>
            <div className="space-y-3">
              {recommendations.map((recommendation) => (
                <Link
                  key={recommendation.id}
                  to={`/location/${recommendation.id}`}
                  className="group flex gap-3 items-center border border-gray-100 rounded-xl p-2 hover:border-black transition"
                >
                  <img
                    src={recommendation.image}
                    alt=""
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <span className="min-w-0">
                    <strong className="block text-sm truncate">
                      {recommendation.name[language] || recommendation.name.en}
                    </strong>
                    <small className="text-gray-500">
                      {recommendation.category} · {recommendation.duration} min
                    </small>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
