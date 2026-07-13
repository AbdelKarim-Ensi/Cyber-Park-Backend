const Subscriber = require("../models/subscriber.model");
const sendEmail = require("../utils/mailer");

// @desc    Inscription publique depuis le site vitrine (visiteur)
// @route   POST /api/subscribers/register  (route PUBLIQUE, pas de protect)
exports.registerSubscriber = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ success: false, message: "Prénom, nom et email sont requis." });
    }

    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      if (existing.status === "UNSUBSCRIBED") {
        existing.status = "ACTIVE";
        await existing.save();
        return res.status(200).json({ success: true, message: "Ré-inscription réussie." });
      }
      return res.status(400).json({ success: false, message: "Cet email est déjà inscrit." });
    }

    const subscriber = await Subscriber.create({
      firstName,
      lastName,
      email: email.toLowerCase()
    });

    const html = `
      <h2>Bienvenue dans la famille Cyber Park !</h2>
      <p>Bonjour ${firstName},</p>
      <p>Félicitations, vous faites désormais partie de notre communauté ! Vous recevrez nos actualités et grands événements en avant-première.</p>
      <p style="font-size:12px;color:#888;margin-top:24px;">
        Vous ne souhaitez plus recevoir ces emails ?
        <a href="${process.env.FRONTEND_URL || "http://localhost:4200"}/unsubscribe/${subscriber._id}">Se désabonner</a>
      </p>
    `;

    sendEmail({
      to: subscriber.email,
      subject: "Bienvenue chez Cyber Park",
      html
    }).catch((err) => console.error("Erreur email bienvenue subscriber:", err.message));

    return res.status(201).json({ success: true, message: "Inscription réussie ! Vérifiez votre boîte mail." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Désabonnement (lien public dans l'email, pas d'auth requise)
// @route   GET /api/subscribers/unsubscribe/:id
exports.unsubscribe = async (req, res) => {
  try {
    await Subscriber.findByIdAndUpdate(req.params.id, { status: "UNSUBSCRIBED" });
    return res.status(200).json({ success: true, message: "Vous avez été désabonné." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    [ADMIN] Envoyer un événement/actualité publique à tous les abonnés actifs
// @route   POST /api/subscribers/broadcast
exports.broadcastEvent = async (req, res) => {
  try {
    const { title, message } = req.body;

    if (!title || !message) {
      return res.status(400).json({ success: false, message: "Titre et message requis." });
    }

    const subscribers = await Subscriber.find({ status: "ACTIVE" });

    if (subscribers.length === 0) {
      return res.status(200).json({ success: true, message: "Aucun abonné actif à notifier." });
    }

    let sent = 0;
    for (const sub of subscribers) {
      const html = `
        <h2>${title}</h2>
        <p>Bonjour ${sub.firstName},</p>
        <p>${message}</p>
        <p style="font-size:12px;color:#888;margin-top:24px;">
          <a href="${process.env.FRONTEND_URL || "http://localhost:4200"}/unsubscribe/${sub._id}">Se désabonner</a>
        </p>
      `;
      try {
        await sendEmail({ to: sub.email, subject: title, html });
        sent++;
      } catch (err) {
        console.error(`Erreur envoi à ${sub.email}:`, err.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: `Événement envoyé à ${sent}/${subscribers.length} abonné(s).`
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    [ADMIN] Liste des abonnés
// @route   GET /api/subscribers
exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: subscribers.length, data: subscribers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};