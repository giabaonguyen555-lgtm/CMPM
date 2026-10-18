import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../core/context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated)
    return (
      <Navigate
        to={`/login?next=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  return <Outlet />;
}
