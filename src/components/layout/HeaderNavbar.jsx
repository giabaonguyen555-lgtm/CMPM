import { Link, NavLink } from "react-router-dom";
import { Globe, User, Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useHeritage } from "../../core/context/HeritageContext";
import { t } from "../../core/data/hanoiHeritageSites";
import { useAuth } from "../../core/context/AuthContext";

const languageOptions = [
  ["vi", "Tiếng Việt"],
  ["en", "English"],
  ["fr", "Français"],
  ["ja", "日本語"],
  ["ko", "한국어"],
  ["zh", "中文"],
];

export default function Header() {
  const { language, setLanguage } = useHeritage();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const languageRef = useRef(null);
  const links = [
    ["/", "Explore"],
    ["/map", t[language]?.map || "Map"],
    ["/favorites", t[language]?.favorites || "Favorites"],
    ["/about", t[language]?.about || "About us"],
  ];
  const currentLanguage =
    languageOptions.find(([value]) => value === language)?.[1] || "English";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onOutsideClick = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setLanguageOpen(false);
        setUserOpen(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mousedown", onOutsideClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onOutsideClick);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`site-header sticky top-0 z-[9999] bg-white ${scrolled ? "is-scrolled" : ""}`}
    >
      <div className="container header-inner">
        <Link
          to="/"
          className="font-extrabold tracking-tight text-lg whitespace-nowrap"
        >
          HANOI<span className="text-gray-400">/</span>HERITAGE
        </Link>
        <nav className="hidden md:flex gap-7 text-sm font-medium header-nav">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "font-bold border-b-2 border-black pb-1"
                  : "text-gray-500 hover:text-black"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="relative" ref={languageRef}>
            <button
              type="button"
              aria-label="Choose language"
              aria-expanded={languageOpen}
              onClick={() => {
                setLanguageOpen((value) => !value);
                setUserOpen(false);
              }}
              className="rounded-full bg-gray-100 hover:bg-gray-200 px-3 py-2 flex items-center gap-2 text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            >
              <Globe size={15} />
              <span>{currentLanguage}</span>
              <ChevronDown
                size={13}
                className={
                  languageOpen
                    ? "rotate-180 transition-transform"
                    : "transition-transform"
                }
              />
            </button>
            {languageOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] w-40 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg shadow-gray-900/10">
                {languageOptions.map(([value, label]) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => {
                      setLanguage(value);
                      setLanguageOpen(false);
                    }}
                    className={`w-full text-left rounded-lg px-3 py-2 text-xs transition ${language === value ? "bg-gray-100 font-semibold text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setUserOpen((value) => !value);
                setLanguageOpen(false);
              }}
              className="rounded-full bg-gray-100 hover:bg-gray-200 p-2 flex items-center gap-1 transition focus:outline-none focus:ring-2 focus:ring-gray-900/10"
            >
              <User size={16} />
              <ChevronDown size={12} />
            </button>
            {userOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] w-40 rounded-xl border border-gray-200 bg-white p-1.5 text-sm shadow-lg shadow-gray-900/10">
                {user ? (
                  <>
                    <span className="block truncate px-3 py-2 text-xs text-gray-500">
                      {user.email}
                    </span>
                    <button
                      type="button"
                      onClick={logout}
                      className="block w-full rounded-lg px-3 py-2 text-left hover:bg-gray-50 transition"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      className="block rounded-lg px-3 py-2 hover:bg-gray-50 transition"
                      to="/login"
                    >
                      Log in
                    </Link>
                    <Link
                      className="block rounded-lg px-3 py-2 hover:bg-gray-50 transition"
                      to="/register"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden container pb-4 grid gap-3">
          {links.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="py-1"
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
