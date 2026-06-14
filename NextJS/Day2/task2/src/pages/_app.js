import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState, createContext, useContext } from "react";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return savedTheme ? savedTheme === "dark" : prefersDark;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

const INTERVAL_MS = 30_000;

function useGlobalToasts(isDark) {
  useEffect(() => {
    const showRandomQuote = async () => {
      try {
        const res = await fetch("/api/quotes");
        if (!res.ok) return;
        const { data } = await res.json();
        if (!data) return;

        const icon = data.type === "news" ? "📢" : "💭";
        toast(`${data.text} — ${data.author}`, {
          icon,
          duration: 5000,
          style: {
            borderRadius: "10px",
            background: isDark ? "#1f2937" : "#ffffff",
            color: isDark ? "#ffffff" : "#1f2937",
            border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
            fontWeight: "500",
            maxWidth: "420px",
          },
        });
      } catch {}
    };

    showRandomQuote();
    const id = setInterval(showRandomQuote, INTERVAL_MS);
    return () => clearInterval(id);
  }, [isDark]);
}

function AppInner({ Component, pageProps }) {
  const router = useRouter();
  const { isDark } = useTheme();
  const showNavbar = router.pathname !== "/_error";

  useGlobalToasts(isDark);

  return (
    <div className="min-h-screen transition-colors duration-300">
      {showNavbar && <Navbar />}
      <Component {...pageProps} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          success: {
            style: { background: "#10b981", color: "#fff" },
          },
          error: {
            style: { background: "#ef4444", color: "#fff" },
          },
          loading: {
            style: { background: "#3b82f6", color: "#fff" },
          },
        }}
      />
    </div>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AppInner Component={Component} pageProps={pageProps} />
    </ThemeProvider>
  );
}
