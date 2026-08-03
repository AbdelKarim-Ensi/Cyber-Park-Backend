const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const mongoose = require('mongoose');
const sendEmail = require("../utils/mailer");
const { isDomainAllowed, ALLOWED_EMPLOYEE_DOMAINS } = require("../config/authConfig");

// 1️⃣ [ADMIN] Récupérer tous les employés
exports.getAllEmployees = async (req, res) => {
  try {
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

    // AJOUT : si l'email change, revérifier le domaine autorisé
    if (email && email !== employee.email && !isDomainAllowed(email)) {
      return res.status(400).json({
        success: false,
        message: `L'email doit appartenir au domaine ${ALLOWED_EMPLOYEE_DOMAINS.join(", ")}.`
      });
    }

    if (firstName) employee.firstName = firstName;
    if (lastName) employee.lastName = lastName;
    if (email) employee.email = email;
    if (status) employee.status = status;
    if (role) employee.role = role;

    if (departmentId !== undefined) employee.departmentId = departmentId || null;
    if (jobTitle) employee.jobTitle = jobTitle;
    if (salary !== undefined) employee.salary = salary;

    await employee.save();

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
    // AJOUT : un admin ne peut pas se supprimer lui-même par erreur via cette route
    if (req.params.id === String(req.user._id)) {
      return res.status(400).json({ success: false, message: "Vous ne pouvez pas supprimer votre propre compte." });
    }

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

// 4️⃣ [ADMIN] Ajouter un employé — mot de passe temporaire généré + envoyé par email
exports.addEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, role, department, hireDate, status } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ success: false, message: "Prénom, nom et email sont requis." });
    }

    // AJOUT : email doit être du domaine entreprise
    if (!isDomainAllowed(email)) {
      return res.status(400).json({
        success: false,
        message: `L'email doit appartenir au domaine ${ALLOWED_EMPLOYEE_DOMAINS.join(", ")}.`
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: "Cet email est déjà utilisé." });
    }

    // AJOUT : mot de passe temporaire aléatoire — laissé EN CLAIR ici,
    // le hook pre("save") du modèle User se charge de le hasher une seule fois.
    const tempPassword = crypto.randomBytes(9).toString("base64").replace(/[+/=]/g, "");

    const safeDepartmentId = mongoose.Types.ObjectId.isValid(department) ? department : null;
    const normalizedStatus = (status === 'ACTIVE' || status === 'actif') ? 'ACTIVE' : 'INACTIVE';

    const newUser = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: tempPassword, // en clair, hashé automatiquement au .save()
      authProvider: "local",
      role: 'EMPLOYEE', // ⚠️ toujours EMPLOYEE ici — la création d'ADMIN se fait par script séparé, jamais via cette route
      position: role,
      departmentId: safeDepartmentId,
      joinDate: hireDate,
      status: normalizedStatus,
      salary: 500,
      avatar: 'default-avatar.png'
    });

    await newUser.save();

    // AJOUT : envoi du mot de passe temporaire par email (best-effort, ne bloque pas la réponse)
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:4200";
    const html = `
      <h2>Bienvenue chez Cyber Park HR</h2>
      <p>Bonjour ${firstName},</p>
      <p>Un compte a été créé pour vous sur l'espace RH Cyber Park.</p>
      <p><strong>Email :</strong> ${email.toLowerCase()}<br/>
         <strong>Mot de passe temporaire :</strong> ${tempPassword}</p>
      <p>Connectez-vous ici puis changez votre mot de passe dès que possible : <a href="${frontendUrl}/login">${frontendUrl}/login</a></p>
      <p>Vous pouvez aussi vous connecter directement avec votre compte Google professionnel.</p>
    `;

    sendEmail({
      to: email.toLowerCase(),
      subject: "Votre accès à Cyber Park HR",
      html
    }).catch((emailError) => {
      console.error("Erreur envoi email de bienvenue:", emailError.message);
    });

    const safeUser = newUser.toObject();
    delete safeUser.password;

    return res.status(201).json({ success: true, message: 'Employé ajouté avec succès, identifiants envoyés par email.', user: safeUser });

  } catch (error) {
    console.error("Erreur Backend complète :", error);
    return res.status(500).json({ success: false, message: 'Erreur lors de la création', error: error.message });
  }
};

// 5️⃣ [ADMIN] Récupérer un seul employé par son ID
exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "L'identifiant fourni n'est pas valide."
      });
    }

    const employee = await User.findById(id).populate("departmentId", "name");

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
    console.error("❌ Erreur lors de la récupération de l'employé :", error);
    return res.status(500).json({
      success: false,
      message: "Une erreur interne du serveur est survenue.",
      error: error.message
    });
  }
};

// 6️⃣ [TOUS UTILISATEURS CONNECTÉS] Récupérer le profil de l'utilisateur connecté
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