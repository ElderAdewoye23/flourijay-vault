"use client";
import { useState, useEffect, useRef } from "react";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function ProfileDropdown({ isAdmin = false }: { isAdmin?: boolean }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Profile/Admin"
        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
      >
        <User className="w-5 h-5 text-gray-700 dark:text-gray-200 hover:text-blue-500" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 z-50">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            My Profile
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              className=" px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" /> Admin Dashboard
            </Link>
          )}

          {/* <button
            onClick={() => alert("Logging out...")}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button> */}
        </div>
      )}
    </div>
  );
}
