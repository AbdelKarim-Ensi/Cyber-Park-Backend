const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Accès refusé. Aucun token fourni." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return res.status(404).json({ success: false, message: "L'utilisateur lié à ce token n'existe plus." });
    }

    if (req.user.status === "INACTIVE") {
      return res.status(403).json({ success: false, message: "Compte désactivé. Contactez l'admin." });
    }

    next(); 
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token invalide ou expiré." });
  }
};

module.exports = protect;