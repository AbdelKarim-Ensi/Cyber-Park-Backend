const Leave = require("../models/leave.model"); // Ton modèle Mongoose

// 1. [EMPLOYÉ] Soumettre une demande de congé
exports.createLeaveRequest = async (req, res) => {
  try {
    if (!req.user || !req.user._id) { // AJOUT : garde-fou
      return res.status(401).json({ success: false, message: "Non authentifié." });
    }

    const { type, startDate, endDate, reason } = req.body;

    const newLeave = new Leave({
      employeeId: req.user._id,
      type,
      startDate,
      endDate,
      reason
    });

    await newLeave.save();
    return res.status(201).json({ success: true, message: "Demande de congé soumise.", data: newLeave });
  } catch (error) {
    if (error.name === "ValidationError") { // AJOUT : erreur de validation = 400, pas 500
      // Log full error for debugging in test runs
      console.error(error);
      return res.status(400).json({ success: false, message: error.message });
    }
    console.error("Erreur createLeaveRequest:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
exports.deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;

    // Suppression dans MongoDB via Mongoose
    const deletedLeave = await Leave.findByIdAndDelete(id);

    if (!deletedLeave) {
      return res.status(404).json({ 
        success: false, 
        message: "Demande de congé introuvable." 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Demande de congé supprimée avec succès.",
      data: deletedLeave
    });

  } catch (error) {
    console.error("❌ Erreur lors de la suppression du congé:", error);
    res.status(500).json({ 
      success: false, 
      message: "Erreur serveur lors de la suppression.",
      error: error.message 
    });
  }
};

// 2. [ADMIN] Récupérer toutes les demandes (Dashboard)
exports.getMyLeaves = async (req, res) => {
  try {
    // req.user._id provient de votre middleware d'authentification (JWT)
    const myLeaves = await Leave.find({ employeeId: req.user._id }).sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      count: myLeaves.length,
      data: myLeaves
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// [ADMIN ou EMPLOYÉ] Récupérer une seule demande par son ID
exports.getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id).populate('employeeId', 'firstName lastName role');
    
    if (!leave) {
      return res.status(404).json({ success: false, message: "Demande de congé introuvable." });
    }

    // Optionnel : Sécurité pour s'assurer qu'un employé ne puisse pas lire le congé d'un autre
    if (req.user.role !== 'admin' && leave.employeeId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Accès non autorisé à cette demande." });
    }

    return res.status(200).json({ success: true, data: leave });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. [ADMIN] Récupérer toutes les demandes de congés de l'entreprise (avec les détails de l'employé)
exports.getAllLeaves = async (req, res) => {
  try {
    // .populate('employeeId', 'firstName lastName email role') permet d'afficher le nom de l'employé qui demande le congé
    const allLeaves = await Leave.find()
      .populate('employeeId', 'firstName lastName email role')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: allLeaves.length,
      data: allLeaves
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 3. [ADMIN] Valider ou Refuser un congé (avec motif si refus)
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body; // "APPROVED" ou "REJECTED"

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({ success: false, message: "Statut invalide. Utilisez APPROVED ou REJECTED." });
    }

    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ success: false, message: "Demande introuvable." });
    }

    // On applique les règles de ton modèle
    leave.status = status;
    leave.approvedBy = req.user._id; // L'Admin connecté devient le décideur

    if (status === "REJECTED") {
      if (!rejectionReason) {
        return res.status(400).json({ success: false, message: "Le motif du refus est obligatoire." });
      }
      leave.rejectionReason = rejectionReason;
    } else {
      // Si c'est approuvé, on s'assure d'effacer un ancien motif de refus au cas où
      leave.rejectionReason = undefined;
    }

    await leave.save();

    return res.status(200).json({
      success: true,
      message: `La demande a été traitée avec succès (${status}).`,
      data: leave
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};