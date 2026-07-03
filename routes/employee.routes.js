const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller");
const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

// Sécurisation globale : connexion requise pour toutes les routes
router.use(protect);

// AJOUT: route accessible à TOUS les utilisateurs connectés (pas seulement ADMIN)
router.route("/me").get(employeeController.getMyProfile);

// À partir d'ici, uniquement ADMIN
router.use(authorizeRoles("ADMIN"));

router.route("/getEmployee")
  .get(employeeController.getAllEmployees);

router.route("/updateEmployee/:id").put(employeeController.updateEmployee);
router.route("/deleteEmployee/:id") .delete(employeeController.deleteEmployee);
router.route("/ajoutEmployee").post(employeeController.addEmployee);
router.route("/getEmployeeById/:id").get(employeeController.getEmployeeById);
module.exports = router;