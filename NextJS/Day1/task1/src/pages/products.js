import ProductCard from "@/components/ProductCard";

export default function Products({ products }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.thumbnail}
                description={product.description}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch("https://dummyjson.com/products");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    const products = data.products || [];

    return {
      props: {
        products,
        error: null,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching products:", error);

    return {
      props: {
        products: [],
        error: "Failed to fetch products. Please try again later.",
      },
      revalidate: 10,
    };
  }
}
