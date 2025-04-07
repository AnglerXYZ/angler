"use client";

import { useState, useEffect } from "react";
import { getContract, getWaitlistAddresses } from "@/utils/waitlistContract";
import { useWallet } from "@/context/WalletContext";

export default function Home() {
  const [postLink, setPostLink] = useState("");
  const [status, setStatus] = useState("");
  const { account, loginWallet } = useWallet();

  const saveAndJoin = async () => {
    if (!account || !postLink) {
      return alert("Please connect wallet and paste your post link.");
    }

    try {
      const res = await fetch("/api/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: account, postLink }),
      });

      const data = await res.json();
      if (!data.success) {
        setStatus("❌ Failed to save user: " + data.error);
        return;
      }

      const contract = await getContract();
      const tx = await contract.joinWaitlist();
      await tx.wait();

      setStatus("🎉 Successfully joined the waitlist!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Error joining waitlist.");
    }
  };

  return (
    <div className="min-h-screen flex items-center">
      {/* Main Content */}
      <div className="main-section z-10 p-8 max-w-4xl mx-auto min-h-[calc(100vh-100px)] flex items-center justify-center flex-col">
        {/* Hero Section */}
        <section className="relative z-10 text-center py-4 px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Join the Angler Waitlist
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
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
            chaotic alter ego, Angler gives you the stage to be anyone. It’s all
            about raw imagination, no filters, no pressure—just stories, jokes,
            drama, and daydreams. Because sometimes, saying less makes you feel{" "}
            <span className="italic">more</span>.{" "}
            <span className="font-bold text-indigo-600">
              Welcome to Angler—where roles speak louder than selfies.
            </span>{" "}
            🎭
          </p>
          {account && <></>}
          {!account ? (
            <button
              onClick={loginWallet}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition cursor-pointer mt-6"
            >
              Connect Wallet
            </button>
          ) : (
            <></>
          )}
        </section>

        {account && (
          <>
            {/* Post Instruction Box */}
            <div className="w-full bg-white/70 backdrop-blur-md p-4 mb-6 rounded-lg shadow text-left border-l-4 border-blue-500">
              <h3 className="text-md font-semibold mb-1 text-gray-800">
                🎯 How to Join:
              </h3>
              <p className="text-sm text-gray-700">
                1. Make a post on X (Twitter) using the hashtags{" "}
                <span className="font-semibold text-blue-600">#angler</span> and{" "}
                <span className="font-semibold text-purple-600">
                  #anglerroleplay
                </span>
                .<br />
                2. Mention or tag{" "}
                <span className="font-semibold text-green-600">2 friends</span>.
                <br />
                3. Paste the post link below and join the waitlist!
              </p>
            </div>
            <input
              type="text"
              value={postLink}
              onChange={(e) => setPostLink(e.target.value)}
              placeholder="Paste your X post link here"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-400 text-gray-900"
            />

            <button
              onClick={saveAndJoin}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md transition cursor-pointer"
            >
              Join Waitlist
            </button>

            {status && <p className="mt-4 text-sm text-gray-800">{status}</p>}
          </>
        )}
      </div>
    </div>
  );
}
