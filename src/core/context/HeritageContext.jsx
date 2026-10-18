import { createContext, useContext, useEffect, useState } from "react";
import { languages } from "../data/hanoiHeritageSites";
const C = createContext();
const readJson = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
};
export function HeritageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem("lang") || "en");
  const [favorites, setFavorites] = useState(() => {
    const value = readJson("favorites", []);
    return Array.isArray(value) ? value : [];
  });
  const [listened, setListened] = useState(() => {
    const value = Number(localStorage.getItem("listened") || 0);
    return Number.isFinite(value) && value >= 0 ? value : 0;
  });
  const [listenedSessions, setListenedSessions] = useState(() => {
    const value = readJson("listenedSessions", []);
    return Array.isArray(value) ? value : [];
  });
  useEffect(() => localStorage.setItem("lang", language), [language]);
  useEffect(
    () => localStorage.setItem("favorites", JSON.stringify(favorites)),
    [favorites],
  );
  useEffect(() => localStorage.setItem("listened", listened), [listened]);
  useEffect(
    () =>
      localStorage.setItem(
        "listenedSessions",
        JSON.stringify(listenedSessions),
      ),
    [listenedSessions],
  );
  const addListened = (sessionId) => {
    if (!sessionId || listenedSessions.includes(sessionId)) return;
    setListenedSessions((items) => [...items, sessionId]);
    setListened((value) => value + 1);
  };
  const toggleFavorite = (id) =>
    setFavorites((x) =>
      x.includes(id) ? x.filter((i) => i !== id) : [...x, id],
    );
  return (
    <C.Provider
      value={{
        language,
        setLanguage,
        favorites,
        toggleFavorite,
        listened,
        addListened,
        languages,
      }}
    >
      {children}
    </C.Provider>
  );
}
export const useHeritage = () => useContext(C);
