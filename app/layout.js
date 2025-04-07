import { Geist } from "next/font/google";
import { WalletProvider } from "@/context/WalletContext";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Angler - Roleplay Social Network",
  description:
    "cd",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} antialiased relative bg-white min-h-screen overflow-x-hidden`}
      >
        {/* Gradient Ellipse Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-400 via-cyan-400 to-green-300 opacity-30 blur-3xl" />
          <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-green-300 via-cyan-300 to-blue-300 opacity-20 blur-2xl" />
        </div>

        <WalletProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
