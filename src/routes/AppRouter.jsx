import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ExplorePage from "../pages/ExplorePage";
import LocationDetailPage from "../pages/LocationDetailPage";
import FavoritesPage from "../pages/FavoritesPage";
import AuthPage from "../pages/AuthPage";
import ProtectedRoute from "./ProtectedRoute";
import PaywallPage from "../pages/PaywallPage";
import NotFoundPage from "../pages/NotFoundPage";

const MapPage = lazy(() => import("../pages/MapPage"));
const AboutUsPage = lazy(() => import("../pages/AboutUsPage"));
const AdminDashboardPage = lazy(() => import("../pages/AdminDashboardPage"));

function RouteLoading() {
  return (
    <div className="container flex min-h-[40vh] items-center justify-center py-16" role="status">
      <p className="text-sm text-slate-500">Loading page…</p>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Suspense fallback={<RouteLoading />}>
      <Routes>
        <Route path="/" element={<ExplorePage />} />
        <Route path="/location/:id" element={<LocationDetailPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/paywall" element={<PaywallPage />} />
        </Route>
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage register />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
