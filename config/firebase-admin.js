// AJOUT : initialisation du SDK Admin Firebase, utilisé pour vérifier
// les tokens Google envoyés par le frontend (Google Sign-In via Firebase Auth)
const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const serviceAccount = require("./firebase-adminsdk.json");

const app = initializeApp({
  credential: cert(serviceAccount)
});

const adminAuth = getAuth(app);

module.exports = adminAuth;