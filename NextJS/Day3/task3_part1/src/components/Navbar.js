import Link from "next/link";
import { useTheme } from "@/pages/_app";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { data: session } = useSession();

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

            {session ? (
              <div className="flex items-center space-x-3 border-l pl-4 border-gray-200 dark:border-gray-700">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={30}
                    height={30}
                    className="rounded-full border-2 border-blue-500 shadow-sm object-cover"
                  />
                )}
                <span className="text-sm font-semibold hidden sm:inline max-w-[120px] truncate">
                  {session.user?.name || "User"}
                </span>
                <button
                  onClick={() => signOut()}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white shadow-sm transition cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
