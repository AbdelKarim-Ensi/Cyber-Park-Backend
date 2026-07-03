const mongoose = require("mongoose");

const project = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: [true, "Le nom du projet est requis"], 
        trim: true },
    description: { 
        type: String, 
        required: [true, "La description est requise"] },
    status: { 
      type: String, 
      enum: [ "IN_PROGRESS", "ON_HOLD", "COMPLETED","PENDING"], 
      default: "PENDING" 
    },
    startDate: { 
        type: Date, 
        required: [true, "La date de début est requise"] },
    endDate: { 
        type: Date 
    },
    
    assignedEmployees: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", project);