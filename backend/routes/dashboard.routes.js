const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");
const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

// 🔑 OBLIGATOIRE : On protège TOUTES les routes du dashboard.
// L'utilisateur doit être connecté, qu'il soit Admin ou Employé.
router.use(protect);

// 👑 Route pour le Dashboard de l'Admin (Vérifie la connexion PUIS le rôle ADMIN)
router.get("/admin/stats", authorizeRoles("ADMIN"), dashboardController.getDashboardStats);

// 👤 Route pour le Dashboard de l'Employé (Accessible par n'importe qui connecté)
router.get("/employee/stats", dashboardController.getEmployeeDashboardStats);

module.exports = router;