"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BsPerson } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import Image from "next/image";

const homeLogo = [
  {
    link: <BsPerson />,
    ref: "/profile",
  },
  {
    link: <IoSearchOutline />,
    ref: "/search",
  },
  {
    link: <BsCart3 />,
    ref: "/cart",
  },
];

const homeLinks = [
  {
    link: "Home",
    ref: "/",
  },
  {
    link: "Shop",
    ref: "/shop",
  },
  {
    link: "About",
    ref: "/about",
  },
  {
    link: "Contact",
    ref: "/contact",
  },
];

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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  return (
    <nav className="w-full">
      {/* Top Section */}
      {!menuOpen && (
        <div className="bg-dark py-2 font-poppins text-light text-sm text-center">
          Free shipping on orders over 5k within Lagos🎉
        </div>
      )}

      {/* Second Section (Sticky Navbar) */}
      <div
        className={` bg-green-900 text-light transition-all duration-300 py-1 ${
          isSticky ? "fixed top-0 left-0 w-full z-50" : ""
        }`}
      >
        <div className="px-6 sm:px-10 md:px-14 lg:px-28">
          {/* LOGO AND BRAND-LOGOS */}
          <div className="flex justify-between items-center mx-auto">
            <Link href="/">
              <Image
                className="py-2 text-xl"
                width={82.5}
                height={35.5}
                alt="Fil"
                src="/fillogo.png"
              />
            </Link>

            <ul className="hidden md:flex space-x-4">
              {homeLogo.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.ref}
                    className="font-extrabold hover:text-mustard text-xl"
                  >
                    {link.link}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <BsCart3 className="font-extralight hover:text-mustard text-2xl" />
              <IoSearchOutline className="hover:text-mustard text-2xl" />
              <button
                className="hover:text-mustard"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="flex justify-between items-center mx-auto">
            <ul className="hidden md:flex space-x-5 text-sm">
              {homeLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.ref}
                    className="font-poppins hover:text-mustard"
                  >
                    {link.link}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="hidden md:flex space-x-5 text-sm">
              <li>
                <p className="font-poppins hover:text-mustard">Support</p>
              </li>
              <li>
                <p className="font-poppins hover:text-mustard">Explore</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden relative bg-dark py-4 h-screen">
            <ul className="top-1/2 left-1/2 absolute space-y-4 text-center -translate-x-1/2 -translate-y-1/2 transform">
              {homeLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.ref}
                    className="font-poppins hover:text-mustard"
                  >
                    {link.link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
