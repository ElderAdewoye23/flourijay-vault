"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Watch from "../../public/watch.jpg";
import Image from "next/image";


export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
      <Image
          alt="Accessories collection"
          src={Watch}
       
        priority
          className="absolute inset-0 w-full h-full object-cover"
        />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/60"></div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center text-white z-10 px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Elevate Your Style
        </h1>
        <p className="text-lg md:text-xl mb-6">
        <em>  Every Piece A Statement</em>
        </p>
        <Link
          href="/products"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
        >
          Shop Now
        </Link>
      </motion.div>
    </section>
  );
}
