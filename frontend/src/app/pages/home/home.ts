import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Profil } from '../../core/services/profil'; // ⚠️ adapte le chemin selon ton arborescence réelle
import { ChatbotPage } from './chatbot/chatbot'; // AJOUT : widget chatbot RH

import {
  LucideAngularModule,
  LayoutDashboard, Users, User, Network, Folder, Clock, Calendar, DollarSign, Megaphone, 
  LogOut, Sun, Moon,
  Menu // AJOUT: icône hamburger
} from 'lucide-angular';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, LucideAngularModule, ChatbotPage], // AJOUT : ChatbotPage
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  private profilService = inject(Profil);
  isDarkMode: boolean = true;
  isSidebarCollapsed: boolean = false; 
  currentTitle: string = 'Dashboard';

  // ✅ Données utilisateur affichées dans le header
  userFirstName: string = 'Admin';
  userAvatar: string | null = null;
  userRole: string = ''; // 👈 AJOUT : Déclaration de la variable pour stocker le rôle

  readonly LayoutDashboard = LayoutDashboard;
  readonly Users = Users;
  readonly Network = Network;
  readonly Folder = Folder;
  readonly Clock = Clock;
  readonly Calendar = Calendar;
  readonly DollarSign = DollarSign;
  readonly Megaphone = Megaphone;
  readonly LogOut = LogOut;
  readonly Sun = Sun;
  readonly Moon = Moon;
  readonly User = User;
  readonly Menu = Menu;

  constructor(private router: Router, private _cdr: ChangeDetectorRef) {
    this.applyTheme();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateTitle();
    });
  }

  ngOnInit(): void {
    this.loadUserHeaderData();

    this.profilService.userUpdated$.subscribe(() => {
      this.loadUserHeaderData();
    });
  }

  // ✅ Récupère les infos du profil pour les afficher dans le header et gérer l'accès Admin
  private loadUserHeaderData(): void {
    this.profilService.getProfil().subscribe({
      next: (response: any) => {
        if (response && response.data) {
          const user = response.data;
          this.userFirstName = user.firstName || 'Admin';

          // 👈 AJOUT : Récupération du rôle depuis les données renvoyées par votre API
          // (Vérifiez si la clé s'appelle bien 'role' dans votre réponse backend, par exemple user.role)
          this.userRole = user.role || ''; 

          if (user.avatar && user.avatar !== 'default-avatar.png') {
            this.userAvatar = `${environment.apiUrl}/uploads/avatars/${user.avatar}`;
          } else {
            this.userAvatar = null;
          }
        }
        this._cdr.detectChanges();
      },
      error: (err) => console.error('Erreur de chargement du header utilisateur', err)
    });
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  private applyTheme(): void {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  private updateTitle(): void {
    const url = this.router.url;
    if (url.includes('dashboard')) this.currentTitle = 'Dashboard';
    else if (url.includes('employees')) this.currentTitle = 'Gestion des Employés';
    else if (url.includes('departments')) this.currentTitle = 'Départements';
    else if (url.includes('projects')) this.currentTitle = 'Suivi des Projets';
    else if (url.includes('attendance')) this.currentTitle = 'Registre de Présences';
    else if (url.includes('leaves')) this.currentTitle = 'Gestion des Congés';
    else if (url.includes('salaryAdvances')) this.currentTitle = 'Avances et Salaires';
    else if (url.includes('announcements')) this.currentTitle = "Annonces d'Entreprise";
    else if (url.includes('profil')) this.currentTitle = "Profil";
    
    this._cdr.detectChanges();
  }
}