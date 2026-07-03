const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcement.controller");
const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

// Sécurisation globale : il faut être connecté
router.use(protect);

// Tout le monde peut lire les annonces sur son Dashboard
router.get("/getAnnouncements", announcementController.getAllAnnouncements);

router.get("/getAnnouncementsById/:id", announcementController.getAnnouncementById);

// MODIFIÉ : ADMIN et EMPLOYEE peuvent créer une annonce.
// La vraie restriction (un EMPLOYEE ne peut publier que PUBLIC ou EMPLOYEE_ONLY)
// est appliquée dans le controller (createAnnouncement), pas ici.
router.post("/createAnnouncements", authorizeRoles("ADMIN", "EMPLOYEE"), announcementController.createAnnouncement);

// Non modifié : suppression et modification restent réservées à l'ADMIN
router.delete("/deleteAnnouncements/:id", authorizeRoles("ADMIN"), announcementController.deleteAnnouncement);
router.put("/updateAnnouncements/:id", authorizeRoles("ADMIN"), announcementController.updateAnnouncement);
module.exports = router;