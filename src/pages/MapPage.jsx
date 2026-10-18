import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Search,
  LocateFixed,
  Route as RouteIcon,
  Navigation,
  Sparkles,
  MapPinned,
} from "lucide-react";
import { sites } from "../core/data/hanoiHeritageSites";
import { useHeritage } from "../core/context/HeritageContext";
import { useAudio } from "../core/context/AudioPlayerContext";
import { getCategoryTextClass } from "../core/utils/categoryStyles";
import { useGeolocation } from "../core/hooks/useGeolocation";
import { distanceInMeters, formatDistance } from "../core/location/distance";
import { usePayment } from "../core/context/PaymentContext";
import { useNavigate } from "react-router-dom";

const markerIcon = L.divIcon({ className: "custom-marker", html: "<span></span>", iconSize: [24, 24], iconAnchor: [12, 12] });
const selectedMarkerIcon = L.divIcon({ className: "custom-marker selected", html: "<span></span>", iconSize: [30, 30], iconAnchor: [15, 15] });
const nearestMarkerIcon = L.divIcon({ className: "custom-marker nearest", html: "<span></span>", iconSize: [28, 28], iconAnchor: [14, 14] });

function Recenter({ site }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(site.coordinates, 14, { duration: 0.8 });
  }, [map, site]);
  return null;
}

