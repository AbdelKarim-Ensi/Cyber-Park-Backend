const express = require("express");
const router = express.Router();
const advanceController = require("../controllers/salaryAdvance.controller");
const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

// Tout le monde doit être connecté
router.use(protect);

// Un employé fait sa demande / voit son historique
router.post("/request", advanceController.requestAdvance);
router.get("/getAdvances", advanceController.getAdvances);
router.get("/getAdvancesById/:advanceId", advanceController.getAdvanceById);


// Seul l'admin peut valider ou refuser les demandes
router.put("/process/:advanceId", authorizeRoles("ADMIN"), advanceController.processAdvance);
router.get("/getAllAdvances", authorizeRoles("ADMIN"), advanceController.getAllAdvances);

// Seul l'admin (et l'employé selon la logique qu'on a mise dans le controller) peut supprimer
router.delete('/deleteAdvance/:advanceId', authorizeRoles("ADMIN"), advanceController.deleteAdvance);

module.exports = router;