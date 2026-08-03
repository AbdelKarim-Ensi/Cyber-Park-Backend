const mongoose = require("mongoose");

const department = new mongoose.Schema(
  {
    name: {
        type: String,
        required: [true, "Le nom du département est requis"],
        unique: true,
        trim: true },
    description: {
        type: String,
        trim: true },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null },
    // AJOUT : liste des employés membres de ce département
    membres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", department);