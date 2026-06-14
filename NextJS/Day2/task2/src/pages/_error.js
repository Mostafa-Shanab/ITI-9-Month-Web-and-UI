import Link from "next/link";

export default function Error() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <p className="text-gray-600 text-lg mb-8">
          Something went wrong. Please try again.
        </p>

        <div className="flex gap-4">
          <Link
            href="/"
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
