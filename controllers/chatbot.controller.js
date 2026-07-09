const { GoogleGenerativeAI } = require("@google/generative-ai");
const Leave = require("../models/leave.model");
const Attendance = require("../models/attendance.model");
const User = require("../models/user.model");
const Announcement = require("../models/announcement.model");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ---------------------------------------------------------
// Définition des "tools" (fonctions) que Gemini peut appeler
// ---------------------------------------------------------
const tools = [
  {
    functionDeclarations: [
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
    ]
  }
];

// ---------------------------------------------------------
// Implémentation réelle de chaque fonction (accès MongoDB)
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

// Table de dispatch : nom de fonction Gemini -> implémentation réelle
const functionMap = {
  getMyLeaveHistory,
  getMyAttendanceToday,
  getMyProfile,
  getRecentAnnouncements
};

// AJOUT : fonction utilitaire de retry pour gérer les 503 Gemini (surcharge temporaire)
async function sendMessageWithRetry(chat, message, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await chat.sendMessage(message);
    } catch (err) {
        // AJOUT : gestion des erreurs 503 (surcharge) ET 429 (quota dépassé) pour le retry automatique
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
    const { message, history } = req.body;
    const userId = req.user._id;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: "Le message est requis." });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      tools,
      systemInstruction:
        "Tu es l'assistant RH virtuel de Cyber Park HR. Réponds de façon professionnelle, concise et bienveillante en français. " +
        "Utilise les fonctions disponibles pour consulter les vraies données de l'employé connecté avant de répondre. " +
        "Ne donne jamais d'informations sur d'autres employés que celui connecté. " +
        // AJOUT : consigne explicite pour éviter les réponses vides après un appel de fonction
        "Après avoir reçu le résultat d'une fonction, tu dois TOUJOURS rédiger une réponse en texte clair pour l'utilisateur, jamais une réponse vide."
    });

    const chat = model.startChat({
      history: history || []
    });

    // AJOUT : utilisation de sendMessageWithRetry au lieu de chat.sendMessage direct
    let result = await sendMessageWithRetry(chat, message);
    let response = result.response;

    // Boucle de function calling : Gemini peut appeler plusieurs fonctions à la suite
    let functionCalls = response.functionCalls();
    let safety = 0;
    let lastFunctionResults = null; // AJOUT : garde le dernier résultat de fonction en mémoire pour un fallback éventuel

    while (functionCalls && functionCalls.length > 0 && safety < 5) {
      const functionResponses = [];

      for (const call of functionCalls) {
        const fn = functionMap[call.name];
        let output;

        if (fn) {
          try {
            output = await fn(userId);
          } catch (err) {
            output = { error: "Erreur lors de la récupération des données." };
          }
        } else {
          output = { error: "Fonction inconnue." };
        }

        functionResponses.push({
          functionResponse: { name: call.name, response: output }
        });
      }

      lastFunctionResults = functionResponses; // AJOUT : mémorise le dernier résultat obtenu

      // AJOUT : utilisation de sendMessageWithRetry ici aussi
      result = await sendMessageWithRetry(chat, functionResponses);
      response = result.response;
      functionCalls = response.functionCalls();
      safety++;
    }

    // AJOUT : si Gemini a terminé (STOP) mais n'a produit aucun texte exploitable,
    // on relance explicitement une demande de synthèse en texte avant d'abandonner.
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

    // AJOUT : si malgré la relance la réponse est toujours vide, on construit un message de secours
    // à partir des dernières données de fonction récupérées, pour ne jamais renvoyer une réponse vide.
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
    // AJOUT : distinction erreur de surcharge Gemini vs erreur interne, pour une meilleure UX frontend
    const isOverloaded = error.message && error.message.includes("503");
    return res.status(isOverloaded ? 503 : 500).json({
      success: false,
      message: isOverloaded
        ? "L'assistant RH est momentanément indisponible (forte demande). Réessaie dans quelques instants."
        : error.message
    });
  }
};