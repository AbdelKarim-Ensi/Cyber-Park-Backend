# Cyber Park HR — Backend

API REST du système de gestion RH **Cyber Park HR**, développée dans le cadre d'un stage d'été chez **ABBK PHYSICSWORKS**.

Backend Node.js / Express connecté à MongoDB Atlas, avec authentification Firebase, gestion de rôles (ADMIN/EMPLOYEE), notifications par email, tâches planifiées (cron) et un chatbot IA basé sur Google Gemini avec function calling.

## Stack technique

- **Node.js / Express**
- **MongoDB Atlas** (Mongoose)
- **Firebase Admin SDK** — vérification des tokens d'authentification
- **Google Gemini API** (`gemini-2.5-flash-lite`) — chatbot avec function calling, accès aux outils selon le rôle
- **Nodemailer** (ou équivalent) — envoi d'emails (notifications, abonnements)
- **node-cron** — tâches planifiées (présences)
- **k6** — tests de charge

## Structure du projet

```
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
```

## Fonctionnalités principales

- **Authentification** : login/register via Firebase (email/mot de passe + Google), middleware de vérification de token, contrôle d'accès par rôle
- **Employés** : CRUD, accès self-service via `/employees/me`
- **Départements** : gestion des départements et de leurs membres
- **Congés & avances sur salaire** : demandes, validation, suivi de statut
- **Projets** : suivi avec statuts (`IN_PROGRESS`, `ON_HOLD`, `COMPLETED`, `PENDING`)
- **Présences** : pointage manuel + tâche cron automatisée
- **Annonces** : diffusion ciblée par rôle
- **Abonnés / notifications** : gestion des abonnements et envoi d'emails
- **Chatbot IA** : intégration Gemini avec function calling, outils différenciés selon le rôle (EMPLOYEE : 4 outils, ADMIN : 11 outils), retry avec backoff exponentiel sur erreurs 503/429
- **Dashboard** : agrégation de données pour la vue d'ensemble

## Installation

```bash
npm install
```

### Variables d'environnement

Créer un fichier `.env` à la racine avec, entre autres :

```
MONGODB_URI=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
GEMINI_API_KEY=
FRONTEND_URL=
EMAIL_USER=
EMAIL_PASS=
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
```

### Lancer le serveur

```bash
node server.js
```

## Tests de charge (k6)

Des tests de charge k6 couvrent 10 endpoints de l'API, exécutés séquentiellement. Les résultats sont exportés et formatés en LaTeX (`\begin{table}`, `\begin{figure}`) pour le rapport de stage.

```bash
k6 run <fichier-de-test>.js
```

## Notes techniques

- Les routes sont montées **sans préfixe `/api`** (ex. `/employees`, pas `/api/employees`)
- Un fix DNS (`ipv4first`) est appliqué dans `config/connect.js` / `server.js` pour résoudre un problème de connectivité MongoDB Atlas IPv6/IPv4 sur certains réseaux
- Les emails sont envoyés en fire-and-forget pour ne pas bloquer la réponse HTTP

## Auteur

Stage d'été 2026 chez ABBK PHYSICSWORKS, encadré par Safa Khebir.
