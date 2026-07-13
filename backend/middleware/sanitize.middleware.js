// AJOUT : Middleware de remplacement pour xss-clean (abandonné et incompatible
// avec les versions récentes d'Express/router où req.query est en lecture seule).
// On utilise le package "xss" pour nettoyer récursivement body/params/query
// SANS jamais réassigner req.query directement (on modifie ses clés une par une).

const xss = require("xss");

// Nettoie récursivement un objet (string, array, object imbriqués)
const sanitizeValue = (value) => {
  if (typeof value === "string") {
    return xss(value);
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }
  if (value && typeof value === "object") {
    for (const key of Object.keys(value)) {
      value[key] = sanitizeValue(value[key]);
    }
    return value;
  }
  return value;
};

const xssSanitizer = (req, res, next) => {
  // req.body et req.params peuvent être réassignés sans problème
  if (req.body) {
    req.body = sanitizeValue(req.body);
  }
  if (req.params) {
    req.params = sanitizeValue(req.params);
  }

  // req.query est un getter en lecture seule sur les versions récentes :
  // on modifie donc ses propriétés EN PLACE, sans réassigner l'objet entier
  if (req.query && typeof req.query === "object") {
    for (const key of Object.keys(req.query)) {
      req.query[key] = sanitizeValue(req.query[key]);
    }
  }

  next();
};

module.exports = xssSanitizer;