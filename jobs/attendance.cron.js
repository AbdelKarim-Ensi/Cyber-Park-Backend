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

// 🎯 AJOUT : suppression définitive basée sur un délai glissant de 24h
// (contrairement à resetOldAttendance qui se base sur minuit, ici on calcule
// exactement 24h à partir du moment présent, peu importe l'heure de création).
async function resetAttendanceOlderThan24h() {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const result = await Attendance.deleteMany({
      date: { $lt: twentyFourHoursAgo }
    });

    console.log(
      `🧹 [CRON Présences 24h] ${result.deletedCount} enregistrement(s) de présence de plus de 24h supprimés définitivement.`
    );
  } catch (error) {
    console.error("❌ [CRON Présences 24h] Erreur lors du nettoyage automatique :", error.message);
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

  // 🎯 AJOUT : tâche planifiée qui tourne toutes les heures pour vérifier
  // et supprimer définitivement les présences ayant dépassé 24h d'existence.
  cron.schedule("0 * * * *", () => {
    console.log("⏰ [CRON Présences 24h] Vérification des enregistrements de plus de 24h...");
    resetAttendanceOlderThan24h();
  });

  console.log("✅ [CRON Présences] Tâche planifiée initialisée (reset quotidien à minuit).");
  console.log("✅ [CRON Présences 24h] Tâche planifiée initialisée (vérification horaire, suppression définitive après 24h).");
}

module.exports = { startAttendanceResetJob, resetOldAttendance, resetAttendanceOlderThan24h };