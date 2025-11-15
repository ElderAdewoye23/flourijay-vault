// app/collections/[category]/page.tsx
"use client";

import { products } from "../../data/products";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../../store/cartStore";

interface Props {
  params: { category: string };
}

export default function CategoryPage({ params }: Props) {
  const { category } = params;
  const addItem = useCartStore.getState().addItem;

  // Filter products by category
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold capitalize">
          No products found for {category}
        </h2>
      </div>
    );
  }

  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-950 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
          {category} Collection
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Explore our curated {category} products.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="relative w-full h-64">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                ₦{product.price.toLocaleString()}
              </p>

              {/* Action Buttons */}
              <div className="flex justify-center gap-3">
                <Link
                  href={`/products/${product.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>

                <button
                  onClick={() => addItem({ ...product, quantity: 1 })}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
