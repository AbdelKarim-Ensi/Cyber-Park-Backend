backend/
├─ config/
│  ├─ authConfig.js         Configuration de l'authentification
│  ├─ connect.js            Connexion MongoDB Atlas (résolution DNS ipv4first)
│  └─ firebase-admin.js     Initialisation Firebase Admin SDK
│
├─ controllers/             Logique métier par ressource
│  ├─ announcement.controller.js
│  ├─ attendance.controller.js
│  ├─ auth.controller.js
│  ├─ chatbot.controller.js
│  ├─ dashboard.controller.js
│  ├─ department.controller.js
│  ├─ employee.controller.js
│  ├─ leave.controller.js
│  ├─ profile.controller.js
│  ├─ project.controller.js
│  ├─ salaryAdvance.controller.js
│  └─ subscriber.controller.js
│
├─ jobs/
│  └─ attendance.cron.js    Tâche planifiée liée aux présences
│
├─ middleware/
│  ├─ auth.middleware.js    Vérification du token Firebase
│  ├─ role.middleware.js    Contrôle d'accès selon le rôle (ADMIN/EMPLOYEE)
│  └─ sanitize.middleware.js Protection XSS (middleware custom basé sur `xss`)
│
├─ models/                  Schémas Mongoose
│  ├─ announcement.model.js
│  ├─ attendance.model.js
│  ├─ department.model.js
│  ├─ leave.model.js
│  ├─ project.model.js
│  ├─ salaryAdvance.model.js
│  ├─ subscriber.model.js
│  └─ user.model.js
│
├─ routes/                  Définition des endpoints (montés sans préfixe /api)
│  ├─ announcement.routes.js
│  ├─ attendance.routes.js
│  ├─ auth.routes.js
│  ├─ chatbot.routes.js
│  ├─ dashboard.routes.js
│  ├─ department.routes.js
│  ├─ employee.routes.js
│  ├─ leave.routes.js
│  ├─ profile.routes.js
│  ├─ project.routes.js
│  ├─ salaryAdvance.routes.js
│  └─ subscriber.routes.js
│
├─ script/
│  └─ seedAdmin.js          Script de création d'un compte admin initial
│
├─ test/
│  └─ login-test.js         Test du flux de connexion
│
├─ utils/
│  └─ mailer.js             Envoi d'emails (fire-and-forget)
│
└─ server.js                 Point d'entrée de l'application
