const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const  protect  = require("../middleware/auth.middleware");
const  authorizeRoles  = require("../middleware/role.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get('/admin-only-test', protect, authorizeRoles('ADMIN'), (req, res) => {
  res.status(200).json({ success: true, message: `Bienvenue Admin ${req.user.firstName}` });
});

module.exports = router;