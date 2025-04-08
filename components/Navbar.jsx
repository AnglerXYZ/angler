"use client";

import { useState } from "react";
import Image from "next/image";
import { useWallet } from "@/context/WalletContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { account, loginWallet } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-4 shadow-sm bg-white backdrop-blur-lg border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <a href="/" className="flex items-center space-x-2">
          <Image src="/angler-logo.png" width={40} height={40} alt="Logo" />
          <Image src="/main-logo.png" width={120} height={40} alt="Main" />
        </a>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <a href="/whitepaper" className="text-gray-700 hover:text-blue-500 transition">Whitepaper</a>
        <a href="/docs" className="text-gray-700 hover:text-blue-500 transition">Docs</a>
        <a href="/community" className="text-gray-700 hover:text-blue-500 transition">Community</a>

        {!account ? (
          <button
            onClick={loginWallet}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
          >
            Connect Wallet
          </button>
        ) : (
          <span className="text-sm text-gray-600 font-mono">
            ✔ {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-gray-700"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden flex flex-col items-center space-y-4 py-6">
          <a href="/whitepaper" className="text-gray-700 hover:text-blue-500 transition">Whitepaper</a>
          <a href="/docs" className="text-gray-700 hover:text-blue-500 transition">Docs</a>
          <a href="/community" className="text-gray-700 hover:text-blue-500 transition">Community</a>

          {!account ? (
            <button
              onClick={() => {
                loginWallet();
                setMenuOpen(false);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
            >
              Connect Wallet
            </button>
          ) : (
            <span className="text-sm text-gray-600 font-mono">
              ✔ {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          )}
        </div>
      )}
    </nav>
  );
}
