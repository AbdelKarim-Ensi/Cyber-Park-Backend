# Cyber Park HR

Application web full-stack de gestion RH, développée dans le cadre d'un stage d'été chez **ABBK PHYSICSWORKS**.

Cyber Park HR permet de gérer les employés, départements, congés, avances sur salaire, projets, présences et annonces d'une entreprise, avec un système de rôles (ADMIN / EMPLOYEE) et un chatbot IA intégré capable d'exécuter des actions via function calling.

## Stack technique

**Frontend**
- Angular 21 (standalone components, zoneless change detection)
- Firebase Authentication (email/mot de passe + Google Sign-In)
- SweetAlert2
- Tests unitaires : Vitest · Tests e2e : Cypress

**Backend**
- Node.js / Express
- MongoDB Atlas (Mongoose)
- Firebase Admin SDK (vérification des tokens)
- Google Gemini API (`gemini-2.5-flash-lite`) pour le chatbot avec function calling
- Envoi d'emails (notifications, désabonnement)
- Tests de charge : k6

## Fonctionnalités principales

- **Authentification** : email/mot de passe et Google Sign-In (Firebase), gestion des rôles ADMIN/EMPLOYEE
- **Employés** : CRUD complet, profil, gestion des champs en lecture seule selon le rôle
- **Départements** : gestion des départements et de leurs membres
- **Congés** (Leaves) : demandes et suivi avec statuts (`PENDING`, etc.)
- **Avances sur salaire** (Salary Advances) : demandes et validation
- **Projets** : suivi avec statuts (`IN_PROGRESS`, `ON_HOLD`, `COMPLETED`, `PENDING`)
- **Présences** (Attendance) : pointage, pause/break, tableau fusionné
- **Annonces** : diffusion avec ciblage par rôle
- **Notifications / abonnés** : système d'abonnement et de désabonnement par email
- **Chatbot IA** : assistant intégré basé sur Gemini, avec accès à des outils différents selon le rôle (4 pour EMPLOYEE, 11 pour ADMIN)
- **Dashboard** : to-do list personnelle, présences, annonces, sidebar responsive

## Structure du projet

```
frontend/          Application Angular (standalone, zoneless)
├─ src/app/
│  ├─ core/
│  │  ├─ guards/          Protection des routes (auth, admin, rôles)
│  │  ├─ interceptors/    Intercepteur HTTP
│  │  └─ services/        Services métier (employee, department, leave, chatbot, auth...)
│  ├─ pages/
│  │  ├─ dashboard/, employees/, departments/, leaves/, projects/,
│  │  │  salary-advances/, attendance/, announcements/, chatbot/, profil/
│  │  ├─ login/, register/, forgot-password/, reset-password/
│  │  └─ landing/, notfound/, unsubscribe/
│  └─ shared/layout/      Navbar, sidebar
├─ cypress/                Tests end-to-end

backend/            API Node.js / Express (voir dossier backend si présent dans le repo)
```

## Démarrage - Frontend

```bash
cd frontend
npm install
ng serve
```

L'application est accessible sur `http://localhost:4200/`.

### Build

```bash
ng build
```

Les artefacts de build sont générés dans `dist/`.

### Tests

```bash
ng test        # tests unitaires (Vitest)
npx cypress open   # tests e2e (Cypress)
```

## Configuration

Le frontend utilise `src/environments/environment.ts` pour l'URL de l'API backend (pas de préfixe `/api`) et la configuration Firebase.

## Auteur

Stage d'été 2026 chez ABBK PHYSICSWORKS, encadré par Safa Khebir.
