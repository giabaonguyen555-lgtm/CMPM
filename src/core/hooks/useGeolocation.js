import { useCallback, useEffect, useState } from "react";

const options = { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 };

function messageFor(reason) {
  if (reason?.code === 1) return "Location permission was denied. Check your browser settings.";
  if (reason?.code === 2) return "Your location is unavailable. Try again somewhere with a clearer signal.";
  if (reason?.code === 3) return "Location request timed out. Try again.";
  return "Unable to read your location. Try again.";
}

export function useGeolocation({ watch = false, enabled = true } = {}) {
  const [position, setPosition] = useState(null);
  const [status, setStatus] = useState(enabled ? "idle" : "disabled");
  const [error, setError] = useState("");

  const request = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("error");
      setError("Geolocation is not supported by this browser.");
      return;
    }
    setStatus("loading");
    setError("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition({ latitude: coords.latitude, longitude: coords.longitude, accuracy: coords.accuracy });
        setStatus("ready");
      },
      (reason) => {
        setStatus("error");
        setError(messageFor(reason));
      },
      options,
    );
  }, []);

  useEffect(() => {
    if (!enabled || !navigator.geolocation || !watch) return undefined;
    setStatus("loading");
    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        setPosition({ latitude: coords.latitude, longitude: coords.longitude, accuracy: coords.accuracy });
        setStatus("ready");
        setError("");
      },
      (reason) => {
        setStatus("error");
        setError(messageFor(reason));
      },
      options,
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [enabled, watch]);

  useEffect(() => {
    if (!enabled) {
      setStatus("disabled");
      setError("");
    }
  }, [enabled]);

  return { position, status, error, request };
}

