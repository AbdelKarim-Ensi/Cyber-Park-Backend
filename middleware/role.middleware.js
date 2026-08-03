const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Accès interdit : Votre rôle (${req.user ? req.user.role : "Inconnu"}) n'est pas autorisé.`
      });
    }
    next();
  };
};

module.exports = authorizeRoles;