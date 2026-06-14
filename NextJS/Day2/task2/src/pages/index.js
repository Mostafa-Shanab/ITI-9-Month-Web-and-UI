import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Welcome Shanab
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 text-center max-w-2xl">
        Explore our amazing collection of products with advanced search,
        filtering, and sorting capabilities.
      </p>
      <Link
        href="/products"
        className="inline-block bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition text-lg"
      >
        View Products
      </Link>
    </div>
  );
}
