import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, Router } from "@angular/router";
import { AnnouncementService } from '../../../core/services/announcement'; // Ajustez le chemin exact de votre service
import Swal from 'sweetalert2';

@Component({
  selector: 'app-announcements',
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './announcements.html',
  styleUrl: './announcements.css',
})
export class Announcements implements OnInit {
  announcementsList: any[] = [];
  userRole: string = '';
  
  private _announcement = inject(AnnouncementService);
  private _router = inject(Router);
  private _cdr = inject(ChangeDetectorRef);
   isAdmin(): boolean {
    return this.userRole === 'ADMIN' || this.userRole === 'Admin' || this.userRole === 'admin';
  }

  ngOnInit(): void {
    this.loadAnnouncements();
    const storedUser = localStorage.getItem('user');
     if (storedUser) {
    const userObj = JSON.parse(storedUser);
    this.userRole = userObj.role || 'vide'; // ou userObj.role.name selon votre structure
  }
    console.log("Rôle de l'utilisateur :", this.userRole);
  
  }

  // 1. Getter pour récupérer proprement le rôle depuis le localStorage
  get currentRole(): string {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const userObj = JSON.parse(userStr);
        // Cherche le rôle peu importe la profondeur dans l'objet JSON
        const rawRole = userObj.role || (userObj.data && userObj.data.role) || '';
        return rawRole.toUpperCase().trim().replace('ROLE_', '');
      }
    } catch (e) {
      console.error('Erreur lecture rôle:', e);
    }
    return '';
  }

  // 2. Getter qui filtre la liste des annonces selon le rôle
  get filteredAnnouncements(): any[] {
    if (!this.announcementsList) return [];
    
    // Si l'utilisateur est ADMIN, il voit absolument toutes les annonces
    if (this.currentRole === 'ADMIN') {
      return this.announcementsList;
    }
    
    // Si l'utilisateur est EMPLOYEE, on filtre pour cacher celles avec ADMIN_ONLY
    return this.announcementsList.filter(ann => ann.target !== 'ADMIN_ONLY');
  }

  // Chargement initial de la liste depuis le service
  loadAnnouncements(): void {
    this._announcement.getAllAnnouncements().subscribe({
      next: (res: any) => {
        if (res && res.data) {
          this.announcementsList = res.data;
        } else {
          this.announcementsList = res; // Cas de secours si l'API changeait
        }
        console.log('Données reçues et assignées :', this.announcementsList);
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des annonces :", err);
      }
    });
  }

  // Calcul des initiales de l'auteur
  getInitials(author: any): string {
    if (!author || typeof author === 'string') return '👤';
    const first = author.firstName ? author.firstName.charAt(0).toUpperCase() : '';
    const last = author.lastName ? author.lastName.charAt(0).toUpperCase() : '';
    return first + last || '👤';
  }

  // Détection dynamique du mode sombre
  get isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
  }

  // Suppression sécurisée avec SweetAlert2 dynamique selon le thème
  onDelete(id: any): void {
    const isDark = this.isDarkMode;
    const bgColor = isDark ? '#161b26' : '#ffffff';
    const textColor = isDark ? '#ffffff' : '#0f172a';
    
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette annonce sera définitivement supprimée !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444', 
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      background: bgColor,
      color: textColor,
    }).then((result) => {
      if (result.isConfirmed) {
        this._announcement.deleteAnnouncements(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Supprimée !',
              text: "L'annonce a bien été retirée.",
              confirmButtonColor: '#2563eb',
              background: bgColor,
              color: textColor,
            });
            this.loadAnnouncements(); // Recharger la liste après suppression
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: "Impossible de supprimer cette annonce.",
              confirmButtonColor: '#ef4444',
              background: bgColor,
              color: textColor,
            });
          }
        });
      }
    });
  }

  onedit(id: any): void {
    this._router.navigate(['/home/announcements/update/' + id]);
  }
}