export default function MapPage() {
  const [selected, setSelected] = useState(sites[0]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [route, setRoute] = useState(false);
  const [gpsError, setGpsError] = useState("");
  const [proximityEnabled, setProximityEnabled] = useState(false);
  const [autoPlayNearby, setAutoPlayNearby] = useState(false);
  const announcedNearby = useRef(new Set());
  const lastAutoPlayAt = useRef(0);
  const navigate = useNavigate();
  const { hasAccess } = usePayment();
  const { language, favorites, toggleFavorite } = useHeritage();
  const { play, current, playing } = useAudio();
  const {
    position,
    status: locationStatus,
    error: locationError,
    request: requestLocation,
  } = useGeolocation({ watch: proximityEnabled, enabled: proximityEnabled });
  const categories = ["All", ...new Set(sites.map((site) => site.category))];
  const distances = useMemo(() => {
    if (!position) return new Map();
    const userPoint = [position.latitude, position.longitude];
    return new Map(
      sites.map((site) => [
        site.id,
        distanceInMeters(userPoint, site.coordinates),
      ]),
    );
  }, [position]);
  const nearestSite = useMemo(() => {
    if (!position || distances.size === 0) return null;
    return sites.reduce(
      (nearest, site) =>
        distances.get(site.id) < distances.get(nearest.id) ? site : nearest,
      sites[0],
    );
  }, [distances, position]);
  const nearbySite =
    nearestSite && distances.get(nearestSite.id) <= 500 ? nearestSite : null;

  useEffect(() => {
    if (!autoPlayNearby || !nearbySite || !proximityEnabled) return;
    if (current?.id === nearbySite.id && playing) return;
    if (announcedNearby.current.has(nearbySite.id)) return;
    if (Date.now() - lastAutoPlayAt.current < 30000) return;
    announcedNearby.current.add(nearbySite.id);
    lastAutoPlayAt.current = Date.now();
    if (!hasAccess) {
      navigate("/paywall?next=/map");
      return;
    }
    play(nearbySite);
  }, [autoPlayNearby, nearbySite, proximityEnabled, current, playing, play, hasAccess, navigate]);

  useEffect(() => {
    if (!proximityEnabled) {
      announcedNearby.current.clear();
      setAutoPlayNearby(false);
    }
  }, [proximityEnabled]);

  const filtered = useMemo(
    () =>
      sites.filter((site) => {
        const haystack =
          `${Object.values(site.name).join(" ")} ${Object.values(site.description).join(" ")} ${site.district}`.toLowerCase();
        return (
          (category === "All" || site.category === category) &&
          haystack.includes(query.toLowerCase())
        );
      }),
    [category, query],
  );

  const locate = () => {
    requestLocation();
  };

  useEffect(() => {
    if (position) {
      setGpsError("");
      setSelected((currentSelection) => currentSelection?.id === "my-location" ? sites[0] : currentSelection);
    }
  }, [position]);

  useEffect(() => {
    if (locationError) setGpsError(locationError);
  }, [locationError]);

  return (
    <main className="map-page container py-8 site-main">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
            Explore by map
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
            Find your next Hanoi story.
          </h1>
        </div>
        <p className="max-w-xs text-right text-xs leading-5 text-slate-500">
          Browse nearby heritage sites, listen at your own pace and build a walk
          through the city.
        </p>
      </div>
      <div className="map-layout grid lg:grid-cols-[320px_1fr] gap-4 h-[min(650px,calc(100vh-190px))] min-h-[500px]">
        <aside className="border border-gray-200/70 rounded-2xl p-4 overflow-hidden flex flex-col bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Heritage map
              </p>
              <h2 className="mt-1 text-lg font-extrabold text-slate-900">
                Explore Hanoi
              </h2>
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700">
              <MapPinned size={16} />
            </span>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-slate-300 bg-white transition-all focus-within:border-slate-900 focus-within:ring-2 focus-within:ring-slate-900/10 mt-3">
            <Search size={14} className="text-gray-500 shrink-0" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search locations"
              className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent shadow-none text-xs"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap mt-3">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={
                  category === item
                    ? "bg-black text-white rounded-full px-2.5 py-1 text-[11px]"
                    : "border border-gray-200 rounded-full px-2.5 py-1 text-[11px] hover:border-black"
                }
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-4 border-y border-slate-100 py-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Discover tools
            </p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={locate}
                className="border border-gray-200 rounded-full px-2.5 py-1 text-[11px] flex gap-1 items-center hover:border-black"
              >
                <LocateFixed size={13} /> My location
              </button>
              <button
                onClick={() => {
                  if (!hasAccess) {
                    navigate("/paywall?next=/map");
                    return;
                  }
                  setProximityEnabled((value) => !value);
                }}
                className={
                  proximityEnabled
                    ? "bg-black text-white rounded-full px-2.5 py-1 text-[11px] flex gap-1 items-center"
                    : "border border-gray-200 rounded-full px-2.5 py-1 text-[11px] flex gap-1 items-center hover:border-black"
                }
              >
                GPS audio
              </button>
              {proximityEnabled && (
                <button
                  onClick={() => setAutoPlayNearby((value) => !value)}
                  className={
                    autoPlayNearby
                      ? "bg-black text-white rounded-full px-2.5 py-1 text-[11px] flex gap-1 items-center"
                      : "border border-gray-200 rounded-full px-2.5 py-1 text-[11px] flex gap-1 items-center hover:border-black"
                  }
                >
                  Auto-play nearby
                </button>
              )}
              <button
                onClick={() => setRoute((value) => !value)}
                className={
                  route
                    ? "bg-black text-white rounded-full px-2.5 py-1 text-[11px] flex gap-1 items-center"
                    : "border border-gray-200 rounded-full px-2.5 py-1 text-[11px] flex gap-1 items-center"
                }
              >
                <RouteIcon size={13} /> Route
              </button>
            </div>
          </div>
          {(gpsError || locationStatus === "loading") && (
            <div className={`mt-2 flex items-center justify-between gap-2 text-[11px] ${gpsError ? "text-red-600" : "text-slate-500"}`}>
              <span>{gpsError || "Finding your location…"}</span>
              {gpsError && <button type="button" onClick={locate} className="font-semibold underline">Retry</button>}
            </div>
          )}
          {proximityEnabled && nearestSite && position && (
            <div className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-[11px] text-slate-600">
              <span className="mr-1 font-semibold text-slate-900">GPS active</span> ·

              Nearest:{" "}
              <strong className="text-slate-900">
                {nearestSite.name[language] || nearestSite.name.en}
              </strong>{" "}
              · {formatDistance(distances.get(nearestSite.id))}
              {nearbySite && (
                <span className="ml-1 text-emerald-600">Nearby</span>
              )}
            </div>
          )}
          <div className="mt-3 flex-1 space-y-2 overflow-auto pr-1">
            {filtered.length === 0 && (
              <div className="py-10 text-center text-sm text-gray-500">
                <p>No heritage sites match your search.</p>
                <button type="button" onClick={() => { setQuery(""); setCategory("All"); }} className="mt-2 text-xs font-semibold text-slate-900 underline">Clear filters</button>
              </div>
            )}
            {filtered.map((site) => {
              const title = site.name[language] || site.name.en;
              return (
                <button
                  onClick={() => setSelected(site)}
                  key={site.id}
                  className={`w-full text-left rounded-xl border p-2.5 flex gap-2.5 transition ${selected.id === site.id ? "border-slate-900 bg-slate-50 shadow-sm" : "border-gray-200/70 hover:border-slate-400"}`}
                >
                  <img
                    src={site.image}
                    alt={title}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <span className="flex-1 min-w-0">
                    <b className="text-xs block truncate">{title}</b>
                    <small className="text-gray-500 text-[11px]">
                      {site.district}
                      {distances.has(site.id)
                        ? ` · ${formatDistance(distances.get(site.id))}`
                        : ""}
                    </small>
                    <em
                      className={`block text-[10px] uppercase not-italic mt-1 font-semibold ${getCategoryTextClass(site.category)}`}
                    >
                      {site.category}
                    </em>
                  </span>
                  <span
                    role="button"
                    aria-pressed={favorites.includes(site.id)}
                    tabIndex={0}
                    aria-label="Toggle favorite"
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleFavorite(site.id);
                    }}
                  >
                    <Heart
                      size={15}
                      className={
                        favorites.includes(site.id)
                          ? "text-red-500"
                          : "text-gray-400"
                      }
                      fill={
                        favorites.includes(site.id) ? "currentColor" : "none"
                      }
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </aside>
        <section className="relative isolate z-0 overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
          <MapContainer
            center={selected.coordinates}
            zoom={14}
            scrollWheelZoom={true}
            className="h-full min-h-0"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Recenter site={selected} />
             {position && (
               <CircleMarker
                 center={[position.latitude, position.longitude]}
                 radius={8}
                 pathOptions={{ color: "#1d4ed8", fillColor: "#60a5fa", fillOpacity: 0.9, weight: 3 }}
               >
                 <Popup><strong>Your location</strong><br /><small>Accuracy: {Math.round(position.accuracy)}m</small></Popup>
               </CircleMarker>
             )}
            {sites.map((site) => (
              <Marker
                key={site.id}
                opacity={
                  nearestSite?.id === site.id && proximityEnabled ? 1 : 0.85
                }
                eventHandlers={{ click: () => setSelected(site) }}
                 position={site.coordinates}
                 icon={selected.id === site.id ? selectedMarkerIcon : nearestSite?.id === site.id && proximityEnabled ? nearestMarkerIcon : markerIcon}
              >
                <Popup>
                  <div className="w-48">
                    <img
                      src={site.image}
                      alt=""
                      className="w-full h-20 object-cover rounded mb-2"
                    />
                    <strong className="text-sm block">
                      {site.name[language] || site.name.en}
                    </strong>
                    <small className="text-gray-500">
                      {site.duration} min audio guide
                    </small>
                    <Link
                      className="block mt-2 text-xs font-semibold underline"
                      to={`/location/${site.id}`}
                    >
                      Listen audio guide
                    </Link>
                     <button
                       onClick={() => {
                         if (!hasAccess) {
                           navigate(`/paywall?next=/location/${site.id}`);
                           return;
                         }
                         play(site);
                       }}
                       className="mt-2 text-xs bg-black text-white rounded px-2 py-1"
                     >
                      Play now
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
            {route && (
              <Polyline
                positions={sites.map((site) => site.coordinates)}
                pathOptions={{ color: "#111827", weight: 3, dashArray: "6 8" }}
              />
            )}
          </MapContainer>
          {route && (
            <div className="absolute bottom-3 left-3 z-[500] flex items-center gap-2 rounded-lg border border-slate-200 bg-white/95 px-3 py-2 text-[11px] text-slate-600 shadow-sm">
              <RouteIcon size={13} className="text-slate-900" /> Suggested route
              · visual preview only
            </div>
          )}
          <div className="absolute right-3 top-3 z-[500] hidden items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-[10px] text-slate-500 shadow-sm sm:flex">
            <Navigation size={12} className="text-slate-900" /> Scroll to zoom
          </div>
        </section>
      </div>
    </main>
  );
}
