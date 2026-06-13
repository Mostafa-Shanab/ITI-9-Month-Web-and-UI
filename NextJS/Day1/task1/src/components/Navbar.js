import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold hover:text-blue-200 transition"
          >
            Shanab Store
          </Link>

          <div className="flex space-x-6">
            <Link
              href="/"
              className="hover:text-blue-200 transition font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="hover:text-blue-200 transition font-medium"
            >
              Products
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
