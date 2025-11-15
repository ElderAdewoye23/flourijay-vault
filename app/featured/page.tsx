"use client"

import FeaturedProducts from "../components/FeaturedProducts";

export default function FeaturedPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <FeaturedProducts  title="Featured Products"
        filter={(product) => product.featured} />
    </main>
  );
}