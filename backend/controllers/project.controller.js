const Project = require("../models/project.model");

// 1. [ADMIN] Créer un nouveau projet
// ✅ CORRIGÉ
exports.createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      startDate,
      endDate,
      assignedEmployees,
      status          // ← ajouter ce champ
    } = req.body;

    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      assignedEmployees,
      status: status || 'PENDING',  // ✅ utilise la valeur reçue, PLANNED en fallback
    });

    await newProject.save();
    return res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. [TOUS] Récupérer tous les projets
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("assignedEmployees", "firstName lastName jobTitle")
      .sort({ createdAt: -1 }); // Du plus récent au plus ancien

    return res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 3. [ADMIN] Mettre à jour un projet (Statut, Dates, ou Équipe)
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    // 🛠️ FIX 1 : On extrait les données pour pouvoir nettoyer "assignedEmployees"
    const { name, description, status, startDate, endDate, assignedEmployees } = req.body;

    // Si assignedEmployees contient des objets, on extrait uniquement leur ID (id ou _id)
    // Sinon, on garde la valeur brute (si c'était déjà des chaînes de caractères)
    const employeeIds = Array.isArray(assignedEmployees)
      ? assignedEmployees.map(emp => emp.id || emp._id || emp)
      : [];

    // 🛠️ FIX 2 : On reconstruit l'objet propre pour Mongoose
    const updateData = {
      name,
      description,
      status,
      startDate,
      endDate: endDate || null, // Évite les chaînes vides pour les dates optionnelles
      assignedEmployees: employeeIds
    };

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      updateData, // On passe l'objet nettoyé et sécurisé
      { returnDocument: 'after', runValidators: true }
    ).populate("assignedEmployees", "fullName firstName lastName role"); 
    // 🛠️ FIX 3 : Ajout de fullName et role pour correspondre à votre Angular !

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "Projet introuvable." });
    }

    return res.status(200).json({ 
      success: true, 
      message: "Projet mis à jour.", 
      data: updatedProject 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 4. [ADMIN] Supprimer un projet
exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    
    if (!deletedProject) {
      return res.status(404).json({ success: false, message: "Projet introuvable." });
    }

    return res.status(200).json({ success: true, message: "Projet supprimé." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    // Le .populate("assignedEmployees") transforme les IDs en objets Utilisateurs complets
    const foundProject = await Project.findById(id).populate("assignedEmployees");

    if (!foundProject) {
      return res.status(404).json({ message: "Projet introuvable." });
    }

    return res.status(200).json(foundProject);
  } catch (error) {
    console.error("Erreur getProjectById:", error);
    return res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};