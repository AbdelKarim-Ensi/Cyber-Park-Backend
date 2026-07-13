import { Injectable } from '@angular/core';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  Auth 
} from 'firebase/auth';
import { firebaseApp } from './firebase-config';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private auth: Auth = getAuth(firebaseApp);
  private provider = new GoogleAuthProvider();

  // Plus besoin de getRedirectResultToken ni de verrous asynchrones complexes
  async signInWithGooglePopup(): Promise<string | null> {
    try {
      console.log("Ouverture de la popup Google Sign-In...");
      const result = await signInWithPopup(this.auth, this.provider);
      
      if (result?.user) {
        return await result.user.getIdToken();
      }
      return null;
    } catch (error) {
      console.error("Erreur lors de la connexion via Popup :", error);
      throw error;
    }
  }
}