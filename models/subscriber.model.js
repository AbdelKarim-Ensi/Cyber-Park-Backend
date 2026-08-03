const mongoose = require("mongoose");

const subscriber = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    status: { type: String, enum: ["ACTIVE", "UNSUBSCRIBED"], default: "ACTIVE" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscriber", subscriber);