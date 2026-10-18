import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);
const USER_KEY = "authUser";
const TOKEN_KEY = "access_token";

function readUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError("");
    try {
      if (!email?.trim() || !password) {
        throw new Error("Enter your email and password.");
      }
      const nextUser = { email: email.trim().toLowerCase() };
      // Demo-only session: never persist credentials or passwords.
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
      return nextUser;
    } catch (nextError) {
      setError(nextError.message || "Unable to sign in.");
      throw nextError;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async ({ email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      const nextError = new Error("Passwords do not match.");
      setError(nextError.message);
      throw nextError;
    }
    return login({ email, password });
  }, [login]);

  const logout = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loading,
      error,
      login,
      register,
      logout,
      accessToken: localStorage.getItem(TOKEN_KEY),
    }),
    [user, loading, error, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
