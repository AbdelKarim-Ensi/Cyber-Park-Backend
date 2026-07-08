const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/mailer");
const adminAuth = require("../config/firebase-admin"); // AJOUT : vérification des tokens Google

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || "fallback_secret_key_look_at_your_env_file";
  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "8h"
  });
};

// @desc    Inscription d'un nouvel utilisateur
// @route   POST /auth/register
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "Cet email est déjà utilisé." });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: "EMPLOYEE" // Par défaut, tous les nouveaux utilisateurs sont des employés
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Utilisateur créé avec succès.",
      token,
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Connexion de l'utilisateur
// @route   POST /auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Veuillez fournir un email et un mot de passe." });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Identifiants incorrects." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Identifiants incorrects." });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Connexion réussie.",
      token,
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Demande de réinitialisation de mot de passe
// @route   POST /auth/forgot-password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Veuillez fournir un email." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "Si cet email existe, un lien de réinitialisation a été envoyé."
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:4200";
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

    const html = `
      <h2>Réinitialisation de mot de passe - Cyber Park HR</h2>
      <p>Bonjour ${user.firstName},</p>
      <p>Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous (valide 15 minutes) :</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
    `;

    res.status(200).json({
      success: true,
      message: "Si cet email existe, un lien de réinitialisation a été envoyé."
    });

    sendEmail({
      to: user.email,
      subject: "Réinitialisation de votre mot de passe",
      html
    }).catch(async (emailError) => {
      console.error("Erreur envoi email de reset:", emailError.message);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Réinitialisation effective du mot de passe via le token
// @route   POST /auth/reset-password/:token
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Le mot de passe doit contenir au moins 6 caractères."
      });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    }).select("+resetPasswordToken +resetPasswordExpire");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Le lien de réinitialisation est invalide ou a expiré."
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Mot de passe réinitialisé avec succès."
    });

    const html = `
      <h2>Mot de passe modifié - Cyber Park HR</h2>
      <p>Bonjour ${user.firstName},</p>
      <p>Votre mot de passe a été réinitialisé avec succès.</p>
      <p>Si vous n'êtes pas à l'origine de cette action, contactez immédiatement un administrateur.</p>
    `;

    sendEmail({
      to: user.email,
      subject: "Votre mot de passe a été modifié",
      html
    }).catch((emailError) => {
      console.error("Erreur envoi email de confirmation:", emailError.message);
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// AJOUT : @desc    Connexion / inscription via Google (Firebase Auth)
// AJOUT : @route   POST /auth/google
exports.googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
        console.log('Type idToken:', typeof idToken);
    console.log('Longueur idToken:', idToken?.length);
    console.log('Début idToken:', idToken?.substring(0, 50));


    if (!idToken) {
      return res.status(400).json({ success: false, message: "Token Google manquant." });
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const { email, given_name, family_name, name, uid } = decodedToken;

    if (!email) {
      return res.status(400).json({ success: false, message: "Aucun email associé à ce compte Google." });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        firstName: given_name || name || "Utilisateur",
        lastName: family_name || "Google",
        email,
        authProvider: "google",
        googleId: uid,
        role: "EMPLOYEE"
      });
    } else if (user.authProvider !== "google") {
      user.googleId = uid;
      await user.save({ validateBeforeSave: false });
    }

    if (user.status === "INACTIVE") {
      return res.status(403).json({ success: false, message: "Ce compte a été désactivé. Contactez un administrateur." });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Connexion Google réussie.",
      token,
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Erreur Google Login:", error.message);
    return res.status(401).json({ success: false, message: "Échec de l'authentification Google." });
  }
};