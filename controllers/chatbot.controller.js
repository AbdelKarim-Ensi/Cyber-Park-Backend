const { GoogleGenerativeAI } = require("@google/generative-ai");
const Leave = require("../models/leave.model");
const Attendance = require("../models/attendance.model");
const User = require("../models/user.model");
const Announcement = require("../models/announcement.model");
// AJOUT : modèles supplémentaires pour les fonctions réservées ADMIN
const Department = require("../models/department.model");
const Project = require("../models/project.model");
const SalaryAdvance = require("../models/salaryAdvance.model");
const Subscriber = require("../models/subscriber.model");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ---------------------------------------------------------
// Outils communs à TOUS les utilisateurs connectés (EMPLOYEE + ADMIN)
// ---------------------------------------------------------
const commonTools = [
  {
    name: "getMyLeaveHistory",
    description:
      "Récupère l'historique et le solde des demandes de congés de l'employé connecté (congés annuels, maladie, etc.).",
    parameters: { type: "object", properties: {} }
  },
  {
    name: "getMyAttendanceToday",
    description:
      "Récupère le statut de présence du jour de l'employé connecté (heure d'arrivée, de départ, retard éventuel).",
    parameters: { type: "object", properties: {} }
  },
  {
    name: "getMyProfile",
    description:
      "Récupère les informations de profil de l'employé connecté (poste, département, date d'embauche).",
    parameters: { type: "object", properties: {} }
  },
  {
    name: "getRecentAnnouncements",
    description: "Récupère les annonces récentes de l'entreprise.",
    parameters: { type: "object", properties: {} }
  }
];

// AJOUT : outils supplémentaires accessibles UNIQUEMENT aux utilisateurs avec le rôle ADMIN
const adminTools = [
  {
    name: "getAllEmployees",
    description:
      "Récupère la liste complète des employés de l'entreprise avec leur poste, département et statut.",
    parameters: { type: "object", properties: {} }
  },
  {
    name: "getAllDepartments",
    description:
      "Récupère la liste des départements de l'entreprise avec leur responsable et le nombre de membres.",
    parameters: { type: "object", properties: {} }
  },
  {
    name: "getAllProjects",
    description:
      "Récupère la liste des projets en cours ou terminés dans l'entreprise.",
    parameters: { type: "object", properties: {} }
  },
  {
    name: "getPendingLeaveRequests",
    description:
      "Récupère toutes les demandes de congés en attente de validation, tous employés confondus.",
    parameters: { type: "object", properties: {} }
  },
  {
    name: "getTeamAttendanceToday",
    description:
      "Récupère le statut de présence du jour de TOUS les employés (qui est présent, en retard, absent).",
    parameters: { type: "object", properties: {} }
  },
  {
    name: "getPendingSalaryAdvances",
    description:
      "Récupère toutes les demandes d'avance sur salaire en attente de validation.",
    parameters: { type: "object", properties: {} }
  },
  {
    name: "getCompanyStats",
    description:
      "Récupère des statistiques globales de l'entreprise : nombre d'employés, de départements, de projets actifs, d'abonnés newsletter.",
    parameters: { type: "object", properties: {} }
  }
];

// ---------------------------------------------------------
// Implémentation des fonctions communes (accès MongoDB)
// ---------------------------------------------------------
async function getMyLeaveHistory(userId) {
  const leaves = await Leave.find({ employeeId: userId }).sort({ createdAt: -1 }).limit(10);
  return {
    leaves: leaves.map((l) => ({
      type: l.type,
      startDate: l.startDate,
      endDate: l.endDate,
      status: l.status,
      reason: l.reason
    }))
  };
}

async function getMyAttendanceToday(userId) {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const attendance = await Attendance.findOne({
    employeeId: userId,
    date: { $gte: startOfToday, $lte: endOfToday }
  });

  if (!attendance) return { message: "Aucun pointage enregistré aujourd'hui." };

  return {
    checkIn: attendance.checkIn,
    checkOut: attendance.checkOut,
    status: attendance.status
  };
}

async function getMyProfile(userId) {
  const user = await User.findById(userId).populate("departmentId", "name");
  if (!user) return { message: "Profil introuvable." };
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    jobTitle: user.jobTitle,
    department: user.departmentId ? user.departmentId.name : "Non assigné",
    joinDate: user.joinDate
  };
}

async function getRecentAnnouncements() {
  const announcements = await Announcement.find().sort({ createdAt: -1 }).limit(5);
  return {
    announcements: announcements.map((a) => ({
      title: a.title,
      content: a.content,
      date: a.createdAt
    }))
  };
}

