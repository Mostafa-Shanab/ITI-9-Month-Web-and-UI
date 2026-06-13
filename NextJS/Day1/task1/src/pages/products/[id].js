import Image from "next/image";
import Link from "next/link";

export default function ProductDetail({ product }) {
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b shadow">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/products"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Back to Products
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="flex items-center justify-center bg-gray-100 rounded">
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={500}
                height={500}
                className="w-full h-auto object-cover "
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>

                <p className="text-sm text-gray-500 mb-4">
                  Category:{" "}
                  <span className="font-semibold">{product.category}</span>
                </p>

                <p className="text-lg text-gray-700 mb-6">
                  {product.description}
                </p>
              </div>

              <div className="border-t pt-6">
                <p className="text-sm text-gray-600 mb-2">Price</p>
                <div className="flex items-baseline gap-2 mb-6">
                  <p className="text-4xl font-bold text-black">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    const products = data.products || [];

    const paths = products.slice(0, 12).map((product) => ({
      params: {
        id: product.id.toString(),
      },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);

    return {
      paths: [],
      fallback: true,
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${params.id}`);

    if (!response.ok) {
      throw new Error("Product not found");
    }

    const product = await response.json();

    return {
      props: {
        product,
        error: null,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching product:", error);

    return {
      props: {
        product: null,
        error: "Failed to load product.",
      },
      revalidate: 10,
    };
  }
}
