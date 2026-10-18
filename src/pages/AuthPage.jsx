import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../core/context/AuthContext";
export default function AuthPage({ register = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register: createAccount, loading, error } = useAuth();
  const next = new URLSearchParams(location.search).get("next") || "/";
  const submit = async (e) => {
    e.preventDefault();
    setValidationError("");
    if (register && password !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }
    try {
      if (register) await createAccount({ email, password, confirmPassword });
      else await login({ email, password });
      navigate(next.startsWith("/") ? next : "/", { replace: true });
    } catch {
      // AuthContext exposes the demo error state.
    }
  };
  return (
    <main className="site-main grid place-items-center bg-gray-50 px-4 py-16">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white border rounded-2xl p-8 shadow-sm"
      >
        <span className="inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
          Demo authentication
        </span>
        <h1 className="text-2xl font-extrabold mt-4">
          {register ? "Create your account" : "Welcome back"}
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          {register
            ? "Save favorites and continue exploring Hanoi."
            : "Sign in to access your saved heritage sites."}
        </p>
        <label className="block text-sm font-semibold mt-6">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 border rounded-lg p-3"
          />
        </label>
        <label className="block text-sm font-semibold mt-4">
          Password
            <div className="relative mt-2">
              <input
                required
                minLength="6"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg p-3 pr-11"
              />
              <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
          {register && (
            <label className="block text-sm font-semibold mt-4">
              Confirm password
              <input required minLength="6" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full mt-2 border rounded-lg p-3" />
            </label>
          )}
          {(validationError || error) && <p role="alert" className="mt-4 text-sm text-red-600">{validationError || error}</p>}
        <button
          disabled={loading}
          className="w-full bg-black text-white rounded-lg py-3 mt-6 font-semibold disabled:opacity-50"
        >
          {loading ? "Please wait…" : register ? "Register" : "Log in"}
        </button>
        <p className="text-sm text-center mt-5">
          {register ? "Already registered?" : "New here?"}{" "}
          <Link
            className="font-semibold underline"
            to={register ? "/login" : "/register"}
          >
            {register ? "Log in" : "Create an account"}
          </Link>
        </p>
      </form>
    </main>
  );
}
