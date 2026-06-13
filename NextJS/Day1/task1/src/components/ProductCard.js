import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ id, title, price, image, description }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
      <div className="relative w-full h-48 bg-gray-200">
        <Image
          src={image}
          alt={title}
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate mb-2">
          {title}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>

        <p className="text-xl font-bold text-black mb-3">${price.toFixed(2)}</p>

        <Link
          href={`/products/${id}`}
          className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
