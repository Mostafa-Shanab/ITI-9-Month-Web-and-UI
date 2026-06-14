import Image from "next/image";
import Link from "next/link";
import { useState, useActionState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import connectDB from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { useTheme } from "../_app";

export default function ProductDetail({ product: initialProduct, error }) {
  const { isDark } = useTheme();
  const router = useRouter();

  const [product, setProduct] = useState(initialProduct);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form action for PUT update (using useActionState)
  const [formState, formAction, isFormPending] = useActionState(
    async (prevState, formData) => {
      const updatedFields = {
        title: formData.get("title"),
        price: parseFloat(formData.get("price")),
        rating: parseFloat(formData.get("rating")),
        description: formData.get("description"),
        thumbnail: formData.get("thumbnail"),
        category: formData.get("category"),
        stock: parseInt(formData.get("stock")),
      };

      try {
        const response = await fetch(`/api/products/${product._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFields),
        });

        const data = await response.json();

        if (data.success) {
          toast.success("Product updated!");
          setProduct(data.data);
          setIsEditing(false);
          return { success: true, message: "Updated successfully" };
        } else {
          toast.error(data.message || "Failed to update product");
          return { success: false, error: data.message };
        }
      } catch (err) {
        toast.error("Error updating product");
        return { success: false, error: err.message };
      }
    },
    { success: false },
  );

  // Handle DELETE request
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setIsDeleting(true);
    const deleteToast = toast.loading("Deleting product...");

    try {
      const response = await fetch(`/api/products/${product._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Product deleted successfully!", { id: deleteToast });
        router.push("/products");
      } else {
        toast.error(data.message || "Failed to delete product", {
          id: deleteToast,
        });
        setIsDeleting(false);
      }
    } catch (err) {
      toast.error("Error deleting product", { id: deleteToast });
      setIsDeleting(false);
    }
  };

  if (error || !product) {
    return (
      <div
        className={`min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} flex flex-col items-center justify-center p-8`}
      >
        <p className="text-xl font-bold mb-4">
          ⚠️ {error || "Product not found"}
        </p>
        <Link
          href="/products"
          className="px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-bold shadow-md"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Navigation Header */}
      <div
        className={`border-b transition-colors duration-300 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} shadow-sm`}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/products"
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold flex items-center gap-1.5"
          >
            <span>←</span> Back to Catalog
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
                isEditing
                  ? "bg-gray-500 text-white hover:bg-gray-600"
                  : "bg-amber-500 text-white hover:bg-amber-600"
              }`}
            >
              {isEditing ? "Cancel Edit" : "Edit Product"}
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition cursor-pointer disabled:bg-gray-500"
            >
              {isDeleting ? "Deleting..." : "Delete Product"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-10 px-6">
        <div
          className={`rounded-2xl shadow-xl border overflow-hidden transition-colors duration-300 ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          {!isEditing ? (
            /* View Details Mode */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Thumbnail */}
              <div
                className={`flex items-center justify-center p-4 rounded-xl border relative aspect-square transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-900 border-gray-700"
                    : "bg-gray-100 border-gray-200"
                }`}
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-contain rounded"
                  priority
                />
              </div>

              {/* Specs */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 mb-4">
                    {product.category || "General"}
                  </span>

                  <h1 className="text-3xl font-extrabold tracking-tight mb-3">
                    {product.title}
                  </h1>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-yellow-500 text-lg">★</span>
                    <span className="text-sm font-bold">
                      {product.rating.toFixed(1)} / 5.0
                    </span>
                    <span className="text-gray-400">|</span>
                    <span
                      className={`text-xs font-semibold ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of stock"}
                    </span>
                  </div>

                  <p
                    className={`text-base leading-relaxed mb-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {product.description}
                  </p>
                </div>

                <div
                  className={`border-t pt-6 transition-colors duration-300 ${isDark ? "border-gray-700" : "border-gray-100"}`}
                >
                  <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-1">
                    Price
                  </p>
                  <p className="text-4xl font-black text-blue-600 dark:text-blue-400">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Edit Product Mode (Form) */
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span>📝</span> Edit Product Details
              </h2>
              <form
                action={formAction}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={product.title}
                    required
                    className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    defaultValue={product.price}
                    required
                    className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    name="rating"
                    min="0"
                    max="5"
                    step="0.1"
                    defaultValue={product.rating}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="3"
                    defaultValue={product.description}
                    required
                    className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="thumbnail"
                    defaultValue={product.thumbnail}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={product.category}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    defaultValue={product.stock}
                    className={`w-full px-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div className="flex items-end md:col-span-2 gap-4 mt-2">
                  <button
                    type="submit"
                    disabled={isFormPending}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl transition cursor-pointer text-sm shadow-md disabled:bg-gray-500"
                  >
                    {isFormPending ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2.5 rounded-xl transition cursor-pointer text-sm shadow-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              {formState.error && (
                <p className="text-red-500 mt-4 text-xs font-semibold">
                  ⚠️ {formState.error}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    await connectDB();

    const product = await Product.findById(params.id).lean();

    if (!product) {
      return {
        props: {
          product: null,
          error: "Product not found in our database",
        },
      };
    }

    return {
      props: {
        product: JSON.parse(JSON.stringify(product)),
        error: null,
      },
    };
  } catch (error) {
    console.error("Error loading product SSR:", error);

    const isCastError = error.name === "CastError";
    const errorMessage = isCastError
      ? "Invalid Product ID format"
      : "Failed to load product details";

    return {
      props: {
        product: null,
        error: errorMessage,
      },
    };
  }
}
