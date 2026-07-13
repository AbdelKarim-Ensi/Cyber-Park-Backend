const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");
const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

// Sécurisation globale : Token requis
router.use(protect);

// Tout le monde peut voir les projets
router.get("/getAll", projectController.getAllProjects);
router.get("/getProjectById/:id", projectController.getProjectById)

// Seul l'Admin peut gérer (Créer, Modifier, Supprimer) les projets
router.post("/create", authorizeRoles("ADMIN"), projectController.createProject);
router.put("/update/:id", authorizeRoles("ADMIN"), projectController.updateProject);
router.delete("/delete/:id", authorizeRoles("ADMIN"), projectController.deleteProject);

module.exports = router;