// ---------------------------------------------------------
// AJOUT : implémentation des fonctions réservées ADMIN
// ---------------------------------------------------------
async function getAllEmployees() {
  const employees = await User.find().populate("departmentId", "name").limit(50);
  return {
    count: employees.length,
    employees: employees.map((e) => ({
      firstName: e.firstName,
      lastName: e.lastName,
      role: e.role,
      jobTitle: e.jobTitle,
      department: e.departmentId ? e.departmentId.name : "Non assigné",
      joinDate: e.joinDate
    }))
  };
}

async function getAllDepartments() {
  const departments = await Department.find().populate("membres", "firstName lastName");
  return {
    count: departments.length,
    departments: departments.map((d) => ({
      name: d.name,
      description: d.description,
      membersCount: d.membres ? d.membres.length : 0
    }))
  };
}

async function getAllProjects() {
  const projects = await Project.find().sort({ createdAt: -1 }).limit(20);
  return {
    count: projects.length,
    projects: projects.map((p) => ({
      name: p.name,
      status: p.status,
      description: p.description
    }))
  };
}

async function getPendingLeaveRequests() {
  const leaves = await Leave.find({ status: "PENDING" })
    .populate("employeeId", "firstName lastName")
    .sort({ createdAt: -1 })
    .limit(20);
  return {
    count: leaves.length,
    leaves: leaves.map((l) => ({
      employee: l.employeeId ? `${l.employeeId.firstName} ${l.employeeId.lastName}` : "Inconnu",
      type: l.type,
      startDate: l.startDate,
      endDate: l.endDate
    }))
  };
}

async function getTeamAttendanceToday() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const attendances = await Attendance.find({
    date: { $gte: startOfToday, $lte: endOfToday }
  }).populate("employeeId", "firstName lastName");

  return {
    count: attendances.length,
    attendances: attendances.map((a) => ({
      employee: a.employeeId ? `${a.employeeId.firstName} ${a.employeeId.lastName}` : "Inconnu",
      checkIn: a.checkIn,
      checkOut: a.checkOut,
      status: a.status
    }))
  };
}

async function getPendingSalaryAdvances() {
  const advances = await SalaryAdvance.find({ status: "PENDING" })
    .populate("employeeId", "firstName lastName")
    .sort({ createdAt: -1 })
    .limit(20);
  return {
    count: advances.length,
    advances: advances.map((a) => ({
      employee: a.employeeId ? `${a.employeeId.firstName} ${a.employeeId.lastName}` : "Inconnu",
      amount: a.amount,
      reason: a.reason
    }))
  };
}

async function getCompanyStats() {
  const [employeeCount, departmentCount, activeProjectCount, subscriberCount] = await Promise.all([
    User.countDocuments(),
    Department.countDocuments(),
    Project.countDocuments({ status: { $ne: "COMPLETED" } }),
    Subscriber.countDocuments({ status: "ACTIVE" })
  ]);

  return {
    employeeCount,
    departmentCount,
    activeProjectCount,
    subscriberCount
  };
}

// Table de dispatch commune : nom de fonction Gemini -> implémentation réelle
const commonFunctionMap = {
  getMyLeaveHistory,
  getMyAttendanceToday,
  getMyProfile,
  getRecentAnnouncements
};

// AJOUT : table de dispatch réservée ADMIN
const adminFunctionMap = {
  getAllEmployees,
  getAllDepartments,
  getAllProjects,
  getPendingLeaveRequests,
  getTeamAttendanceToday,
  getPendingSalaryAdvances,
  getCompanyStats
};

// AJOUT : fonction utilitaire de retry pour gérer les 503 Gemini (surcharge temporaire)
async function sendMessageWithRetry(chat, message, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await chat.sendMessage(message);
    } catch (err) {
        const isRetryable = err.message && (err.message.includes("503") || err.message.includes("429"));
      if (isRetryable  && attempt < maxRetries - 1) {
        const delay = 1000 * Math.pow(2, attempt); // 1s, 2s, 4s
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw err;
    }
  }
}

