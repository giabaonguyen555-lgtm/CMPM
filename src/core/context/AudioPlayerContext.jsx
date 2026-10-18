import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useHeritage } from "./HeritageContext";

const AudioContext = createContext(null);

const speechLang = { vi: "vi-VN", en: "en-US", fr: "fr-FR", ja: "ja-JP", ko: "ko-KR", zh: "zh-CN" };

const transcript = (site, selectedLanguage = "en") => {
  const description = site?.description?.[selectedLanguage] || site?.description?.en || "";
  const highlights = Array.isArray(site?.highlights) ? site.highlights : [];
  const localizedHighlights = highlights.map((item) =>
    typeof item === "string" ? item : item?.[selectedLanguage] || item?.en || "",
  ).filter(Boolean);
  return [description, localizedHighlights.join(". "), "Explore the layers of Hanoi history, architecture, memory and living culture through this audio guide."]
    .filter(Boolean).join(" ");
};

export function AudioProvider({ children }) {
  const [current, setCurrent] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const { addListened } = useHeritage();
  const [language, setLanguageState] = useState("en");
  const languageRef = useRef(language);
  const audio = useRef(null);
  const speech = useRef(null);
  const speechTimer = useRef(null);
  const session = useRef(0);
  const listenedSession = useRef(null);

  const setLanguage = (next) => { languageRef.current = next; setLanguageState(next); };
  const clearSpeechTimer = () => { if (speechTimer.current) { window.clearInterval(speechTimer.current); speechTimer.current = null; } };
  const cleanupMedia = () => {
    clearSpeechTimer();
    window.speechSynthesis?.cancel();
    if (audio.current) { audio.current.onended = null; audio.current.onerror = null; audio.current.pause(); audio.current.src = ""; }
    audio.current = null; speech.current = null;
  };
  const stop = (clearCurrent = false) => {
    session.current += 1;
    cleanupMedia();
    setStatus(clearCurrent ? "idle" : "paused");
    if (clearCurrent) { setCurrent(null); setProgress(0); setDuration(0); setError(""); listenedSession.current = null; }
  };

  const markListened = (site) => {
    if (listenedSession.current === site.id) return;
    listenedSession.current = site.id;
    addListened(site.id);
  };

  const startSpeech = (site, token, from = 0) => {
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      setStatus("error"); setError("Speech audio is not supported by this browser."); return;
    }
    const total = site.duration * 60;
    const utterance = new SpeechSynthesisUtterance(transcript(site, languageRef.current));
    utterance.lang = speechLang[languageRef.current] || "en-US";
    utterance.rate = rate; utterance.volume = volume;
    utterance.onend = () => { if (token !== session.current) return; clearSpeechTimer(); setProgress(100); setStatus("ended"); };
    utterance.onerror = (event) => { if (token !== session.current || event.error === "canceled") return; clearSpeechTimer(); setStatus("error"); setError("Unable to play speech audio."); };
    speech.current = utterance; setDuration(total); setProgress(from); window.speechSynthesis.speak(utterance);
    speechTimer.current = window.setInterval(() => { if (token === session.current) setProgress((value) => Math.min(99, value + (100 / total) * 0.25 * rate)); }, 250);
    setStatus("playing"); markListened(site);
  };

  const start = (site, from = 0) => {
    stop();
    const token = session.current;
    setCurrent(site); setProgress(from); setError(""); setStatus(site.audio ? "loading" : "idle");
    if (!site.audio) { startSpeech(site, token, from); return; }
    const player = new Audio(site.audio); audio.current = player; player.volume = volume; player.playbackRate = rate;
    player.onloadedmetadata = () => { if (token !== session.current) return; setDuration(player.duration || site.duration * 60); setStatus("loading"); };
    player.ontimeupdate = () => { if (token !== session.current) return; setProgress(player.duration ? player.currentTime / player.duration * 100 : 0); setDuration(player.duration || site.duration * 60); };
    player.onended = () => { if (token !== session.current) return; setProgress(100); setStatus("ended"); };
    player.onerror = () => { if (token !== session.current) return; audio.current = null; setError("Audio file unavailable. Using speech narration instead."); startSpeech(site, token, from); };
    player.currentTime = (from / 100) * (site.duration * 60);
    player.play().then(() => { if (token === session.current) { setStatus("playing"); markListened(site); } }).catch(() => { if (token !== session.current) return; setError("Audio playback was blocked. Using speech narration instead."); startSpeech(site, token, from); });
  };

  const play = (site) => {
    if (current?.id !== site.id) { start(site); return; }
    if (status === "playing" || status === "loading") { audio.current?.pause(); window.speechSynthesis?.pause(); clearSpeechTimer(); setStatus("paused"); return; }
    if (status === "ended") { start(site); return; }
    if (audio.current) { audio.current.play().then(() => { setStatus("playing"); markListened(site); }).catch(() => { setStatus("error"); setError("Audio playback was blocked. Press retry to try again."); }); }
    else if (speech.current) { window.speechSynthesis.resume(); setStatus("playing"); speechTimer.current = window.setInterval(() => setProgress((value) => Math.min(99, value + (100 / (duration || site.duration * 60)) * 0.25 * rate)), 250); }
    else start(site, progress);
  };
  const retry = () => current && start(current, progress >= 100 ? 0 : progress);
  const seek = (value) => { setProgress(value); if (audio.current) audio.current.currentTime = value / 100 * (audio.current.duration || duration); };
  const seekSeconds = (seconds) => { if (!current) return; if (audio.current) audio.current.currentTime = Math.max(0, Math.min(audio.current.duration || duration, audio.current.currentTime + seconds)); else setProgress((value) => Math.max(0, Math.min(100, value + seconds / (duration || current.duration * 60) * 100))); };

  useEffect(() => { if (audio.current) { audio.current.volume = volume; audio.current.playbackRate = rate; } if (speech.current) { speech.current.rate = rate; speech.current.volume = volume; } }, [volume, rate]);
  useEffect(() => () => { session.current += 1; cleanupMedia(); }, []);

  return <AudioContext.Provider value={{ current, status, playing: status === "playing", loading: status === "loading", error, play, retry, stop, closePlayer: () => stop(true), togglePlay: () => current && play(current), setPlaying: (value) => value ? play(current) : stop(), rate, setRate, volume, setVolume, progress, seek, seekSeconds, duration, language, setLanguage, transcript }}>{children}</AudioContext.Provider>;
}
export const useAudio = () => useContext(AudioContext);
