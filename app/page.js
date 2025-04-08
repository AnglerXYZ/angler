"use client";

import { useState } from "react";
import { getContract } from "@/utils/waitlistContract";
import { useWallet } from "@/context/WalletContext";

export default function Home() {
  const [postLink, setPostLink] = useState("");
  const [linkError, setLinkError] = useState("");
  const [status, setStatus] = useState("");
  const { account, loginWallet } = useWallet();

  const isValidXPostLink = (link) => {
    const regex = /^https:\/\/x\.com\/[a-zA-Z0-9_]+\/status\/\d+(\?.*)?\/?$/;
    return regex.test(link);
  };

  const handlePostLinkChange = (e) => {
    const value = e.target.value;
    setPostLink(value);

    if (value.trim() === "") {
      setLinkError("");
    } else if (!isValidXPostLink(value)) {
      setLinkError(
        "Link must be a valid X post. Example: https://x.com/username/status/1234567890"
      );
    } else {
      setLinkError("");
    }
  };

  const saveAndJoin = async () => {
    if (!account) return alert("Please connect your wallet.");
    if (!isValidXPostLink(postLink)) return alert("Invalid X post link.");

    try {
      const contract = await getContract();
      const alreadyJoined = await contract.isWaitlisted(account);
      if (alreadyJoined) {
        setStatus("✅ You've already joined the waitlist.");
        return;
      }

      setStatus("⏳ Waiting for transaction approval...");
      const tx = await contract.joinWaitlist();
      await tx.wait();

      setStatus("🎉 Successfully joined the waitlist!");

      const res = await fetch("/api/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: account, postLink }),
      });

      const data = await res.json();
      if (!data.success) {
        setStatus("❌ Failed to save user: " + data.error);
      }
    } catch (err) {
      console.error("Transaction error:", err);
      if (err.code === 4001) {
        setStatus("❌ Transaction rejected by user.");
      } else {
        setStatus("❌ Error: " + (err?.reason || err?.message));
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center px-4 md:px-8">
      <div className="z-10 py-10 md:py-20 max-w-4xl mx-auto w-full flex items-center justify-center flex-col">
        {/* Hero Section */}
        <section className="text-center px-2 sm:px-4 lg:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Join the Angler Waitlist
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
            <span className="font-semibold text-purple-600">Angler</span> isn’t
            just another social media—it's a{" "}
            <span className="italic">creative playground</span> where
            storytelling takes the lead. No{" "}
            <span className="font-semibold text-red-600">photos</span>, no{" "}
            <span className="font-semibold text-yellow-600">videos</span>—just{" "}
            <span className="font-semibold text-blue-600">text</span>,{" "}
            <span className="font-semibold text-purple-600">stickers</span>, and{" "}
            <span className="font-semibold text-green-600">GIFs</span>. Whether
            you're a space pirate, an alternate-universe barista, or your
            chaotic alter ego, Angler gives you the stage to be anyone.
            <br className="hidden md:block" />
            <span className="font-bold text-indigo-600 block mt-4">
              Welcome to Angler—where roles speak louder than selfies. 🎭
            </span>
          </p>

          {!account && (
            <button
              onClick={loginWallet}
              className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition text-base sm:text-lg"
            >
              Connect Wallet
            </button>
          )}
        </section>

        {/* Conditional Content */}
        {account && (
          <div className="w-full mt-10 px-2 sm:px-4 lg:px-6">
            {/* Instruction */}
            <div className="bg-white/70 backdrop-blur-md p-4 mb-6 rounded-lg shadow text-left border-l-4 border-blue-500">
              <h3 className="text-base md:text-lg font-semibold mb-1 text-gray-800">
                🎯 How to Join:
              </h3>
              <p className="text-sm md:text-base text-gray-700">
                1. Post on X using hashtags{" "}
                <span className="font-semibold text-blue-600">#angler</span> and{" "}
                <span className="font-semibold text-purple-600">
                  #anglerroleplay
                </span>
                .<br />
                2. Mention or tag{" "}
                <span className="font-semibold text-green-600">2 friends</span>.
                <br />
                3. Paste your post link below and join the waitlist!
              </p>
            </div>

            {/* Input */}
            <input
              type="text"
              value={postLink}
              onChange={handlePostLinkChange}
              placeholder="Paste your X post link here"
              className={`w-full p-3 border ${
                linkError ? "border-red-500" : "border-gray-300"
              } rounded-lg mb-2 focus:outline-none focus:ring-2 ${
                linkError ? "focus:ring-red-400" : "focus:ring-gray-400"
              } placeholder-gray-400 text-gray-900 text-sm sm:text-base`}
            />
            {linkError && (
              <p className="text-sm text-red-600 mb-4">{linkError}</p>
            )}

            {/* Button */}
            <button
              onClick={saveAndJoin}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md transition cursor-pointer text-base sm:text-lg"
              disabled={!!linkError || postLink.trim() === ""}
            >
              Join Waitlist
            </button>

            {/* Status Message */}
            {status && (
              <p className="mt-4 text-sm md:text-base text-gray-800">
                {status}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
