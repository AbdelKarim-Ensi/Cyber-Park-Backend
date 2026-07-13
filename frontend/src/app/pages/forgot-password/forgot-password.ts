import { Component,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {
  forgotForm: FormGroup;
  isDarkMode: boolean = true;
  isLoading: boolean = false;
  isSubmitted: boolean = false;
  submittedEmail: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private _auth: Auth,private _cdr:ChangeDetectorRef) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  onSubmit(): void {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    const { email } = this.forgotForm.value;
    this.isLoading = true;
    this.errorMessage = '';

    this._auth.forgotPassword(email).subscribe({
      next: () => {
        this.isLoading = false;
        this.submittedEmail = email;
        this.isSubmitted = true;
        this._cdr.detectChanges(); // Force Angular to check for changes
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Une erreur est survenue. Réessayez plus tard.';
        this._cdr.detectChanges(); // Force Angular to check for changes
      }
    });
  }

  resendLink(): void {
    this.isSubmitted = false;
    this.forgotForm.reset();
  }
}