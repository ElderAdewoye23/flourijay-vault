"use client"

import FeaturedProducts from "../components/FeaturedProducts";
import { products } from "../data/products";

export default function NewArrivalsPage() {
  return (
    <div>
      <FeaturedProducts
        title="New Arrivals"
        filter={(product) => product.newArrival}
      />
    </div>
  );
}