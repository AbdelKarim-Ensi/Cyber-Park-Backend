import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Profil {
  private http = inject(HttpClient);
  private url = environment.apiUrl + '/profil';

   userUpdated$ = new BehaviorSubject<void>(undefined);

  notifyUserUpdated(): void {
    this.userUpdated$.next();
  }
  // 📥 Récupérer les données depuis MongoDB
  getProfil(): Observable<any> {
    return this.http.get<any>(`${this.url}/getprofil`);
  }

  // ✏️ Mettre à jour les informations textuelles
  updateProfil(data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/updateProfile`, data);
  }

  // 🔒 Modifier le mot de passe
  updatePassword(data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/updatePassword`, data);
  }

  // 📸 Téléverser l'avatar (Correction : POST + envoi du formData)
  updateAvatar(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('avatar', file); // 'avatar' doit correspondre à upload.single('avatar') du backend
    return this.http.post<any>(`${this.url}/avatar`, formData);
  }
}