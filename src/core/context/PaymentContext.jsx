import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const PaymentContext = createContext(null);
const TOKEN_KEY = "access_token";

export function PaymentProvider({ children }) {
  const [hasAccess, setHasAccess] = useState(() =>
    Boolean(localStorage.getItem(TOKEN_KEY)),
  );
  const [status, setStatus] = useState("idle");
  const [mode, setMode] = useState(null);
  const [sessionId, setSessionId] = useState("");
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const grantDemoAccess = useCallback(() => {
    localStorage.setItem(TOKEN_KEY, "demo-token");
    setHasAccess(true);
    setStatus("success");
  }, []);

  const startOnlinePayment = useCallback(() => {
    setMode("online");
    setError("");
    setStatus("pending");
    window.setTimeout(grantDemoAccess, 1400);
  }, [grantDemoAccess]);

  const retryPayment = useCallback(() => {
    setRetryCount((count) => count + 1);
    startOnlinePayment();
  }, [startOnlinePayment]);

  const submitCashCode = useCallback(
    (code) => {
      if (code.trim().toUpperCase() !== "HANOI-DEMO") {
        setError("Demo code không hợp lệ. Hãy thử HANOI-DEMO.");
        return false;
      }
      grantDemoAccess();
      return true;
    },
    [grantDemoAccess],
  );

  const openCashPayment = useCallback(() => {
    setMode("cash");
    setStatus("pending");
    setError("");
    setSessionId(`DEMO-${new Date().getFullYear()}-001`);
  }, []);

  const resetPayment = useCallback(() => {
    setStatus("idle");
    setMode(null);
    setError("");
  }, []);

  const value = useMemo(
    () => ({
      hasAccess,
      status,
      mode,
      sessionId,
      error,
      startOnlinePayment,
      openCashPayment,
      submitCashCode,
       resetPayment,
       retryPayment,
       retryCount,
     }),
    [
      hasAccess,
      status,
      mode,
      sessionId,
      error,
      startOnlinePayment,
      openCashPayment,
       submitCashCode,
       resetPayment,
       retryPayment,
       retryCount,
     ],
  );
  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
}

export const usePayment = () => useContext(PaymentContext);
