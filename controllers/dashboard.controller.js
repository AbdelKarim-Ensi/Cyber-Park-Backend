const User = require("../models/user.model"); // Ajuste selon le nom de ton modèle d'utilisateur
const Leave = require("../models/leave.model"); // Ajuste selon le nom de ton modèle de congé
const Attendance = require("../models/attendance.model");

exports.getDashboardStats = async (req, res) => {
  try {
    // 1. Date d'aujourd'hui à minuit pour les présences
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);

    // 2. Lancement des requêtes en parallèle (plus rapide)
    const [
      totalEmployees,
      pendingLeaves,
      todayAttendance
    ] = await Promise.all([
      User.countDocuments({ role: "EMPLOYEE" }),
      Leave.countDocuments({ status: "PENDING" }),
      Attendance.find({ date: todayMidnight })
    ]);

    // 3. Calculer les détails des présences d'aujourd'hui
    const presentCount = todayAttendance.length;
    const lateCount = todayAttendance.filter(record => record.status === "LATE").length || 0;
    // Correction rapide pour filtrer proprement selon le statut :
    const lates = todayAttendance.filter(record => record.status === "LATE").length;
    const halfDays = todayAttendance.filter(record => record.status === "HALF_DAY").length;

    // 4. Envoyer la réponse formatée pour les composants du Dashboard
    return res.status(200).json({
      success: true,
      data: {
        cards: {
          totalEmployees,
          pendingLeaves,
          presentToday: presentCount,
          lateToday: lates,
          halfDaysToday: halfDays
        },
        todayAttendanceList: todayAttendance // Optionnel : pour afficher directement la liste sous les cartes
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
exports.getEmployeeDashboardStats = async (req, res) => {
  try {
    const employeeId = req.user._id;

    // 1. On récupère l'historique en parallèle pour cet employé précis
    const [leaves, attendanceHistory] = await Promise.all([
      Leave.find({ employeeId }).sort({ createdAt: -1 }), // Tous ses congés (du plus récent au plus ancien)
      Attendance.find({ employeeId }).sort({ date: -1 }).limit(7) // Ses 7 derniers pointages
    ]);

    // 2. Calculer de petits compteurs utiles pour ses cartes du Frontend
    const pendingCount = leaves.filter(l => l.status === "PENDING").length;
    const approvedCount = leaves.filter(l => l.status === "APPROVED").length;
    
    // Exemple de calcul de jours de congés pris (si ton modèle Leave a une logique de calcul de jours)
    // Ici on compte simplement le nombre de demandes acceptées pour l'exemple
    const totalLeavesTaken = approvedCount;

    return res.status(200).json({
      success: true,
      data: {
        cards: {
          pendingLeaves: pendingCount,
          approvedLeaves: approvedCount,
          totalLeavesTaken: totalLeavesTaken
        },
        recentAttendance: attendanceHistory, // Pour afficher son mini-historique de pointage
        allLeaves: leaves // Pour afficher son tableau de demandes de congés
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};