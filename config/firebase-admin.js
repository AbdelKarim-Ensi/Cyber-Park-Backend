// AJOUT : initialisation du SDK Admin Firebase, utilise pour verifier
// les tokens Google envoyes par le frontend (Google Sign-In via Firebase Auth)
const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
};
const app = initializeApp({
  credential: cert(serviceAccount)
});
const adminAuth = getAuth(app);
module.exports = adminAuth;
