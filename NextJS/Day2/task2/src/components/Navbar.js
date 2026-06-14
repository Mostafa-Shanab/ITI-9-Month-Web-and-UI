import Link from "next/link";
import { useTheme } from "@/pages/_app";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-lg transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Shanab Store
          </Link>

          <div className="flex space-x-6 items-center">
            <Link
              href="/"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
            >
              Products
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 cursor-pointer dark:hover:bg-gray-600 transition"
            >
              {isDark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
