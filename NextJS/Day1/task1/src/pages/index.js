import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">
        Welcome Shanab
      </h1>
      <Link
        href="/products"
        className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition text-lg"
      >
        View Products
      </Link>
    </div>
  );
}
