const express = require("express");
const router = express.Router();
const chatbotController = require("../controllers/chatbot.controller");
const protect = require("../middleware/auth.middleware");

// Toute la route nécessite une connexion (accès aux données de l'employé)
router.post("/chat", protect, chatbotController.chat);

module.exports = router;