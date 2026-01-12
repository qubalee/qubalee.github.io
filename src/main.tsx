import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const pendingFallbackPath = sessionStorage.getItem("spa-fallback-path");
if (pendingFallbackPath) {
  sessionStorage.removeItem("spa-fallback-path");
  const normalized = pendingFallbackPath.startsWith("/") ? pendingFallbackPath : `/${pendingFallbackPath}`;
  const current = window.location.pathname + window.location.search + window.location.hash;
  if (normalized !== current) {
    window.history.replaceState(null, "", normalized);
  }
}

createRoot(document.getElementById("root")!).render(<App />);
