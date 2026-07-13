import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface StoredUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'ADMIN' | 'EMPLOYEE';
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);
  private url = environment.apiUrl + '/auth';

  login(email: string, password: string) {
    return this.http.post(this.url + '/login', { email, password });
  }

  loginWithGoogle(idToken: string) {
    return this.http.post(`${environment.apiUrl}/auth/google`, { idToken });
  }

  // ⚠️ SUPPRIMÉ : register() n'est plus utilisé côté EMS.
  // La création de compte se fait uniquement par un admin (voir EmployeeService.addEmployee).

  forgotPassword(email: string) {
    return this.http.post(this.url + '/forgot-password', { email });
  }

  resetPassword(token: string, password: string) {
    return this.http.post(this.url + '/reset-password/' + token, { password });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // AJOUT : helpers pour lire l'utilisateur stocké et son rôle (utilisés par les guards)
  saveUser(user: StoredUser): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): StoredUser | null {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as StoredUser;
    } catch {
      return null;
    }
  }

  getRole(): string | null {
    return this.getUser()?.role ?? null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}