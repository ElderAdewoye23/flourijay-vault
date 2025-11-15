import Link from "next/link";
import { collections } from "../data/collections";
import Image from "next/image";

export default function FeaturedCollections() {
  return (
    <section className="bg-white dark:bg-gray-950">
      <div className="uppercase text-2xl md:text-3xl font-bold pl-4 mb-10 pt-10 dark:text-gray-200">
        <span>shop</span>
        <br />
        <hr className="border-2 border-gray-200 dark:border-gray-500" />
        <span>by category</span>
      </div>

      {/* Featured collections list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-2">
        {collections.map((collection) => (
          <div
            key={collection.title}
            className="group relative flex flex-col items-center text-center bg-gray-100 dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <div className="w-full aspect-square overflow-hidden rounded-lg mb-4">
              <Image
                src={collection.image}
                alt={collection.title}
                width={400}
                height={400}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
              {collection.title}
            </h3>

            {/* Button / Link */}
            <Link
              href={`/collection/${collection.category}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors duration-300"
            >
              View Collection
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
