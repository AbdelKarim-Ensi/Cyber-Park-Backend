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
        // AJOUT : le mot de passe n'est requis QUE pour les comptes classiques (pas Google)
        required: function () { return this.authProvider === 'local'; },
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
    
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department", default: null },
    
    jobTitle: { type: String, trim: true },
    salary: { type: Number, default: 0 },
    joinDate: { type: Date, default: Date.now },

    resetPasswordToken: { type: String, select: false },
    resetPasswordExpire: { type: Date, select: false },

    // AJOUT : gestion de l'authentification Google via Firebase
    authProvider: { type: String, enum: ["local", "google"], default: "local" },
    googleId: { type: String, default: null, select: false }
  },
  { timestamps: true }
);

user.pre("save", async function () {
  // AJOUT : si pas de mot de passe (compte Google), on ne hash rien
  if (!this.password || !this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

user.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", user);