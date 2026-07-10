// scripts/seedAdmin.js
// Usage : node scripts/seedAdmin.js
// Crée un ou plusieurs comptes ADMIN directement en base.
// À lancer une seule fois après avoir vidé la collection users (ou à tout moment pour ajouter un nouvel admin).

require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user.model");

// ⚠️ Ajoute autant d'admins que tu veux dans ce tableau
const ADMINS_TO_CREATE = [
  {
    email: "aboudaa.med@gmail.com",
    password: "123456789",
    firstName: "Admin",
    lastName: "Cyber Park"
  },
  // Ajoute d'autres objets ici si besoin
];

async function seedAdmins() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connecté à MongoDB");

    for (const adminData of ADMINS_TO_CREATE) {
      const existing = await User.findOne({ email: adminData.email.toLowerCase() });

      if (existing) {
        console.log(`⚠️ ${adminData.email} existe déjà — ignoré.`);
        continue;
      }

      const admin = new User({
        firstName: adminData.firstName,
        lastName: adminData.lastName,
        email: adminData.email.toLowerCase(),
        password: adminData.password,
        authProvider: "local",
        role: "ADMIN",
        status: "ACTIVE"
      });

      await admin.save();
      console.log(`✅ ADMIN créé : ${adminData.email} / ${adminData.password}`);
    }

    console.log("🎉 Terminé.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur:", error.message);
    process.exit(1);
  }
}

seedAdmins();