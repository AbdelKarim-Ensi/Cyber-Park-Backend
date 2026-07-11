const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const hpp = require("hpp");
const xssSanitizer = require("./middleware/sanitize.middleware");
const rateLimit = require("express-rate-limit"); // CORRECTION : nom coherent "rateLimit"
dotenv.config();

const app = express();

// Database
require("./config/connect")();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
})); // 2. Protection des en-têtes HTTP contre les failles de sécurité

// AJOUT : liste des origines autorisées (local + prod Vercel)
const allowedOrigins = [
  "http://localhost:4200",
  "https://cyber-park-hr.vercel.app"
];
app.use(cors({
  origin: function (origin, callback) {
    // AJOUT : autorise les requêtes sans origin (ex: Postman) et celles dans la liste
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
})); // 3. Meilleure pratique : restreindre l'accès au frontend Angular uniquement
app.use(express.json({ limit: "10kb" }));

// // rate limiting global
// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limite chaque IP à 100 requêtes par fenêtre
//   message: "Trop de requêtes provenant de cette IP, veuillez réessayer après 15 minutes.",
//   standardHeaders: true, // Retourne les informations de limite dans les en-têtes `RateLimit-*`
//   legacyHeaders: false, // Désactive les en-têtes `X-RateLimit-*`
// });
// // CORRECTION : app.use("/") au lieu de "/api/" car aucune route ne commence par /api/
// app.use("/", apiLimiter);

// // rate limiting pour le route /auth/login et /auth/register
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // 10 tentatives de login/register max par IP
//   message: "Trop de tentatives de connexion, réessayez dans 15 minutes.",
//   standardHeaders: true,
//   legacyHeaders: false,
// });
// app.use("/auth/login", authLimiter); // Applique le rate limiter à la route de login
// app.use("/auth/register", authLimiter); // AJOUT : applique aussi sur register

// protection contre pollution de requêtes
app.use(hpp())
// protection conter le attaques xss
app.use(xssSanitizer)
// Uploads
app.use("/image", express.static("uploads"));
// Routes
const routeUser=require("./routes/auth.routes")
app.use("/auth", routeUser);
const routeEmployee=require("./routes/employee.routes")
app.use("/employees", routeEmployee);
const routeLeave=require("./routes/leave.routes")
app.use("/leaves", routeLeave);
const routeAttendance = require("./routes/attendance.routes");
app.use("/attendance", routeAttendance);
const routeDashboard = require("./routes/dashboard.routes");
app.use("/dashboard", routeDashboard);
const routeAnnouncement = require("./routes/announcement.routes");
app.use("/announcements", routeAnnouncement);
const routeDepartment = require("./routes/department.routes");
app.use("/departments", routeDepartment);
const routeSalary = require("./routes/salaryAdvance.routes");
app.use("/salaryAdvances", routeSalary);
const routeProject = require("./routes/project.routes");
app.use("/projects", routeProject);
app.use('/uploads', express.static('uploads'));

// Déclaration de la route du profil
app.use('/profil', require('./routes/profile.routes'));
//chatbot
const chatbotRoutes = require("./routes/chatbot.routes");
app.use("/chatbot", chatbotRoutes);
const subscriberRoutes = require("./routes/subscriber.routes");
app.use("/subscribers", subscriberRoutes);

app.get("/test-chatbot-alive", (req, res) => {
  res.json({ ok: true });
});
// 🎯 AJOUT : démarrage de la tâche planifiée qui vide automatiquement
// la liste des présences des jours précédents chaque nuit à minuit.
const { startAttendanceResetJob } = require("./jobs/attendance.cron");
startAttendanceResetJob();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});