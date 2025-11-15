"use client";

import Image from "next/image";
import { products } from "../data/products";
import Link from "next/link";
import { useCartStore } from "../store/cartStore";

interface FeaturedProductsProps {
  limit?: number;
  title?: string;
  filter?: (product: (typeof products)[0]) => boolean;
}

export default function FeaturedProducts({
  limit,
  title = "Featured Products",
  filter,
}: FeaturedProductsProps) {
  const addItem = useCartStore((state) => state.addItem);

  const filteredProducts = filter
    ? products.filter(filter)
    : products;

  const displayedProducts = limit
    ? filteredProducts.slice(0, limit)
    : filteredProducts;

  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-950">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Explore our latest arrivals and best-selling accessories.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="relative w-full h-64">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>

            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                ₦{product.price.toLocaleString()}
              </p>

              <div className="flex justify-center gap-3">
                <Link
                  href={`/products/${product.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
                <button
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                  onClick={() => addItem({ ...product, quantity: 1 })}
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
