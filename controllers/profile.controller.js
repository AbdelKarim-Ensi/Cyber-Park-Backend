const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// 📥 1. RÉCUPÉRER LE PROFIL CONNECTÉ
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('departmentId', 'name');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du profil.', error: error.message });
  }
};

// ✏️ 2. METTRE À JOUR LES INFOS PERSONNELLES
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const updatedData = { firstName, lastName, email, phone };

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    res.status(200).json({
      success: true,
      message: 'Profil mis à jour avec succès.',
      data: updatedUser
    });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour.', error: error.message });
  }
};

// 🔒 3. CHANGER LE MOT DE PASSE
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Le mot de passe actuel est incorrect.' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Mot de passe modifié avec succès !' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors du changement de mot de passe.', error: error.message });
  }
};

// 📸 4. UPLOADER L'AVATAR (FICHIER)
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Veuillez sélectionner un fichier valide.' });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      // Nettoie le fichier déjà uploadé si l'utilisateur n'existe pas
      const uploadedPath = path.join(__dirname, '../uploads/avatars/', req.file.filename);
      if (fs.existsSync(uploadedPath)) fs.unlinkSync(uploadedPath);
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    // Supprime l'ancien avatar du serveur s'il ne s'agit pas de l'image par défaut
    if (user.avatar && user.avatar !== 'default-avatar.png') {
      const oldPath = path.join(__dirname, '../uploads/avatars/', user.avatar);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Sauvegarde du nom du nouveau fichier dans MongoDB
    user.avatar = req.file.filename;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Avatar mis à jour avec succès.',
      avatarUrl: `/uploads/avatars/${req.file.filename}`
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'upload de l'avatar.", error: error.message });
  }
};