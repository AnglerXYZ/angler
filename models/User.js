// models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  postLink: { type: String, required: true },
  ip: { type: String, required: true }, // << tambahkan ini
  joinedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
