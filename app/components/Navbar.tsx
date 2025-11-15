"use client";
import { useState, useEffect } from "react";
import { Sun, Moon, ShoppingCart, Search, User, Menu, X } from "lucide-react";
import Link from "next/link";
import {useCartStore} from "../store/cartStore"
import ProfileDropdown from "./ProfileDropdown";
import SearchModal from "./Search";
import { products } from "../data/products";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Featured", href: "/featured" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  

  // Handle theme persistence
useEffect(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    setDarkMode(true);
    document.documentElement.classList.add("dark");
  }
}, []);

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);


  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <>
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-wide text-gray-900 dark:text-white">
          Flourijay<span className="text-blue-800 dark:text-blue-400"> Vault</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6 text-md font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <button aria-label="Search">
            <Search className="w-5 h-5 text-gray-700 dark:text-gray-200 hover:text-blue-500"
            
            onClick={() => setSearchOpen(!searchOpen)}
            />
          </button>
         <Link href="/cart" aria-label="Cart" className="relative">
  <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-200 hover:text-blue-500 transition-colors" />
  
  {totalItems > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
      {totalItems}
    </span>
  )}
</Link>

          <ProfileDropdown isAdmin={true} />


          {/* Dark/Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Theme"
            className="p-1 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-800" />
            )}
          </button>

          {/* Hamburger Icon */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            ) : (
              <Menu className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
     {/* 🔍 Search Modal */}
     <SearchModal
     isOpen={searchOpen}
  onClose={() => setSearchOpen(false)}
  products={products}
     />
    

      </>
  );
}