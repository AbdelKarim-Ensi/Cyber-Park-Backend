import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LeaveService } from '../../../core/services/leave'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leaves',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './leaves.html',
  styleUrl: './leaves.css',
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class Leaves implements OnInit {
  leaveRequests: any[] = [];
  stats = { pending: 0, approved: 0, rejected: 0 };
  userRole: string = '';
  constructor(
    private _leave: LeaveService,
    private _cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      this.userRole = userObj.role || 'vide'; 
    }
    console.log("Rôle de l'utilisateur :", this.userRole);
    this.loadLeaveRequests();
  }
   isAdmin(): boolean {
    return this.userRole === 'ADMIN' || this.userRole === 'Admin' || this.userRole === 'admin';
  }
  get isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark') ||
           document.body.classList.contains('dark') || 
           document.body.classList.contains('dark-theme');
  }

  loadLeaveRequests(): void {
     if(this.isAdmin()) {
      this._leave.getAllLeaves().subscribe({
      next: (response: any) => {
        if (Array.isArray(response)) {
          this.leaveRequests = response;
        } else if (response && Array.isArray(response.data)) {
          this.leaveRequests = response.data;
        } else if (response && Array.isArray(response.leaves)) {
          this.leaveRequests = response.leaves;
        } else {
          this.leaveRequests = [];
        }
        this.calculateStats();
        this._cdr.detectChanges(); 
      },
      error: (err) => console.error("Erreur", err)
    });}
    else{
      this._leave.getMyLeaves().subscribe({
        next: (response: any) => {
          if (Array.isArray(response)) {
            this.leaveRequests = response;
          } else if (response && Array.isArray(response.data)) {
            this.leaveRequests = response.data;
          } else if (response && Array.isArray(response.leaves)) {
            this.leaveRequests = response.leaves;
          } else {
            this.leaveRequests = [];
          }
          this.calculateStats();
          this._cdr.detectChanges();
        },
        error: (err) => console.error("Erreur", err)
      });
    }
  }

  calculateStats(): void {
    this.stats.pending = this.leaveRequests.filter(l => l.status === 'PENDING').length;
    this.stats.approved = this.leaveRequests.filter(l => l.status === 'APPROVED').length;
    this.stats.rejected = this.leaveRequests.filter(l => l.status === 'REJECTED').length;
  }

  approve(leaveId: string): void {
    const bgColor = this.isDarkMode ? '#161b26' : '#ffffff';
    const textColor = this.isDarkMode ? '#ffffff' : '#0f172a';

    // 🚀 1. MISE À JOUR INSTANTANÉE (Optimistic Update)
    const leaveIndex = this.leaveRequests.findIndex(l => l._id === leaveId);
    if (leaveIndex > -1) {
      this.leaveRequests[leaveIndex].status = 'APPROVED'; // Change le statut localement
      this.calculateStats(); // Recalcule les compteurs
      this._cdr.detectChanges(); // Force l'affichage immédiat
    }

    // 🌐 2. APPEL AU BACKEND
    this._leave.updateLeaveStatus(leaveId, 'APPROVED').subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Congé Approuvé',
          text: 'La demande a été validée avec succès.',
          timer: 1500,
          showConfirmButton: false,
          background: bgColor,
          color: textColor
        });
        // Optionnel : on peut recharger la liste depuis le backend pour être 100% synchrone
        this.loadLeaveRequests(); 
      },
      error: (err) => {
        // En cas d'erreur, on annule le changement local
        if (leaveIndex > -1) {
          this.leaveRequests[leaveIndex].status = 'PENDING';
          this.calculateStats();
          this._cdr.detectChanges();
        }
        Swal.fire({ icon: 'error', title: 'Erreur', text: 'Impossible de valider.', background: bgColor, color: textColor });
      }
    });
  }

  reject(leaveId: string): void {
    const bgColor = this.isDarkMode ? '#161b26' : '#ffffff';
    const textColor = this.isDarkMode ? '#ffffff' : '#0f172a';

    // 💬 Affiche la pop-up pour forcer la saisie du motif de refus
    Swal.fire({
      title: 'Motif du refus',
      text: 'Veuillez indiquer pourquoi ce congé est refusé.',
      input: 'textarea',
      inputPlaceholder: 'Le motif de refus est obligatoire...',
      showCancelButton: true,
      confirmButtonText: 'Confirmer le refus',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#ef4444', 
      background: bgColor,
      color: textColor,
      preConfirm: (reason) => {
        if (!reason || reason.trim() === '') {
          Swal.showValidationMessage('Le motif du refus est obligatoire.');
        }
        return reason;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const rejectionReason = result.value;

        // 🚀 OPTIMISTIC UPDATE : Mise à jour instantanée des compteurs à l'écran
        const leaveIndex = this.leaveRequests.findIndex(l => l._id === leaveId);
        if (leaveIndex > -1) {
          this.leaveRequests[leaveIndex].status = 'REJECTED';
          this.calculateStats(); // En attente -1, Refusés +1
          this._cdr.detectChanges();
        }

        // 🌐 Envoi au backend avec la cause obligatoire
        this._leave.updateLeaveStatus(leaveId, 'REJECTED', rejectionReason).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Congé Refusé',
              text: 'La demande a bien été refusée.',
              timer: 1500,
              showConfirmButton: false,
              background: bgColor,
              color: textColor
            });
            this._leave.notifyUserUpdated();
            this.loadLeaveRequests(); // AJOUT : reload seulement après confirmation backend, comme approve()
          },
          error: (err) => {
            console.error("Erreur refus :", err);
            // Annulation en cas de bug serveur
            if (leaveIndex > -1) {
              this.leaveRequests[leaveIndex].status = 'PENDING';
              this.calculateStats();
              this._cdr.detectChanges();
            }}
        });
      }
    });
  }

  // =========================================================================
  // 2) FONCTION POUBELLE : Suppression DIRECTE et INSTANTANÉE (Sans cause)
  // =========================================================================
  // =========================================================================
  // 🗑️ ACTION POUBELLE : Suppression 100% INSTANTANÉE sans toucher aux stats
  // =========================================================================
  deleteLeave(leaveId: string): void {
    // 🚀 1. OPTIMISTIC UPDATE : La carte s'efface instantanément du HTML
    const leaveIndex = this.leaveRequests.findIndex(l => l._id === leaveId);
    let deletedLeave = null;

    if (leaveIndex > -1) {
      // On retire l'élément du tableau Angular pour faire disparaître la carte
      deletedLeave = this.leaveRequests.splice(leaveIndex, 1)[0]; 
      
      // 🛑 ON NE CALCULE PLUS LES STATS ICI ! (Comme ça Approved et Rejected ne bougent pas)
      
      // On force l'interface graphique à se rafraîchir à la milliseconde
      this._cdr.detectChanges(); 
    }

    // 🌐 2. APPEL BACKEND TOTALEMENT SILENCIEUX
    this._leave.deleteLeavesStatus(leaveId).subscribe({
      next: () => {
        console.log("Demande supprimée définitivement de la base.");
      },
      error: (err) => {
        console.error("Erreur lors de la suppression serveur :", err);
        
        // SÉCURITÉ : Si le serveur a un problème, on restaure discrètement la carte
        if (deletedLeave) {
          this.leaveRequests.splice(leaveIndex, 0, deletedLeave);
          this._cdr.detectChanges();
        }
        
        const bgColor = this.isDarkMode ? '#161b26' : '#ffffff';
        const textColor = this.isDarkMode ? '#ffffff' : '#0f172a';
        Swal.fire({ 
          icon: 'error', 
          title: 'Erreur', 
          text: 'La suppression a échoué côté serveur. La carte a été restaurée.', 
          background: bgColor, 
          color: textColor 
        });
      }
    });
  }

  getLeaveTypeLabel(type: string): string {
    const types: { [key: string]: string } = {
      'ANNUAL': 'Congé Annuel', 'SICK': 'Congé Maladie', 'MATERNITY': 'Congé Maternité', 'UNPAID': 'Congé Sans Solde', 'OTHER': 'Autre'
    };
    return types[type] || type;
  }
  // À ajouter dans ton fichier leaves.ts :

/**
 * Calcule dynamiquement le nombre de jours entre deux dates
 * @param start Date de début (string ou Date)
 * @param end Date de fin (string ou Date)
 */
calculateDuration(start: string | Date, end: string | Date): number {
  if (!start || !end) return 0;
  
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  // Reset des heures pour éviter les bugs de fuseaux horaires ou de décalages d'heures
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  
  const diffTime = endDate.getTime() - startDate.getTime();
  
  // Conversion en jours (+1 pour inclure le jour de début dans le calcul de congé)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  
  return diffDays > 0 ? diffDays : 0;
}
}