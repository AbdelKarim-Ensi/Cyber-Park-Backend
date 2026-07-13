const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance.controller");
const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");


router.use(protect);

// Routes réservées aux employés (et admins)
router.post("/checkIn", attendanceController.checkIn);
router.put("/checkOut", attendanceController.checkOut);
router.get("/my", attendanceController.getMyAttendanceToday);

// Routes strictement réservées aux Administrateurs
router.post('/admin/create', authorizeRoles("ADMIN"), attendanceController.createAttendanceAdmin);
router.get("/getAttendanceById/:id", authorizeRoles("ADMIN"), attendanceController.getAttendanceById);
router.get("/getAll", authorizeRoles("ADMIN"), attendanceController.getAllAttendances);
router.put('/updatedAttendance/:id', attendanceController.updateAttendance);

module.exports = router;