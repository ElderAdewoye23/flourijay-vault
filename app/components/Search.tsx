
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect} from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

export default function SearchModal({ isOpen, onClose, products }: SearchModalProps) {
  const [query, setQuery] = useState("");
   // 🧠 Reset input whenever modal closes
  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[60]"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-900 w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded-xl shadow-lg max-h-[80vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Search className="w-5 h-5" /> Search Products
              </h2>
              <button onClick={onClose}>
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-red-500" />
              </button>
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-3 mb-6 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Results */}
            <div className="grid gap-4">
              {query === "" ? (
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Start typing to search...
                </p>
              ) : filtered.length > 0 ? (
                filtered.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {product.name}
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                        ₦{product.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  No products found for “{query}”
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
