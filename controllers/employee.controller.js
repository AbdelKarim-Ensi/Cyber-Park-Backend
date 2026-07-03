const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

// 1️⃣ [ADMIN] Récupérer tous les employés
exports.getAllEmployees = async (req, res) => {
  try {
    // populate() charge le nom du département attaché
    const employees = await User.find({ role: { $ne: "ADMIN" } })
      .populate("departmentId", "name"); 
    
    return res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2️⃣ [ADMIN] Mettre à jour un employé
exports.updateEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, status, role, departmentId, jobTitle, salary } = req.body;

    const employee = await User.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employé introuvable." });
    }

    // Mises à jour de base
    if (firstName) employee.firstName = firstName;
    if (lastName) employee.lastName = lastName;
    if (email) employee.email = email;
    if (status) employee.status = status;
    if (role) employee.role = role;

    // Mises à jour professionnelles
    if (departmentId !== undefined) employee.departmentId = departmentId || null;
    if (jobTitle) employee.jobTitle = jobTitle;
    if (salary !== undefined) employee.salary = salary;

    await employee.save();

    // Re-charger le département pour renvoyer une réponse propre au front-end
    const updatedEmployee = await User.findById(employee._id).populate("departmentId", "name");

    return res.status(200).json({
      success: true,
      message: "Compte employé mis à jour avec succès.",
      data: updatedEmployee
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 3️⃣ [ADMIN] Supprimer un employé
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await User.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employé introuvable." });
    }

    return res.status(200).json({
      success: true,
      message: "L'employé a été supprimé de la base de données."
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 4️⃣ [ADMIN] Ajouter un employé
// 4️⃣ [ADMIN] Ajouter un employé
exports.addEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, role, department, hireDate, status } = req.body;

    const hashedPassword = await bcrypt.hash('CyberPark123!', 10);

    const safeDepartmentId = mongoose.Types.ObjectId.isValid(department) ? department : null;

    // ✅ FIX Bug 1 : accepter 'ACTIVE', 'actif', et tout autre cas → INACTIVE
    const normalizedStatus = (status === 'ACTIVE' || status === 'actif') ? 'ACTIVE' : 'INACTIVE';

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'EMPLOYEE',
      position: role,
      departmentId: safeDepartmentId,
      joinDate: hireDate,
      status: normalizedStatus,
      salary: 0,
      avatar: 'default-avatar.png'
    });

    await newUser.save();
    return res.status(201).json({ message: 'Employé ajouté avec succès', user: newUser });

  } catch (error) {
    console.error("Erreur Backend complète :", error);
    return res.status(500).json({ message: 'Erreur lors de la création', error: error.message });
  }
};

// 5️⃣ [ADMIN] Récupérer un seul employé par son ID
exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Sécurité : Vérifier si l'ID passé est un ObjectId MongoDB valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "L'identifiant fourni n'est pas valide."
      });
    }

    // 2️⃣ CORRECTION : Utilisation du modèle 'User' unifié + .populate() pour récupérer le département
    const employee = await User.findById(id).populate("departmentId", "name");

    // 3️⃣ Si l'employé n'existe pas
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Aucun employé trouvé avec cet identifiant."
      });
    }

    // 4️⃣ Envoi de la réponse structurée avec la propriété 'data' lue par ton Angular
    return res.status(200).json({
      success: true,
      data: employee
    });

  } catch (error) {
    console.error("❌ Erreur lors de la récupération de l'employé :", error);
    return res.status(500).json({
      success: false,
      message: "Une erreur interne du serveur est survenue.",
      error: error.message
    });
  }
};
// 6️⃣ AJOUT: [TOUS UTILISATEURS CONNECTÉS] Récupérer le profil de l'utilisateur connecté
// Sécurisé : utilise req.user._id (fourni par le middleware protect), jamais un id arbitraire du client
exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const employee = await User.findById(userId).populate("departmentId", "name");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Aucun employé trouvé avec cet identifiant."
      });
    }

    return res.status(200).json({
      success: true,
      data: employee
    });

  } catch (error) {
    console.error("❌ Erreur lors de la récupération du profil :", error);
    return res.status(500).json({
      success: false,
      message: "Une erreur interne du serveur est survenue.",
      error: error.message
    });
  }
};