import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
// 🎯 Adapte ce chemin selon ton arborescence
import { SalaryAdvanceService } from '../../../core/services/salary-advance'; 
import { Route, Router, RouterLink } from '@angular/router';

export interface AdvanceRequest {
  _id?: string;
  id?: string;
  employeeId?: any; // ou spécifie { firstName: string, lastName: string }
  amount?: number;
  reason?: string;
  repaymentMonth?: string;
  status: string;
  createdAt?: string;
}

@Component({
  selector: 'app-salary-advance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './salary-advances.html',
  styleUrl: './salary-advances.css',
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class SalaryAdvances implements OnInit {
  advanceRequests: AdvanceRequest[] = [];
  advanceForm: FormGroup;
  isFormOpen: boolean = false;
  userRole: string = '';

  statusConfig: Record<string, string> = {
    'PENDING': 'En attente',
    'APPROVED': 'Approuvée',
    'REJECTED': 'Refusée',
    'PAID': 'Payée'
  };
  

  constructor(
    
    private fb: FormBuilder,
    private _salaryService: SalaryAdvanceService,
    private _cdr: ChangeDetectorRef,
    private _router:Router 
  ) {
    this.advanceForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      repaymentMonth: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const userObj = JSON.parse(storedUser);
    this.userRole = userObj.role || 'vide'; // ou userObj.role.name selon votre structure
  }
    console.log("Rôle de l'utilisateur :", this.userRole);
  
    this.loadRequests();
  }
  isAdmin(): boolean {
    return this.userRole === 'ADMIN' || this.userRole === 'Admin' || this.userRole === 'admin';
  }
  

  get isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark') ||
           document.body.classList.contains('dark') || 
           document.body.classList.contains('dark-theme');
  }

  loadRequests(): void {
    if(this.isAdmin()){
      this._salaryService.getAllAdvances().subscribe({
        next: (res: any) => {
          this.advanceRequests = res.data || res;
          this._cdr.detectChanges();
        },
        error: (err) => console.error("Erreur de chargement des demandes :", err)
      });
    }else{
      this._salaryService.getAdvances().subscribe({
        next: (res: any) => {
          this.advanceRequests = res.data || res;
          this._cdr.detectChanges();
        },
        error: (err) => console.error("Erreur de chargement des demandes :", err)
      });
    }
  }

  toggleForm(): void {
    this.isFormOpen = !this.isFormOpen;
    if (!this.isFormOpen) {
      this.advanceForm.reset();
    }
  }

  onSubmit(): void {
    if (this.advanceForm.invalid) return;

    const bgColor = this.isDarkMode ? '#161b26' : '#ffffff'; 
    const textColor = this.isDarkMode ? '#ffffff' : '#0f172a';

    this._salaryService.requestAdvance(this.advanceForm.value).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Demande soumise',
          text: 'Votre demande d\'avance a été envoyée avec succès.',
          confirmButtonColor: '#2563eb',
          background: bgColor,
          color: textColor
        });
        this.toggleForm();
        this.loadRequests();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: err.error?.message || 'Impossible de soumettre la demande.',
          confirmButtonColor: '#ef4444',
          background: bgColor,
          color: textColor
        });
      }
    });
  }

  // 🎯 CORRECTION 1 : L'ID doit accepter "string | undefined" car req._id peut être indéfini dans le HTML
  updateStatus(id: string | undefined, status: 'APPROVED' | 'REJECTED'): void {
    if (!id) return; // 🎯 Sécurité si l'ID est manquant

    const actionText = status === 'APPROVED' ? 'approuver' : 'refuser';
    const confirmColor = status === 'APPROVED' ? '#10b981' : '#ef4444';
    const bgColor = this.isDarkMode ? '#161b26' : '#ffffff'; 
    const textColor = this.isDarkMode ? '#ffffff' : '#0f172a';

    Swal.fire({
      title: 'Confirmation',
      text: `Êtes-vous sûr de vouloir ${actionText} cette demande ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: confirmColor,
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Oui, continuer',
      cancelButtonText: 'Annuler',
      background: bgColor,
      color: textColor
    }).then((result) => {
      if (result.isConfirmed) {
        // 🎯 CORRECTION 2 : Passer { status } comme un objet si le backend ou le service l'exige
        this._salaryService.updateStatus(id,  status ).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: `La demande a été ${status === 'APPROVED' ? 'approuvée' : 'refusée'}.`,
              confirmButtonColor: '#2563eb',
              background: bgColor,
              color: textColor
            });
            this.loadRequests();
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Impossible de mettre à jour le statut.',
              confirmButtonColor: '#ef4444',
              background: bgColor,
              color: textColor
            });
          }
        });
      }
    });
  }

  // 🎯 CORRECTION 3 : L'ID doit accepter "string | undefined"
  deleteAdvance(id: string | undefined): void {
    if (!id) return; // 🎯 Sécurité si l'ID est manquant

    const bgColor = this.isDarkMode ? '#161b26' : '#ffffff'; 
    const textColor = this.isDarkMode ? '#ffffff' : '#0f172a';

    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'La suppression de cette demande est définitive.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      background: bgColor,
      color: textColor
    }).then((result) => {
      if (result.isConfirmed) {
        this._salaryService.deleteAdvance(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Supprimée !',
              text: 'La demande a été retirée.',
              confirmButtonColor: '#2563eb',
              background: bgColor,
              color: textColor
            });
            this.loadRequests();
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'Impossible de supprimer la demande.',
              confirmButtonColor: '#ef4444',
              background: bgColor,
              color: textColor
            });
          }
        });
      }
    });
  }

  getInitials(emp: any): string {
    if (!emp) return '👤';
    if (typeof emp === 'string') return '👤';
    
    const first = emp.firstName ? emp.firstName.charAt(0).toUpperCase() : '';
    const last = emp.lastName ? emp.lastName.charAt(0).toUpperCase() : '';
    
    if (first || last) return first + last;
    return '👤';
  }
}