const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const user = new mongoose.Schema(
  {
    firstName: { 
        type: String, 
        required: [true, "Le prénom est requis"], 
        trim: true },
    lastName: { 
        type: String, 
        required: [true, "Le nom est requis"], 
        trim: true },
    email: { 
      type: String, 
      required: [true, "L'adresse email est requise"], 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    password: { 
        type: String, 
        required: [true, "Le mot de passe est requis"], 
        minlength: 6, 
        select: false },
    role: { 
        type: String, 
        enum: ["ADMIN", "EMPLOYEE"], 
        default: "EMPLOYEE" },
    status: { 
        type: String, 
        enum: ["ACTIVE", "INACTIVE"], 
        default: "ACTIVE" },
    avatar: { 
        type: String, 
        default: "default-avatar.png" },
    phone: { 
        type: String, 
        trim: true },
    
    // Relations
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department", default: null },
    
    // Informations professionnelles
    jobTitle: { type: String, trim: true },
    salary: { type: Number, default: 0 },
    joinDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Sécurité : Hashage du mot de passe avant sauvegarde
user.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// Méthode personnalisée pour comparer les mots de passe lors du Login
user.methods.comparePassword = async function (candidatePassword) {
  // "this.password" correspond au mot de passe hashé récupéré en BDD
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", user);