"use client";

import { usePathname } from "next/navigation";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  
  const navItems = [
    { href: "/../", label: "Anasayfa" },
    { href: "/", label: "Sepetim" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-gray-100 to-gray-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-12 lg:px-4 xl:px-0 h-[70px] flex items-center justify-between ">
        <div className="text-2xl font-extrabold text-gray-800 tracking-wide">
          <Link href="/">
            Kayra <span className="text-blue-500">Export</span>
          </Link>
        </div>

        <nav className="hidden sm:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-gray-700 font-medium transition 
              hover:text-blue-500
              after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all hover:after:w-full
             `}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="sm:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`sm:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center p-4 gap-4 bg-gray-100 border-t border-gray-200">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-gray-700 font-medium transition hover:text-blue-500
                ${pathname === item.href ? "text-blue-500" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
