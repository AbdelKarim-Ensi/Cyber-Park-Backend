# Cyber Park HR

**Cyber Park HR** est une application web full-stack de gestion des ressources humaines, développée dans le cadre d'un stage d'été chez **ABBK PHYSICSWORKS** (encadrement : Safa Khebir).

Elle permet à une entreprise de gérer ses employés, départements, projets, congés, avances sur salaire, présences et annonces internes, avec un système de rôles (ADMIN / EMPLOYEE) et un **chatbot IA intégré** capable d'exécuter des actions concrètes via function calling (Google Gemini).

## Aperçu

- Gestion complète des **employés** et **départements**
- Suivi des **congés**, **avances sur salaire** et **présences**
- Gestion de **projets** avec statuts
- **Annonces** internes ciblées par rôle
- Système de **notifications** par email (abonnement / désabonnement)
- **Chatbot IA** basé sur Gemini, avec des outils différents selon le rôle de l'utilisateur (4 pour un employé, 11 pour un admin)
- Authentification sécurisée via **Firebase** (email/mot de passe et Google Sign-In)
- **Dashboard** personnalisé avec to-do list, présences et annonces

## Architecture

Le projet est structuré en deux parties distinctes :

```
Cyber-Park-HR/
├─ frontend/     Application Angular (standalone, zoneless)
└─ backend/      API Node.js / Express
```

| Partie | Stack |
|---|---|
| **Frontend** | Angular 21 (standalone components, zoneless change detection), Firebase Auth, SweetAlert2, Vitest, Cypress |
| **Backend** | Node.js / Express, MongoDB Atlas (Mongoose), Firebase Admin SDK, Google Gemini API, k6 |

Le frontend communique avec le backend via une API REST (routes montées sans préfixe `/api`). L'authentification passe par Firebase des deux côtés : le frontend gère la connexion utilisateur, le backend vérifie les tokens via Firebase Admin SDK.

## Démarrage rapide

### Backend

```bash
cd backend
npm install
node server.js
```

### Frontend

```bash
cd frontend
npm install
ng serve
```

L'application est accessible sur `http://localhost:4200/`.

## Tests

- **Frontend** : tests unitaires (Vitest) et tests end-to-end (Cypress)
- **Backend** : tests de charge (k6) sur 10 endpoints, résultats exportés en LaTeX pour le rapport de stage

## Documentation détaillée

- [`frontend/README.md`](./frontend/README.md) — structure et fonctionnement de l'interface Angular
- [`backend/README.md`](./backend/README.md) — structure de l'API, modèles, routes et configuration

## Auteur

Projet réalisé par **Abdel Karim**, étudiant en première année d'ingénierie à l'ENSI, dans le cadre d'un stage d'été 2026 chez ABBK PHYSICSWORKS.
