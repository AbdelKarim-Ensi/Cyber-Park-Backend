const SalaryAdvance = require("../models/salaryAdvance.model");
const User = require("../models/user.model");

// 1. [EMPLOYÉ] Créer une demande d'avance sur salaire
exports.requestAdvance = async (req, res) => {
  try {
    const { amount, reason, repaymentMonth } = req.body;
    const employeeId = req.user._id; // Récupéré automatiquement grâce au middleware protect

    // Bonus Sécurité : On vérifie si le montant demandé ne dépasse pas son salaire actuel
    const employee = await User.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employé introuvable." });
    }

   // Vérifier si l'employé a bien un salaire enregistré
    if (!employee.salary) {
      return res.status(400).json({ 
        success: false, 
        message: "Demande refusée : Votre salaire n'est pas encore défini dans le système." 
      });
    }

    // Vérifier si le montant dépasse le salaire
    if (amount > employee.salary) {
      return res.status(400).json({ 
        success: false, 
        message: `Demande refusée. Le montant (${amount}€) dépasse votre salaire actuel (${employee.salary}€).` 
      });
    }

    const newAdvance = new SalaryAdvance({
      employeeId,
      amount,
      reason,
      repaymentMonth
    });

    await newAdvance.save();
    return res.status(201).json({ success: true, message: "Demande d'avance envoyée !", data: newAdvance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. [ADMIN] Traiter (Approuver/Refuser) une demande d'avance
exports.processAdvance = async (req, res) => {
  try {
    const { advanceId } = req.params;
    const { status } = req.body; // Doit être "APPROVED" ou "REJECTED" ou "PAID"

    if (!["APPROVED", "REJECTED", "PAID"].includes(status)) {
      return res.status(400).json({ success: false, message: "Statut invalide." });
    }

    const advance = await SalaryAdvance.findByIdAndUpdate(
      advanceId,
      {
        status,
        processedBy: req.user._id // L'admin connecté qui valide
      },
      { new: true, runValidators: true }
    ).populate("employeeId", "firstName lastName");

    if (!advance) {
      return res.status(404).json({ success: false, message: "Demande introuvable." });
    }

    return res.status(200).json({ 
      success: true, 
      message: `Demande mise à jour avec le statut : ${status}`, 
      data: advance 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 3. [TOUS] Récupérer l'historique (Les admins voient tout, l'employé ne voit que les siennes)
exports.getAdvances = async (req, res) => {
  try {
    let query = {};
    
    // Si ce n'est pas un admin, on filtre obligatoirement par son propre ID
    if (req.user.role !== "ADMIN") {
      query.employeeId = req.user._id;
    }

    const list = await SalaryAdvance.find(query)
      .populate("employeeId", "firstName lastName jobTitle")
      .populate("processedBy", "firstName lastName")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// 4. [ADMIN / EMPLOYÉ] Supprimer une demande d'avance
exports.deleteAdvance = async (req, res) => {
  try {
    const { advanceId } = req.params;
    const userId = req.user._id;
    const userRole = req.user.role;

    // 1. Chercher la demande dans la base de données
    const advance = await SalaryAdvance.findById(advanceId);

    if (!advance) {
      return res.status(404).json({ success: false, message: "Demande introuvable." });
    }

    // 2. Vérification des permissions (Sécurité)
    if (userRole !== "ADMIN") {
      // Si ce n'est pas son avance
      if (advance.employeeId.toString() !== userId.toString()) {
        return res.status(403).json({ 
          success: false, 
          message: "Non autorisé. Vous ne pouvez supprimer que vos propres demandes." 
        });
      }
      // Si l'avance est déjà validée/refusée/payée
      if (advance.status !== "PENDING") {
        return res.status(400).json({ 
          success: false, 
          message: "Impossible de supprimer une demande qui a déjà été traitée." 
        });
      }
    }

    // 3. Suppression
    await SalaryAdvance.findByIdAndDelete(advanceId);

    return res.status(200).json({ 
      success: true, 
      message: "Demande d'avance supprimée avec succès." 
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// =========================================================================
// 1. [ADMIN] Récupérer TOUTES les demandes d'avance sur salaire de l'entreprise
// =========================================================================
exports.getAllAdvances = async (req, res) => {
  try {
    // On récupère toutes les demandes en y joignant (populate) les infos de l'employé
    const advances = await SalaryAdvance.find()
      .populate("employeeId", "firstName lastName email department")
      .sort({ createdAt: -1 }); // Les plus récentes en premier

    return res.status(200).json({ success: true, data: advances });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// =========================================================================
// 2. [EMPLOYÉ] Récupérer UNIQUEMENT les demandes de l'employé connecté
// =========================================================================
exports.getMyAdvances = async (req, res) => {
  try {
    const employeeId = req.user._id; // Extrait automatiquement par votre middleware de protection

    const advances = await SalaryAdvance.find({ employeeId })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: advances });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// =========================================================================
// 3. [ADMIN / EMPLOYÉ] Récupérer UNE demande précise par son ID (avec sécurité)
// =========================================================================
exports.getAdvanceById = async (req, res) => {
  try {
    const { advanceId } = req.params;
    const userId = req.user._id;
    const userRole = req.user.role;

    const advance = await SalaryAdvance.findById(advanceId)
      .populate("employeeId", "firstName lastName email department");

    if (!advance) {
      return res.status(404).json({ success: false, message: "Demande d'avance introuvable." });
    }

    // SÉCURITÉ : Si l'utilisateur n'est pas ADMIN, il ne peut pas voir la demande d'un autre collègue
    if (userRole !== "ADMIN" && advance.employeeId._id.toString() !== userId.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: "Accès refusé. Vous ne pouvez visualiser que vos propres demandes." 
      });
    }

    return res.status(200).json({ success: true, data: advance });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};