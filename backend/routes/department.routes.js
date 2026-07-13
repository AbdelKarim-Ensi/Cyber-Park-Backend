const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/department.controller");
const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

// Sécurisation globale : Connexion requise
router.use(protect);

// Tout le monde peut voir la liste des départements
router.get("/getDepartments", departmentController.getDepartments);

// Seul l'ADMIN peut créer un département
router.post("/createDepartments", authorizeRoles("ADMIN"), departmentController.createDepartment);
router.get("/getDepartmentById/:id", departmentController.getDepartmentById);
// Seul l'ADMIN peut mettre à jour un département
router.put("/updateDepartment/:id", authorizeRoles("ADMIN"), departmentController.updateDepartment);
// Seul l'ADMIN peut supprimer un département
router.delete("/deleteDepartment/:id", authorizeRoles("ADMIN"), departmentController.deleteDepartment);
module.exports = router;