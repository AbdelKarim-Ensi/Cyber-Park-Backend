const mongoose = require("mongoose");

const salaryAdvance = new mongoose.Schema(
  {
    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true },
    amount: { 
        type: Number, 
        required: [true, "Le montant de l'avance est requis"], 
        min: [1, "Le montant doit être supérieur à 0"] },
    reason: { 
        type: String, 
        required: [true, "Le motif est requis"], 
        trim: true },
    repaymentMonth: { 
        type: String, 
        required: [true, "Le mois de remboursement est requis (ex: 2026-08)"] },
    status: { 
      type: String, 
      enum: ["PENDING", "APPROVED", "REJECTED", "PAID"], 
      default: "PENDING" 
    },
    processedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("SalaryAdvance", salaryAdvance);