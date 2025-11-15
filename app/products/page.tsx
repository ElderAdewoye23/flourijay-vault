"use client";
import { useState } from "react";
import { products } from "../data/products";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../store/cartStore";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // 🔍 Extract unique categories from the products list
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // 🧮 Filter products by category + search
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addItem = useCartStore((state) => state.addItem);

  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-950 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          All Products
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Browse our full collection of premium accessories.
        </p>
      </div>

      {/* 🔹 Filters Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto mb-8">
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-200 p-2 rounded-md w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {categories.map((category) => (
            <option key={category} value={category} className="text-gray-800">
              {category}
            </option>
          ))}
        </select>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-200 p-2 rounded-md w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* 🔹 Product Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-64 object-cover"
              />
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
                  <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                  onClick={() => addItem({ ...product, quantity: 1 } ) }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
