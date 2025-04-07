// /app/api/save-user/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const { address, postLink } = await req.json();

    if (!address || !postLink) {
      return NextResponse.json(
        { success: false, error: "Missing address or post link" },
        { status: 400 }
      );
    }

    await connectDB();

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    // Cek apakah IP sudah pernah digunakan
    const ipExist = await User.findOne({ ip });
    if (ipExist) {
      return NextResponse.json(
        { success: false, error: "This IP has already registered." },
        { status: 403 }
      );
    }

    // Cek apakah address sudah terdaftar
    const existing = await User.findOne({ address });
    if (existing) {
      return NextResponse.json({ success: true, message: "Already in waitlist" });
    }

    await User.create({ address, postLink, ip });

    return NextResponse.json({ success: true, message: "User saved" });
  } catch (err) {
    console.error("Save user error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
