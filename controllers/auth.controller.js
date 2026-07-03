const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// Fonction utilitaire pour générer le JWT de manière sécurisée
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

    // 1. Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "Cet email est déjà utilisé." });
    }

    // 2. Créer l'utilisateur
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role
    });

    // 3. Générer le Token
    const token = generateToken(user._id);

    // 4. Réponse de succès (Statut 201)
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
    // On capture l'erreur et on l'envoie proprement sans passer par "next"
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Connexion de l'utilisateur
// @route   POST /auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Contrôle des entrées
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Veuillez fournir un email et un mot de passe." });
    }

    // 2. Chercher l'utilisateur avec son mot de passe
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Identifiants incorrects." });
    }

    // 3. Comparer le hash
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Identifiants incorrects." });
    }

    // 4. Générer le Token
    const token = generateToken(user._id);

    // 5. Réponse de succès (Statut 200)
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