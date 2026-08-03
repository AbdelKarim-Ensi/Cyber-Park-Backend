const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const protect = require("../middleware/auth.middleware");
const profileController = require('../controllers/profile.controller');

// ⚙️ Chemin ABSOLU vers le dossier des avatars (résout le bug 500)
const avatarDir = path.join(__dirname, '../uploads/avatars');

// Crée le dossier (et les parents) automatiquement s'il n'existe pas
if (!fs.existsSync(avatarDir)) {
  fs.mkdirSync(avatarDir, { recursive: true });
}

// ⚙️ Configuration du stockage Multer pour les images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, avatarDir);
  },
  filename: function (req, file, cb) {
    // Génère un nom unique : avatar-id_utilisateur-timestamp.extension
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, `avatar-${req.user.id}-${uniqueSuffix}`);
  }
});

// Filtre pour n'accepter que les images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Seules les images (jpg, jpeg, png) sont autorisées.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // Limite à 2 Mo maximum
});

// ==========================================================================
// DÉFINITION DES ROUTAGES (TOUS PROTÉGÉS PAR LE MIDDLEWARE 'PROTECT')
// ==========================================================================

router.get('/getprofil', protect, profileController.getProfile);
router.put('/updateProfile', protect, profileController.updateProfile);
router.put('/updatePassword', protect, profileController.updatePassword);

router.post('/avatar', protect, (req, res, next) => {
  upload.single('avatar')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Erreur Multer (taille, type, etc.)
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // Erreur du fileFilter ou autre
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, profileController.uploadAvatar);

module.exports = router;