// components/Navbar.jsx
"use client";

import Image from "next/image";
import { useWallet } from "@/context/WalletContext";

export default function Navbar() {
  const { account, loginWallet } = useWallet();
  return (
    <nav className="fixed top-0 right-0 left-0 z- flex items-center justify-between px-8 py-4 shadow-sm bg-white backdrop-blur-lg">
      <div className="text-2xl font-bold text-blue-600 ">
        <a href="/" className="flex items-center justify-center space-x-2">
          <Image
            src="/angler-logo.png"
            width={48}
            height={48}
            alt="Picture of the author"
          />
          <Image
            src="/main-logo.png"
            width={128}
            height={128}
            alt="Picture of the author"
          />
        </a>
      </div>
      <div className="flex items-center gap-6">
        <a
          href="/whitepaper"
          className="text-gray-700 hover:text-blue-500 transition"
        >
          Whitepaper
        </a>
        <a
          href="/docs"
          className="text-gray-700 hover:text-blue-500 transition"
        >
          Docs
        </a>
        <a
          href="/community"
          className="text-gray-700 hover:text-blue-500 transition"
        >
          Community
        </a>
        {!account ? (
          <button
            onClick={loginWallet}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition cursor-pointer"
          >
            Connect Wallet
          </button>
        ) : (
          <span className="text-sm text-gray-600 font-mono">
            ✔ {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        )}
      </div>
    </nav>
  );
}
