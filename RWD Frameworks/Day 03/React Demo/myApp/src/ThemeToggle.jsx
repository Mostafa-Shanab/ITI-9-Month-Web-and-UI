import { useEffect, useState } from "react";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [darkMode]);

  return (
    <button
      className="dark:text-white border-2 py-1 px-10 rounded-sm"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "Light" : "Dark"}
    </button>
  );
}

export default ThemeToggle;
