import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  RotateCcw,
  RotateCw,
  X,
} from "lucide-react";
import { useAudio } from "../../core/context/AudioPlayerContext";

const format = (seconds = 0) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

export default function StickyPlayer() {
  const {
    current,
    playing,
    loading,
     error,
     status,
     retry,
     language,
    togglePlay,
    closePlayer,
    progress,
    seek,
    seekSeconds,
    volume,
    setVolume,
    rate,
    setRate,
    duration,
  } = useAudio();
  if (!current) return null;
  const elapsed = (progress / 100) * duration;

  return (
    <div className="sticky-player">
      <div className="container player-inner">
        <div className="player-title">
          <img src={current.image} alt="" className="player-thumb" />
          <div className="min-w-0">
            <b>{current.name[language] || current.name.en}</b>
             <small>
               {loading
                 ? "Loading audio…"
                 : error || `${status === "ended" ? "Finished · " : ""}${current.category} · Audio guide`}
               {error && (
                 <button type="button" className="ml-2 underline" onClick={retry}>
                   Retry
                 </button>
               )}
             </small>
          </div>
        </div>
        <div className="player-center-row">
          <div className="player-controls">
            <button aria-label="Previous" onClick={() => seekSeconds(-30)}>
              <SkipBack size={16} />
            </button>
            <button
              aria-label="Rewind 15 seconds"
              onClick={() => seekSeconds(-15)}
            >
              <RotateCcw size={16} />
              <small>15</small>
            </button>
            <button
              aria-label={playing ? "Pause" : "Play"}
              onClick={togglePlay}
              className="player-play"
            >
              {playing ? (
                <Pause size={18} />
              ) : (
                <Play size={18} fill="currentColor" />
              )}
            </button>
            <button
              aria-label="Forward 15 seconds"
              onClick={() => seekSeconds(15)}
            >
              <RotateCw size={16} />
              <small>15</small>
            </button>
            <button aria-label="Next" onClick={() => seekSeconds(30)}>
              <SkipForward size={16} />
            </button>
          </div>
          <div className="player-progress">
            <span>{format(elapsed)}</span>
            <input
              aria-label="Audio progress"
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => seek(Number(e.target.value))}
            />
            <span>{format(duration)}</span>
          </div>
        </div>
        <div className="player-options">
          <button
            aria-label={volume ? "Mute" : "Unmute"}
            onClick={() => setVolume(volume ? 0 : 1)}
          >
            {volume ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <input
            aria-label="Volume"
            type="range"
            min="0"
            max="1"
            step=".05"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
          <select
            aria-label="Playback speed"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          >
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
          <div className="player-divider" />
          <button
            aria-label="Close player"
            title="Tắt trình phát"
            onClick={closePlayer}
            className="player-close"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

