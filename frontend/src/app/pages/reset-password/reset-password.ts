import { Component, OnInit, inject,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword implements OnInit {
  private fb = inject(FormBuilder);
  private _auth = inject(Auth);
  private _route = inject(ActivatedRoute);
  private _cdr=inject(ChangeDetectorRef);  
  resetForm: FormGroup;
  isDarkMode: boolean = true;
  isLoading: boolean = false;
  isSubmitted: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  errorMessage: string = '';

  // Gestion du cas token invalide/expiré
  isTokenInvalid: boolean = false;

  private token: string = '';

  constructor() {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.token = this._route.snapshot.paramMap.get('token') || '';
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    if (!this.token) {
      this.isTokenInvalid = true;
      this._cdr.detectChanges()
      return;
    }

    const { newPassword } = this.resetForm.value;
    this.isLoading = true;
    this.errorMessage = '';
    this.isTokenInvalid = false;

    this._auth.resetPassword(this.token, newPassword).subscribe({
      next: () => {
        this.isLoading = false;
        this.isSubmitted = true;
        this._cdr.detectChanges(); // Force Angular to check for changes
      },
      error: (err: any) => {
        this.isLoading = false;
        const message = err.error?.message || 'Une erreur est survenue. Réessayez plus tard.';
        this.errorMessage = message;
        
        // Le backend renvoie ce message précis quand le token est invalide/expiré
        if (message.toLowerCase().includes('invalide') || message.toLowerCase().includes('expiré')) {
          this.isTokenInvalid = true;
        }
        this._cdr.detectChanges(); // Force Angular to check for changes
      }
    });
  }

  resetAnotherAccount(): void {
    this.isSubmitted = false;
    this.isTokenInvalid = false;
    this.resetForm.reset();
    this._cdr.detectChanges()
  }
}