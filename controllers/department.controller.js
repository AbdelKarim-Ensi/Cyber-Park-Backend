const Employee = require('../models/user.model');     // Requis pour la vérification de sécurité
const Department = require("../models/department.model");

// 1. [ADMIN] Créer un nouveau département
exports.createDepartment = async (req, res) => {
  try {
    // AJOUT : on récupère aussi "membres" à la création
    const { name, description, managerId, membres } = req.body;

    const newDepartment = new Department({
      name,
      description,
      managerId: managerId || null,
      membres: Array.isArray(membres) ? membres : []
    });

    await newDepartment.save();

    // AJOUT : synchronisation du departmentId des employés concernés
    // (les membres ET le responsable reçoivent bien l'ID du département)
    const idsToSync = new Set();
    if (Array.isArray(membres)) {
      membres.forEach((m) => idsToSync.add(String(m)));
    }
    if (managerId) {
      idsToSync.add(String(managerId));
    }

    if (idsToSync.size > 0) {
      await Employee.updateMany(
        { _id: { $in: Array.from(idsToSync) } },
        { $set: { departmentId: newDepartment._id } }
      );
    }

    return res.status(201).json({ success: true, message: "Département créé avec succès !", data: newDepartment });
  } catch (error) {
    // Gestion du nom dupliqué (unique: true)
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Ce département existe déjà." });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. [TOUS] Récupérer la liste de tous les départements
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .populate("managerId", "firstName lastName email")
      // AJOUT : on peuple aussi les membres pour que le front les reçoive avec leur nom
      .populate("membres", "firstName lastName email");

    return res.status(200).json({ success: true, count: departments.length, data: departments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 🔍 1. Récupérer un département par son ID (Utile pour patcher le formulaire de modification)
exports.getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findById(id)
      .populate('managerId', 'firstName lastName')
      // AJOUT : indispensable pour que le formulaire de modification puisse
      // pré-cocher les bons membres
      .populate('membres', 'firstName lastName email');

    if (!department) {
      return res.status(404).json({ success: false, message: "Département introuvable." });
    }

    return res.status(200).json({ success: true, data: department });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 📝 2. Mettre à jour un département
exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    // AJOUT : on récupère "membres" envoyé par le formulaire Angular
    const { name, description, managerId, membres } = req.body;

    // AJOUT : on récupère l'état AVANT modification pour savoir qui retirer
    const existingDepartment = await Department.findById(id);
    if (!existingDepartment) {
      return res.status(404).json({ success: false, message: "Département introuvable." });
    }
    const oldMembreIds = (existingDepartment.membres || []).map((m) => String(m));
    const oldManagerId = existingDepartment.managerId ? String(existingDepartment.managerId) : null;

    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      {
        name,
        description,
        managerId: managerId || null,
        // AJOUT : on sauvegarde bien le tableau de membres reçu.
        // Si le champ n'est pas envoyé du tout (undefined), on ne touche pas
        // à la valeur existante ; s'il est envoyé (même vide []), on l'applique.
        ...(membres !== undefined ? { membres: Array.isArray(membres) ? membres : [] } : {})
      },
      { new: true, runValidators: true }
    ).populate('managerId', 'firstName lastName')
     .populate('membres', 'firstName lastName email');

    if (!updatedDepartment) {
      return res.status(404).json({ success: false, message: "Département introuvable." });
    }

    // AJOUT : synchronisation du departmentId des employés (membres + responsable)
    // -> Les nouveaux membres/responsable reçoivent l'ID du département
    // -> Ceux qui ont été retirés (et qui n'ont pas d'autre raison de le garder) repassent à null
    const newMembreIds = (Array.isArray(membres) ? membres : oldMembreIds).map((m) => String(m));
    const newManagerId = managerId ? String(managerId) : null;

    const newIdsSet = new Set(newMembreIds);
    if (newManagerId) newIdsSet.add(newManagerId);

    const oldIdsSet = new Set(oldMembreIds);
    if (oldManagerId) oldIdsSet.add(oldManagerId);

    // Employés à AJOUTER (nouveaux membres/responsable) -> departmentId = ce département
    const idsToAdd = Array.from(newIdsSet);
    if (idsToAdd.length > 0) {
      await Employee.updateMany(
        { _id: { $in: idsToAdd } },
        { $set: { departmentId: updatedDepartment._id } }
      );
    }

    // Employés à RETIRER (présents avant, absents maintenant) -> departmentId = null
    const idsToRemove = Array.from(oldIdsSet).filter((oldId) => !newIdsSet.has(oldId));
    if (idsToRemove.length > 0) {
      await Employee.updateMany(
        { _id: { $in: idsToRemove }, departmentId: updatedDepartment._id },
        { $set: { departmentId: null } }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Département mis à jour avec succès !",
      data: updatedDepartment
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ❌ 3. Supprimer un département
exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    // 🛡️ SÉCURITÉ : On vérifie si des employés appartiennent encore à ce département
    const employeeCount = await Employee.countDocuments({ departmentId: id });
    if (employeeCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Impossible de supprimer ce département car il est assigné à ${employeeCount} employé(s).`
      });
    }

    const deletedDepartment = await Department.findByIdAndDelete(id);
    if (!deletedDepartment) {
      return res.status(404).json({ success: false, message: "Département introuvable." });
    }

    return res.status(200).json({ success: true, message: "Département supprimé avec succès !" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};