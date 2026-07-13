import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../../core/services/auth';
import { GoogleAuthService } from '../../core/services/google-auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isDarkMode: boolean = true;
  isGoogleLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _auth: Auth,
    private _googleAuth: GoogleAuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  private get swalTheme() {
    return {
      background: this.isDarkMode ? '#0f172a' : '#ffffff',
      color: this.isDarkMode ? '#f8fafc' : '#0f172a'
    };
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this._auth.login(email, password).subscribe({
        next: (response: any) => {
          this._auth.saveToken(response.token);
          if (response.data) {
            this._auth.saveUser(response.data);
          }

          Swal.fire({
            title: 'Connexion réussie !',
            text: 'Bienvenue dans votre espace Cyber Park.',
            icon: 'success',
            iconColor: '#3b82f6',
            ...this.swalTheme,
            confirmButtonColor: '#2563eb',
            confirmButtonText: 'Accéder au Dashboard'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/home']);
            }
          });
        },
        error: (err: any) => {
          Swal.fire({
            title: 'Erreur de connexion !',
            text: err.error?.message || 'Email ou mot de passe incorrect. Veuillez réessayer.',
            icon: 'error',
            iconColor: '#ef4444',
            ...this.swalTheme,
            confirmButtonColor: '#2563eb',
            confirmButtonText: 'D’accord'
          });
        }
      });

    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  async onGoogleLogin(): Promise<void> {
    this.isGoogleLoading = true;

    try {
      const idToken = await this._googleAuth.signInWithGooglePopup();

      if (idToken) {
        this._auth.loginWithGoogle(idToken).subscribe({
          next: (response: any) => {
            this.isGoogleLoading = false;
            this._auth.saveToken(response.token);
            if (response.data) {
              this._auth.saveUser(response.data);
            }

            Swal.fire({
              title: 'Connexion réussie !',
              text: 'Bienvenue dans votre espace Cyber Park.',
              icon: 'success',
              iconColor: '#3b82f6',
              ...this.swalTheme,
              confirmButtonColor: '#2563eb',
              confirmButtonText: 'Accéder au Dashboard'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/home']);
              }
            });
          },
          error: (err: any) => {
            this.isGoogleLoading = false;
            Swal.fire({
              title: 'Erreur de connexion Google',
              text: err.error?.message || 'Une erreur est survenue. Réessayez.',
              icon: 'error',
              ...this.swalTheme,
              confirmButtonColor: '#2563eb'
            });
          }
        });
      } else {
        this.isGoogleLoading = false;
      }
    } catch (error) {
      this.isGoogleLoading = false;
      console.error('Erreur connexion Google Popup:', error);
      Swal.fire({
        title: 'Erreur de connexion Google',
        text: 'L’ouverture de la fenêtre d’authentification a échoué ou a été fermée.',
        icon: 'error',
        ...this.swalTheme,
        confirmButtonColor: '#2563eb'
      });
    }
  }
}