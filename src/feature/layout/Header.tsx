"use client";

import { ThemeToggle } from "@/src/theme/ThemeToggle";
import { LockKeyhole, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between p-4 relative z-50">
      <h2 className="text-2xl font-bold">
        <Link href="/" className="flex items-center">
          <LockKeyhole className="text-green-400" size={30} />
          <p className="text-green-400 pl-1">De</p>crypto
        </Link>
      </h2>
      <nav className="hidden md:flex space-x-8 font-bold">
        <Link href="/RSA">RSA</Link>
        <Link href="/Affine">Affine</Link>
        <Link href="/Cesar">César</Link>
      </nav>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex flex-col justify-center items-center z-40">
          <button
            onClick={toggleMenu}
            aria-label="Close Menu"
            className="absolute top-6 right-6 text-white"
          >
            <X size={30} />
          </button>
          <nav className="text-center">
            <ul className="space-y-8">
              <li>
                <Link href="/RSA" onClick={() => setIsMenuOpen(false)}>
                  RSA
                </Link>
              </li>
              <li>
                <Link href="/Affine" onClick={() => setIsMenuOpen(false)}>
                  Affine
                </Link>
              </li>
              <li>
                <Link href="/Cesar" onClick={() => setIsMenuOpen(false)}>
                  César
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
      <div className="hidden md:block">
        <ThemeToggle />
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} aria-label="Toggle Menu">
          {!isMenuOpen && <Menu size={30} />}
        </button>
      </div>
    </header>
  );
};
