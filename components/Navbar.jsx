"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { IoSearchOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ProfileTooltip from "./ProfileTooltip";
import { useSelector } from "react-redux";

const homeLinks = [
  {
    link: "Home",
    ref: "/",
  },
  {
    link: "Shop",
    ref: "/products",
  },
  {
    link: "Track",
    ref: "/track",
  },
  
];

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  const staticPaths = ["/register", "/login", "/verify", "/reset-password"];
  const noNavigationMenu = staticPaths.includes(pathname);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (noNavigationMenu) {
    return null;
  }

  return (
    <nav className="w-full">
      {/* Second Section (Sticky Navbar) */}
      <div
        className={` w-full z-50 fixed top-0 left-0 bg-filgreen text-light transition-all duration-300 ${
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
                src="/fillogo-white.webp"
              />
            </Link>

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
            </div>

            <ul className="hidden md:flex md:items-center space-x-4">
              <ProfileTooltip isAuthenticated={isAuthenticated} />

              <li>
                <Link
                  href="/cart"
                  className="relative"
                >
                  <BsCart3 className="hover:text-mustard text-xl" />
                  {hasMounted && totalItems > 0 && (
                    <div className="-top-2 -right-2 absolute flex justify-center items-center bg-red-500 rounded-full w-5 h-5 text-white text-xs">
                      {totalItems}
                    </div>
                  )}
                </Link>
              </li>

              <IoSearchOutline className="text-xl" />
            </ul>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ProfileTooltip isAuthenticated={isAuthenticated} />
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
