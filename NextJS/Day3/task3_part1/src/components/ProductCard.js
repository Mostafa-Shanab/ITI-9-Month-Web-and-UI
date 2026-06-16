import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function ProductCard({
  id,
  title,
  price,
  image,
  description,
  rating = 0,
  category,
  stock,
  onDelete,
}) {
  const { data: session } = useSession();
  const isAuthenticated = !!session;
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${title}"?`)) return;
    setDeleting(true);
    const tid = toast.loading("Deleting…");
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Product deleted!", { id: tid });
        if (onDelete) onDelete(id);
      } else {
        toast.error(data.message || "Delete failed", { id: tid });
        setDeleting(false);
      }
    } catch {
      toast.error("Network error", { id: tid });
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group">
      <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={500}
          height={500}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {category && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white shadow">
            {category}
          </span>
        )}
        {stock !== undefined && (
          <span
            className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-bold shadow ${
              stock > 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {stock > 0 ? `${stock} left` : "Out of stock"}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base font-bold text-gray-800 dark:text-white truncate mb-1">
          {title}
        </h3>

        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 flex-1">
          {description}
        </p>

        <div className="flex items-center gap-1 text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">
          <span className="text-yellow-400">★</span>
          {rating.toFixed(1)} / 5.0
        </div>

        <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mb-4">
          ${price.toFixed(2)}
        </p>

        <div className="flex gap-2 mt-auto">
          <Link
            href={`/products/${id}`}
            className="flex-1 text-center bg-blue-600 dark:bg-blue-700 text-white py-2 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition font-semibold text-sm"
          >
            {isAuthenticated ? "View / Edit" : "View Details"}
          </Link>
          {isAuthenticated && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex-1 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white py-2 rounded-xl transition font-semibold text-sm cursor-pointer disabled:opacity-50"
            >
              {deleting ? "Deleting…" : "Delete"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
