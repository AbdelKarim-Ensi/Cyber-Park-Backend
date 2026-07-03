const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");

dotenv.config();

const app = express();

// Database
require("./config/connect")();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
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

// 🎯 AJOUT : démarrage de la tâche planifiée qui vide automatiquement
// la liste des présences des jours précédents chaque nuit à minuit.
const { startAttendanceResetJob } = require("./jobs/attendance.cron");
startAttendanceResetJob();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});