// ---------------------------------------------------------
// Controller principal
// ---------------------------------------------------------
exports.chat = async (req, res) => {
  try {
    console.time("chatbot-total");

    const { message, history } = req.body;
    const userId = req.user._id;
    const userRole = (req.user?.role || "").toUpperCase();
    const isAdmin = userRole === "ADMIN";

    // AJOUT : debug temporaire
    console.log("DEBUG chatbot - req.user.role brut:", req.user?.role);
    console.log("DEBUG chatbot - userRole normalisé:", userRole, "| isAdmin:", isAdmin)
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: "Le message est requis." });
    }

    // AJOUT : construction dynamique des tools et du dispatch selon le rôle
    const availableTools = isAdmin ? [...commonTools, ...adminTools] : commonTools;
    const functionMap = isAdmin
      ? { ...commonFunctionMap, ...adminFunctionMap }
      : commonFunctionMap;

    const tools = [{ functionDeclarations: availableTools }];

   const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      tools,
      systemInstruction:
        "Tu es l'assistant RH virtuel de Cyber Park HR. Réponds de façon professionnelle, concise et bienveillante en français. " +
        // MODIFIÉ : consigne renforcée et explicite contre l'invention de données
        "RÈGLE ABSOLUE : tu n'as AUCUNE connaissance des employés, départements, projets, congés ou présences de cette entreprise. " +
        "Tu DOIS TOUJOURS appeler la fonction appropriée avant de répondre à toute question portant sur des données de l'entreprise ou de l'utilisateur. " +
        "Il t'est STRICTEMENT INTERDIT d'inventer, halluciner ou supposer des noms, statuts, dates ou informations qui ne proviennent pas directement du résultat d'une fonction. " +
        "Si une fonction retourne une liste vide ou un message d'absence de données, dis-le clairement à l'utilisateur au lieu d'inventer un exemple. " +
        (isAdmin
          ? "L'utilisateur connecté est un ADMINISTRATEUR : tu peux lui donner des informations sur l'ensemble de l'entreprise (employés, départements, projets, congés, présences, avances), mais UNIQUEMENT via les fonctions disponibles. "
          : "Ne donne jamais d'informations sur d'autres employés que celui connecté. ") +
        "Après avoir reçu le résultat d'une fonction, tu dois TOUJOURS rédiger une réponse en texte clair pour l'utilisateur, jamais une réponse vide, et cette réponse doit se baser UNIQUEMENT sur les données reçues de la fonction."
    });

    const chat = model.startChat({
      history: history || []
    });

    let result = await sendMessageWithRetry(chat, message);
    let response = result.response;

    let functionCalls = response.functionCalls();
    let safety = 0;
    let lastFunctionResults = null;

    while (functionCalls && functionCalls.length > 0 && safety < 5) {
      const functionResponses = [];

      for (const call of functionCalls) {
        const fn = functionMap[call.name];
        let output;

        if (fn) {
          try {
            // AJOUT : les fonctions admin n'ont pas besoin de userId, mais on le passe quand même sans risque
            output = await fn(userId);
          } catch (err) {
            output = { error: "Erreur lors de la récupération des données." };
          }
        } else {
          output = { error: "Fonction inconnue ou non autorisée pour ce rôle." };
        }

        functionResponses.push({
          functionResponse: { name: call.name, response: output }
        });
      }

      lastFunctionResults = functionResponses;

      result = await sendMessageWithRetry(chat, functionResponses);
      response = result.response;
      functionCalls = response.functionCalls();
      safety++;
    }

    let replyText = response.text();

    if (!replyText || !replyText.trim()) {
      try {
        const followUp = await sendMessageWithRetry(
          chat,
          "Formule maintenant ta réponse en texte clair, en français, à partir des informations obtenues."
        );
        replyText = followUp.response.text();
      } catch (err) {
        console.error("Erreur lors de la relance pour réponse vide:", err.message);
      }
    }

    if (!replyText || !replyText.trim()) {
      replyText = lastFunctionResults
        ? "Voici les informations trouvées : " + JSON.stringify(lastFunctionResults.map((f) => f.functionResponse.response))
        : "Désolé, je n'ai pas pu formuler de réponse. Peux-tu reformuler ta question ?";
    }

    return res.status(200).json({
      success: true,
      reply: replyText
    });
  } catch (error) {
    console.error("Erreur chatbot:", error);
    const isOverloaded = error.message && error.message.includes("503");
    return res.status(isOverloaded ? 503 : 500).json({
      success: false,
      message: isOverloaded
        ? "L'assistant RH est momentanément indisponible (forte demande). Réessaie dans quelques instants."
        : error.message
    });
  } finally {
    // AJOUT : s'exécute toujours, même en cas d'erreur, pour afficher le temps total
    console.timeEnd("chatbot-total");
  
};}