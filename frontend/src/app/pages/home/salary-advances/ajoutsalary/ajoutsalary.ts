import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SalaryAdvanceService } from '../../../../core/services/salary-advance'; 
import { EmployeeService } from '../../../../core/services/employee'; // AJOUT: import du service employé
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajoutsalary',
  standalone: true, // Recommandé si tu es en Angular moderne
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './ajoutsalary.html',
  styleUrl: './ajoutsalary.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ajoutsalary implements OnInit {
  advanceForm!: FormGroup;
  employeeSalary: number = 0;

  // AJOUT: contrôle l'affichage du message d'erreur (activé au blur)
  showAmountError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _salaryService: SalaryAdvanceService,
    private _employeeService: EmployeeService, // AJOUT: injection du service employé
    private router: Router,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadEmployeeSalary();
  }

  initForm(): void {
    this.advanceForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      repaymentMonth: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Force Angular à vérifier les changements en direct pendant la saisie
    this.advanceForm.get('amount')?.valueChanges.subscribe(() => {
      this._cdr.markForCheck();
    });
  }

  loadEmployeeSalary(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      // AJOUT: appel à getMyProfile() au lieu de getEmployeeById() — évite le 403 pour un EMPLOYEE
      this._employeeService.getMyProfile().subscribe({
        next: (res: any) => {
          const employeeData = res.data || res;
          this.employeeSalary = Number(employeeData.salary) || 0;
          this._cdr.markForCheck();
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du salaire :', err);
          this.employeeSalary = 0;
          this._cdr.markForCheck();
        }
      });
    }
  }
  // Ton getter est très bien, on s'assure juste que tout est traité en Number
  get amountExceedsSalary(): boolean {
  const amount = this.advanceForm?.get('amount')?.value;
  // Si l'input est vide ou que le salaire n'est pas chargé, on n'affiche rien
  if (!amount || this.employeeSalary <= 0) return false;
  
  return Number(amount) > this.employeeSalary;
}

  // AJOUT: déclenché quand l'utilisateur quitte le champ (clic ailleurs)
  onAmountBlur(): void {
    this.showAmountError = true;
    this._cdr.markForCheck();
  }

  onSubmit(): void {
    if (this.advanceForm.invalid) return;

    // Blocage de sécurité si le montant dépasse le salaire
    if (this.amountExceedsSalary) {
      Swal.fire({
        icon: 'warning',
        title: 'Montant trop élevé',
        text: `Le montant demandé dépasse votre salaire (${this.employeeSalary} €).`,
        confirmButtonColor: '#2563eb'
      });
      return;
    }

    const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
    const bgColor = isDark ? '#1e293b' : '#ffffff';
    const textColor = isDark ? '#f8fafc' : '#0f172a';

    this._salaryService.requestAdvance(this.advanceForm.value).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Demande créée !',
          text: 'Votre demande d\'avance a bien été enregistrée.',
          confirmButtonColor: '#2563eb',
          background: bgColor,
          color: textColor
        });
        this.router.navigate(['/home/salaryAdvances']);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de soumettre la demande.',
          confirmButtonColor: '#ef4444',
          background: bgColor,
          color: textColor
        });
      }
    });
  }
}