"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../store/cartStore";

export default function CartPage() {
  const { items, removeItem, getTotalPrice, updateQuantity, clearCart } =
    useCartStore();

  if (items.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty 🛒</h2>
        <p className="text-gray-600 mb-4">
          Add some products to continue shopping.
        </p>
        <Link
          href="/products"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Browse Products
        </Link>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600">₦{item.price.toLocaleString()}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="px-2 border rounded"
                  >
                    −
                  </button>
                  <span className="text-gray-700">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-4 flex justify-between items-center">
        <p className="text-xl font-semibold">
          Total: ₦{getTotalPrice().toLocaleString()}
        </p>

        <div className="flex gap-3">
          <button
            onClick={clearCart}
            className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Clear Cart
          </button>
          <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
