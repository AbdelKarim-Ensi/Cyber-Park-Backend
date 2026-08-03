const mongoose = require("mongoose");

const announcement = new mongoose.Schema(
  {
    title: { 
        type: String, 
        required: [true, "Le titre est requis"], 
        trim: true },
    content: { 
        type: String, 
        required: [true, "Le contenu est requis"] },
    image: { 
        type: String, 
        default: 'https://www.dragnsurvey.com/blog/wp-content/uploads/2025/12/collecter-des-reponses-anonymes-sondage-en-ligne.jpg' }, // URL ou nom du fichier image associé à l'annonce
   // RECHERCHEZ le champ target et remplacez sa configuration par celle-ci :
    target: { 
      type: String, 
      enum: ["PUBLIC", "INTERNAL_ALL", "ADMIN_ONLY", "EMPLOYEE_ONLY"], 
      default: "INTERNAL_ALL" 
    },
    authorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcement);