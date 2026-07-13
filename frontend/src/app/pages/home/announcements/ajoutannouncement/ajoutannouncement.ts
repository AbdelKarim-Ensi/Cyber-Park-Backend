import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnouncementService } from '../../../../core/services/announcement'; // Ajuste le chemin selon ton projet
import Swal from 'sweetalert2';

// NOUVEAU : forme d'une option de cible
interface TargetOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-ajoutannouncement',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ajoutannouncement.html',
  styleUrl: './ajoutannouncement.css',
})
export class Ajoutannouncement implements OnInit {
 announcementForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _announcement: AnnouncementService
  ) {
    // Initialisation du formulaire réactif
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      target: ['', Validators.required],
      image: [''], // Optionnel
      content: ['', Validators.required],
    });
  }

  // NOUVEAU : liste complète des cibles possibles (ADMIN_ONLY et EMPLOYEE_ONLY ajoutés)
  private readonly allTargetOptions: TargetOption[] = [
    { value: 'PUBLIC', label: 'PUBLIC' },
    { value: 'INTERNAL_ALL', label: 'INTERNE (Tous)' },
    { value: 'EMPLOYEE_ONLY', label: 'EMPLOYÉS UNIQUEMENT' },
    { value: 'ADMIN_ONLY', label: 'ADMINS UNIQUEMENT' }
  ];

  // NOUVEAU : rôle de l'utilisateur connecté (même source que le reste du projet, pas de rôle en dur)
  // RECHERCHEZ le getter currentRole et remplacez-le par ce bloc nettoyé :
 // RECHERCHEZ le getter currentRole dans ajoutannouncement.component.ts et remplacez-le par ce bloc résistant :
  get currentRole(): string {
    try {
      // 1. Compatibilité : si un jour une clé 'user' existe, on la garde en priorité
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userObj = JSON.parse(storedUser);
        const rawRole = userObj.role || (userObj.data && userObj.data.role) || '';
        if (rawRole) return this.normalizeRole(rawRole);
      }

      // 2. Cas réel : le rôle est encodé dans le token JWT
      const token = localStorage.getItem('token');
      if (!token) return '';

      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) return '';

      const payloadJson = decodeURIComponent(
        atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'))
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload = JSON.parse(payloadJson);

      const rawRole =
        payload.role ||
        payload.userRole ||
        (payload.user && payload.user.role) ||
        '';

      return this.normalizeRole(rawRole);
    } catch (e) {
      return '';
    }
  }

  // NOUVEAU : fonction de normalisation robuste demandée dans le cahier des charges
  private normalizeRole(rawRole: string): string {
    if (!rawRole) return '';
    const cleaned = rawRole.toString().toUpperCase().trim().replace('ROLE_', '');
    if (cleaned.includes('ADMIN')) return 'ADMIN';
    if (cleaned.includes('EMPLOY')) return 'EMPLOYEE';
    return cleaned;
  }

  // 3. Le GETTER pour les options (S'assure de recalculer à chaque cycle Angular)
  get targetOptions() {
    const role = this.currentRole;
    console.log("Rôle détecté par le sélecteur d'options :", role);

    if (role === 'ADMIN') {
      return this.allTargetOptions; // L'admin voit tout
    }
    // L'employé ne voit que le Public et l'Employé uniquement
    return this.allTargetOptions.filter(o => o.value === 'PUBLIC' || o.value === 'EMPLOYEE_ONLY');
  }

  ngOnInit(): void {}

  // Détection dynamique du mode sombre identique à votre composant Projet
  get isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark') || document.body.classList.contains('dark'); // 
  }

  // --- SOUMISSION DU FORMULAIRE ---
  onSubmit(): void {
    if (this.announcementForm.invalid) {
      this.announcementForm.markAllAsTouched(); // [cite: 17]
      return;
    }

    const payload = {
      ...this.announcementForm.value,
      title: this.announcementForm.value.title.trim(),
      content: this.announcementForm.value.content.trim(),
      image: this.announcementForm.value.image ? this.announcementForm.value.image.trim() : null
    };

    // Configuration identique du thème dynamique pour SweetAlert2
    const isDark = this.isDarkMode;
    const bgColor = isDark ? '#161b26' : '#ffffff'; // 
    const textColor = isDark ? '#ffffff' : '#0f172a'; // 

    this._announcement.createAnnouncement(payload).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Annonce créée !',
          text: "L'annonce a été publiée avec succès.",
          confirmButtonColor: '#2563eb', // [cite: 21]
          background: bgColor, // [cite: 21]
          color: textColor, // [cite: 21]
        }).then(() => this.router.navigate(['/home/announcements']));
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Impossible d'ajouter l'annonce.",
          confirmButtonColor: '#ef4444', // [cite: 22]
          background: bgColor, // [cite: 22]
          color: textColor, // [cite: 22]
        });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/home/announcements']);
  }
}