// AJOUT : configuration Firebase du projet cyber-park-hr
import { initializeApp } from 'firebase/app';

export const firebaseConfig = {
  apiKey: "AIzaSyBRqxtNyw4CQuowA3ZtTFrR9SmFCF9G4dc",
  authDomain: "cyber-park-hr.firebaseapp.com",
  projectId: "cyber-park-hr",
  storageBucket: "cyber-park-hr.firebasestorage.app",
  messagingSenderId: "309446542514",
  appId: "1:309446542514:web:aa19d33925d335ee5a75ab",
  measurementId: "G-S7TNPKFFVC"
};

export const firebaseApp = initializeApp(firebaseConfig);