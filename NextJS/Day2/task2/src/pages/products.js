import {
  useState,
  useEffect,
  useTransition,
  useOptimistic,
  useDeferredValue,
  useActionState,
} from "react";
import ProductCard from "@/components/ProductCard";
import connectDB from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { useTheme } from "./_app";

export default function Products({ initialProducts, totalCount }) {
  const { isDark } = useTheme();
  const [products, setProducts] = useState(initialProducts);
  const [isPending, startTransition] = useTransition();

  const [optimisticProducts, addOptimisticProduct] = useOptimistic(
    products,
    (state, newProduct) => [newProduct, ...state],
  );

  // Search and filter states
  const [searchInput, setSearchInput] = useState("");
  const deferredSearchValue = useDeferredValue(searchInput);

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minRating: "",
    sortBy: "price",
    sortOrder: "asc",
  });

  const [totalProducts, setTotalProducts] = useState(totalCount);

  // Remove a product from local state after inline delete
  const handleProductDelete = (deletedId) => {
    setProducts((prev) => prev.filter((p) => (p._id || p.id) !== deletedId));
    setTotalProducts((prev) => Math.max(0, prev - 1));
  };

  useEffect(() => {
    const fetchProducts = async (searchTerm = "", filterObj = filters) => {
      try {
        const params = new URLSearchParams({
          search: searchTerm,
          sortBy: filterObj.sortBy,
          sortOrder: filterObj.sortOrder,
          minPrice: filterObj.minPrice,
          maxPrice: filterObj.maxPrice,
          minRating: filterObj.minRating,
        });

        const response = await fetch(`/api/products?${params}`);
        const data = await response.json();

        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    startTransition(() => {
      fetchProducts(deferredSearchValue, filters);
    });
  }, [deferredSearchValue, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const [formState, formAction, isFormPending] = useActionState(
    async (prevState, formData) => {
      const newProductData = {
        title: formData.get("title"),
        description: formData.get("description"),
        price: parseFloat(formData.get("price")),
        thumbnail:
          formData.get("thumbnail") ||
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
        rating: parseFloat(formData.get("rating")) || 0,
        category: formData.get("category") || "General",
        stock: parseInt(formData.get("stock")) || 10,
      };

      addOptimisticProduct({
        ...newProductData,
        _id: "temp-" + Date.now(),
        id: "temp-" + Date.now(),
      });

      try {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProductData),
        });

        const data = await response.json();

        if (data.success) {
          fetchProducts(deferredSearchValue, filters);

          return { success: true, message: "Product created successfully!" };
        } else {
          return { success: false, error: data.message };
        }
      } catch (err) {
        return { success: false, error: err.message };
      }
    },
    { success: false },
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="max-w-7xl mx-auto py-10 px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Catalog</h1>
            <p
              className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              Showing {totalProducts} premium products available for you.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
          <div
            className={`p-6 rounded-2xl shadow-md border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
          >
            <h3 className="text-lg font-bold mb-4">Filters & Sorting</h3>

            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">
                Search Products
              </label>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={`w-full px-4 py-2 rounded-xl border text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">
                Min Price ($)
              </label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="0"
                className={`w-full px-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-gray-50 border-gray-300 text-gray-900"
                }`}
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">
                Max Price ($)
              </label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Any"
                className={`w-full px-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-gray-50 border-gray-300 text-gray-900"
                }`}
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">
                Minimum Rating
              </label>
              <select
                name="minRating"
                value={filters.minRating}
                onChange={handleFilterChange}
                className={`w-full px-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-gray-50 border-gray-300 text-gray-900"
                }`}
              >
                <option value="">All Ratings</option>
                <option value="3">3★ & above</option>
                <option value="4">4★ & above</option>
                <option value="4.5">4.5★ & above</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">
                Sort By
              </label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className={`w-full px-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-gray-50 border-gray-300 text-gray-900"
                }`}
              >
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <div className="mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-500">
                Direction
              </label>
              <select
                name="sortOrder"
                value={filters.sortOrder}
                onChange={handleFilterChange}
                className={`w-full px-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-gray-50 border-gray-300 text-gray-900"
                }`}
              >
                <option value="asc">Low to High / A-Z</option>
                <option value="desc">High to Low / Z-A</option>
              </select>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div
              className={`p-6 rounded-2xl shadow-md border mb-8 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                Add New Product
              </h3>
              <form
                action={formAction}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="md:col-span-2">
                  <input
                    type="text"
                    name="title"
                    placeholder="Product Title"
                    required
                    className={`w-full px-4 py-2 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="price"
                    placeholder="Price ($)"
                    step="0.01"
                    required
                    className={`w-full px-4 py-2 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="rating"
                    placeholder="Rating (0.0 - 5.0)"
                    min="0"
                    max="5"
                    step="0.1"
                    className={`w-full px-4 py-2 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div className="md:col-span-2">
                  <textarea
                    name="description"
                    placeholder="Brief description of the product..."
                    required
                    rows="2"
                    className={`w-full px-4 py-2 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="thumbnail"
                    placeholder="Image URL"
                    className={`w-full px-4 py-2 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="category"
                    placeholder="Category (e.g. Shoes, Audio)"
                    className={`w-full px-4 py-2 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock quantity"
                    className={`w-full px-4 py-2 rounded-xl border text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isFormPending}
                    className="w-full bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl hover:bg-blue-700 transition cursor-pointer text-sm shadow-md disabled:bg-gray-500"
                  >
                    {isFormPending ? "Adding..." : "Add Product"}
                  </button>
                </div>
              </form>
              {formState.error && (
                <p className="text-red-500 mt-2 text-xs font-semibold">
                  ⚠️ {formState.error}
                </p>
              )}
            </div>

            {isPending ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent mb-2"></div>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Updating results...
                </p>
              </div>
            ) : optimisticProducts && optimisticProducts.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {optimisticProducts.map((product) => (
                    <ProductCard
                      key={product._id || product.id}
                      id={product._id || product.id}
                      title={product.title}
                      price={product.price}
                      image={product.thumbnail}
                      description={product.description}
                      rating={product.rating || 0}
                      category={product.category}
                      stock={product.stock}
                      onDelete={handleProductDelete}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div
                className={`text-center py-20 rounded-2xl border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
              >
                <p className="text-lg font-semibold mb-2">No products found</p>
                <p
                  className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Try clearing your search or adjusting filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    await connectDB();
    const products = await Product.find({});

    const totalCount = await Product.countDocuments({});

    return {
      props: {
        initialProducts: JSON.parse(JSON.stringify(products)),
        totalCount,
      },
    };
  } catch (error) {
    console.error("Error loading products SSR:", error);
    return {
      props: {
        initialProducts: [],
        totalCount: 0,
      },
    };
  }
}
