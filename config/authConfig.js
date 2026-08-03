// config/authConfig.js
// Domaine(s) email autorisé(s) pour se connecter à l'EMS Cyber Park
// ⚠️ Remplace "cyberpark.com" par ton vrai domaine d'entreprise
const ALLOWED_EMPLOYEE_DOMAINS = ["gmail.com"];

const isDomainAllowed = (email) => {
  if (!email || typeof email !== "string") return false;
  const domain = email.split("@")[1]?.toLowerCase();
  return ALLOWED_EMPLOYEE_DOMAINS.includes(domain);
};

module.exports = { ALLOWED_EMPLOYEE_DOMAINS, isDomainAllowed };