import Header from "./components/layout/HeaderNavbar";
import Footer from "./components/layout/Footer";
import StickyPlayer from "./components/layout/StickyBottomPlayer";
import ChatWidget from "./components/chat/ChatWidget";
import AppRouter from "./routes/AppRouter";
import { useLocation } from "react-router-dom";
export default function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  return (
    <div className="app-shell">
      {!isAdmin && <Header />}
      <div className="app-content">
        <AppRouter />
      </div>
      {!isAdmin && <Footer />}
      {!isAdmin && <StickyPlayer />}
      {!isAdmin && <ChatWidget />}
    </div>
  );
}
