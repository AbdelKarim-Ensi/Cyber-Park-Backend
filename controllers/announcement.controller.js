const Announcement = require("../models/announcement.model");

// 1. [ADMIN] Créer une annonce
// 1. Remplacer la méthode createAnnouncement par ce bloc de validation :
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, content, target, image } = req.body;
    
    // Normalisation du rôle utilisateur issu du middleware de sécurité
    const userRole = (req.user?.role || '').toUpperCase();
    const validTargets = ["PUBLIC", "INTERNAL_ALL", "ADMIN_ONLY", "EMPLOYEE_ONLY"];
    
    // Validation 400 : Cible inconnue
    if (target && !validTargets.includes(target)) {
      return res.status(400).json({ success: false, message: "La cible de diffusion spécifiée est invalide." });
    }
    
    // Validation 403 : Restriction de sécurité pour le rôle EMPLOYEE
    if (userRole === 'EMPLOYEE' && (target === 'ADMIN_ONLY' || target === 'INTERNAL_ALL')) {
      return res.status(403).json({ success: false, message: "Action non autorisée : un employé ne peut publier qu'en PUBLIC ou EMPLOYEE_ONLY." });
    }

    const announcement = new Announcement({
      title,
      content,
      target: target || "INTERNAL_ALL",
      image: image || null,
      authorId: req.user._id
    });
    
    await announcement.save();
    return res.status(201).json({ success: true, message: "Annonce publiée !", data: announcement });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Remplacer la méthode getAllAnnouncements par ce bloc de filtrage par rôle :
exports.getAllAnnouncements = async (req, res) => {
  try {
    const userRole = (req.user?.role || '').toUpperCase();
    
    // Définition des règles de visibilité souhaitées
    let query = {};
    if (userRole === 'ADMIN') {
      // Un ADMIN peut visionner toutes les catégories d'annonces
      query = { target: { $in: ["PUBLIC", "INTERNAL_ALL", "ADMIN_ONLY", "EMPLOYEE_ONLY"] } };
    } else if (userRole === 'EMPLOYEE') {
      // Un EMPLOYEE voit uniquement PUBLIC, INTERNAL_ALL et EMPLOYEE_ONLY
      query = { target: { $in: ["PUBLIC", "INTERNAL_ALL", "EMPLOYEE_ONLY"] } };
    } else {
      // Par sécurité, si aucun rôle ou token non conforme : uniquement public
      query = { target: "PUBLIC" };
    }

    // Récupère les annonces filtrées, triées par date décroissante
    const list = await Announcement.find(query)
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("authorId", "firstName lastName");

    return res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. [TOUS] Récupérer les annonces récentes (pour le Dashboard)
exports.getAllAnnouncements = async (req, res) => {
  try {
    // Récupère les 5 dernières annonces et lie les infos de l'auteur via 'authorId'
    const list = await Announcement.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("authorId", "firstName lastName");

    return res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 3. [TOUS] Récupérer une annonce spécifique par son ID
exports.getAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const announcement = await Announcement.findById(id).populate("authorId", "firstName lastName");

    if (!announcement) {
      return res.status(404).json({ success: false, message: "Annonce introuvable." });
    }

    return res.status(200).json({ success: true, data: announcement });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 4. [ADMIN] Modifier / Mettre à jour une annonce
exports.updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, target, image } = req.body;

    // Met à jour l'annonce et renvoie la nouvelle version mise à jour ({ new: true })
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      id,
      { title, content, target, image },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({ success: false, message: "Annonce introuvable." });
    }

    return res.status(200).json({ 
      success: true, 
      message: "Annonce mise à jour avec succès !", 
      data: updatedAnnouncement 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 5. [ADMIN] Supprimer une annonce
exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);

    if (!deletedAnnouncement) {
      return res.status(404).json({ success: false, message: "Annonce introuvable." });
    }

    return res.status(200).json({ success: true, message: "Annonce supprimée avec succès !" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};