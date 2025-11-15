
import { products } from "../../data/products";
import Image from "next/image";
import Link from "next/link";

interface ProductPageProps {
  params: {
    id: string;
  };
}
    

export default function ProductDetails({ params }: ProductPageProps) {
  const product = products.find((p) => p.id.toString() === params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 dark:text-gray-200">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="relative w-full h-96">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3">
            {product.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {product.description || "This stylish piece adds a touch of elegance to any outfit."}
          </p>
          <p className="text-2xl font-semibold text-blue-700 mb-6">
            ₦{product.price.toLocaleString()}
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
            <Link
              href="/products"
              className="px-6 py-2 border border-gray-400 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
