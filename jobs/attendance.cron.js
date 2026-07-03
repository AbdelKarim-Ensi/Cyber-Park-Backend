// 🎯 AJOUT : tâche planifiée qui remet à zéro la liste des présences chaque nuit.
// Ce fichier est entièrement nouveau : il ne modifie aucun fichier existant
// (attendance.model.js, attendance.controller.js, attendance.routes.js restent intacts).

const cron = require("node-cron");
const Attendance = require("../models/attendance.model");

/**
 * Supprime en base tous les enregistrements de présence dont la date
 * est antérieure au jour courant. Exemple : si on est le 3/7, tout
 * enregistrement daté du 2/7 (ou avant) est effacé automatiquement.
 */
async function resetOldAttendance() {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const result = await Attendance.deleteMany({
      date: { $lt: startOfToday }
    });

    console.log(
      `🧹 [CRON Présences] ${result.deletedCount} enregistrement(s) de présence antérieurs au ${startOfToday.toLocaleDateString()} supprimés.`
    );
  } catch (error) {
    console.error("❌ [CRON Présences] Erreur lors du nettoyage automatique :", error.message);
  }
}

/**
 * Démarre la tâche planifiée : s'exécute tous les jours à 00:00 (minuit),
 * heure du serveur.
 */
function startAttendanceResetJob() {
  // "0 0 * * *" = à la minute 0, à l'heure 0, tous les jours
  cron.schedule("0 0 * * *", () => {
    console.log("⏰ [CRON Présences] Déclenchement du nettoyage de minuit...");
    resetOldAttendance();
  });

  console.log("✅ [CRON Présences] Tâche planifiée initialisée (reset quotidien à minuit).");
}

module.exports = { startAttendanceResetJob, resetOldAttendance };