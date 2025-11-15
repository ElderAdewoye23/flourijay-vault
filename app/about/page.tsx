"use client";

import Image from "next/image";
import AboutShoe from "../../public/aboutShoe.jpg";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Variants } from "framer-motion";

// Reusable animation variants
const fadeUp: Variants= {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          alt="About Image"
          src={AboutShoe}
          priority
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/60"></div>

        {/* Motion Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-center z-10 text-gray-200"
        >
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">
            About Us
          </h1>
          <div className="pt-5 text-sm md:text-base">
            <Link href="/" className="hover:underline">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/products" className="hover:underline">
              Shop
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 px-6 md:px-16 bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200"
      >
        <div className="max-w-5xl mx-auto text-center md:text-left">
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100"
          >
            Our Story
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-6">
            At{" "}
            <span className="font-semibold text-blue-700 dark:text-blue-400">
              The Flourijay Vault
            </span>
            , we believe style is more than what you wear; it’s how you carry
            yourself. Our brand is built on the idea that confidence begins with
            expression, and every detail matters.
          </motion.p>

          <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-6">
            From bold statement shades to classic timepieces and other exclusive
            accessories, we curate collections that speak luxury, personality,
            and individuality. Each piece in our vault tells a story—one of
            taste, confidence, and authenticity.
          </motion.p>

          <motion.p variants={fadeUp} className="text-lg leading-relaxed">
            Whether you’re redefining your look or simply elevating your
            wardrobe, we’re here to make sure you do it with flair and
            confidence.
          </motion.p>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 px-6 md:px-16 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.div variants={fadeUp}>
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To empower individuals to express confidence through curated
              fashion pieces that blend elegance, authenticity, and modern edge.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative w-full h-72 rounded-xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
              alt="Our Mission"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
