const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leave.controller");
const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

// Sécurisation globale : Il faut obligatoirement être connecté
router.use(protect);

// Route accessible par l'employé connecté pour faire sa demande
router.post("/createRequest", leaveController.createLeaveRequest);
router.get("/getMyLeaves", leaveController.getMyLeaves);
router.get("/getById/:id",  leaveController.getLeaveById);

// Routes réservées UNIQUEMENT à l'Administrateur (Dashboard)
router.get("/getAll", authorizeRoles("ADMIN"), leaveController.getAllLeaves);
router.put("/updateStatus/:id", authorizeRoles("ADMIN"), leaveController.updateLeaveStatus);
router.delete("/deleteStatus/:id", authorizeRoles("ADMIN"), leaveController.deleteLeave)

module.exports = router;