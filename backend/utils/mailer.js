const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Configuration du transporteur de mail (ex: Gmail)
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: false, 
    auth: {
      user: process.env.GMAIL_USER, // Ton email dans le fichier .env
      pass: process.env.GMAIL_APP_PASSWORD, // Ton mot de passe d'application dans le fichier .env
    },
  });

  const mailOptions = {
    from: `"Cyber Park HR" <${process.env.GMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  // Envoi de l'e-mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;