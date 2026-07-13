const mongoose = require("mongoose");

const leave = new mongoose.Schema(
  {
    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true },
    type: { 
      type: String, 
      enum: ["ANNUAL", "SICK", "MATERNITY", "UNPAID", "OTHER"], 
      required: [true, "Le type de congé est requis"] 
    },
    startDate: { 
        type: Date, 
        required: [true, "La date de début est requise"] },
    endDate: { 
        type: Date, 
        required: [true, "La date de fin est requise"] },
    reason: { 
        type: String, 
        required: [true, "Le motif du congé est requis"], 
        trim: true },
    status: { 
      type: String, 
      enum: ["PENDING", "APPROVED", "REJECTED"], 
      default: "PENDING" 
    },
    approvedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        default: null },
    rejectionReason: { 
        type: String, 
        trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Leave", leave);