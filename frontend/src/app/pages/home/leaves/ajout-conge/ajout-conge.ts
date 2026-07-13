import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LeaveService } from '../../../../core/services/leave'; // Ajuste le chemin si nécessaire selon ton arborescence

@Component({
  selector: 'app-ajout-conge',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ajout-conge.html',
  styleUrl: './ajout-conge.css'
})
export class AjoutConge implements OnInit {
  leaveForm!: FormGroup;
  private _cdr = inject(ChangeDetectorRef);
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _leave: LeaveService // Injection de ton service fourni
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire réactif avec validations strictes
    this.leaveForm = this.fb.group({
      type: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required]
    });
    this._cdr.detectChanges();
  }

  // Détection dynamique du mode sombre (identique à ta logique Département)
  get isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
  }

  onSubmit(): void {
    if (this.leaveForm.valid) {
      const payload = this.leaveForm.value;

      // Configuration dynamique des couleurs SweetAlert2 selon le thème actif
      const isDark = this.isDarkMode;
      const bgColor = isDark ? '#161b26' : '#ffffff';
      const textColor = isDark ? '#ffffff' : '#0f172a';

      // Appel de la méthode de ton service
      this._leave.requestLeave(payload).subscribe({
        next: (res: any) => {
          // 🎉 SWEET ALERT : EN CAS DE SUCCÈS
          Swal.fire({
            icon: 'success',
            title: 'Demande enregistrée !',
            text: 'Votre demande de congé a été soumise avec succès.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#2563eb',
            background: bgColor,
            color: textColor,
          }).then((result) => {
            if (result.isConfirmed) {
              this.leaveForm.reset();
              this.router.navigate(['/home/leaves']); // Redirection vers la liste des congés
            }
          });
        },
        error: (err: any) => {
          console.error("❌ Erreur lors de la création du congé :", err);
          
          // ❌ SWEET ALERT : EN CAS D'ÉCHEC / ERREUR
          Swal.fire({
            icon: 'error',
            title: 'Erreur lors de l\'envoi',
            text: "Impossible d'enregistrer votre demande de congé. Veuillez vérifier votre connexion ou réessayer.",
            confirmButtonText: 'Fermer',
            confirmButtonColor: '#ef4444',
            background: bgColor,
            color: textColor,
          });
        }
      });
    } else {
      // Force l'affichage visuel des erreurs si le formulaire est incomplet
      if (typeof (this.leaveForm as any).markAllAsTouched === 'function') {
        this.leaveForm.markAllAsTouched();
      } else {
        Object.values(this.leaveForm.controls).forEach(c => c.markAsTouched());
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/home/leaves']);
  }
}