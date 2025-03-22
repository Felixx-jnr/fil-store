"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle scroll to add sticky effect
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 35);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="w-full">
      {/* Top Section */}
      <div className="bg-green-900 py-2 text-white text-sm text-center">
        Free shipping on orders over $50! 🎉
      </div>

      {/* Second Section (Sticky Navbar) */}
      <div
        className={`bg-green-800 transition-all duration-300 ${
          isSticky ? "fixed top-0 left-0 w-full shadow-md z-50" : ""
        }`}
      >
        <div className="flex justify-between items-center mx-auto px-6 md:px-10 py-4 max-w-7xl">
          {/* Logo */}
          <Link href="/">
            <span className="font-bold text-blue-600 text-2xl">MyBrand</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-blue-600">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-600">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-600">
                Contact
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md py-4">
            <ul className="space-y-4 text-center">
              <li>
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" onClick={() => setMenuOpen(false)}>
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={() => setMenuOpen(false)}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
