const express = require("express");
const router = express.Router();
const subscriberController = require("../controllers/subscriber.controller");
const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

// Routes PUBLIQUES — pas d'auth (site vitrine)
router.post("/register", subscriberController.registerSubscriber);
router.get("/unsubscribe/:id", subscriberController.unsubscribe);

// Routes ADMIN — nécessitent une connexion EMS + rôle ADMIN
router.get("/allSubscribers", protect, authorizeRoles("ADMIN"), subscriberController.getAllSubscribers);
router.post("/broadcast", protect, authorizeRoles("ADMIN"), subscriberController.broadcastEvent);

module.exports = router;