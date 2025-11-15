import Image from "next/image";
import Hero from "./components/Hero";
import FeaturedCollections from "./components/FeaturedCollections";
import FeaturedProducts from "./components/FeaturedProducts";

export default function Home() {
  return (
   <main>
  <Hero />
  <FeaturedCollections />
  <FeaturedProducts limit={6} />
   </main>
  );
}
