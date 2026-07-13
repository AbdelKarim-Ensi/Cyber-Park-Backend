import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notfound.html',
  styleUrl: './notfound.css'
})
export class Notfound {
  private router = inject(Router);
  searchQuery: string = '';

  // Navigation dynamique au clic sur les cartes d'accès rapide
  goToRoute(route: string): void {
    this.router.navigate([route]);
  }

  // Soumission du formulaire de recherche intégrée à l'EMS
  onSearch(): void {
  if (this.searchQuery.trim()) {
    // Redirige vers votre page de recherche globale (ex: /home/search?q=conges)
    this.router.navigate(['/home/search'], { 
      queryParams: { q: this.searchQuery.trim() } 
    });
  }
}

  // Méthode de secours pour signaler un incident technique
  reportIssue(): void {
    console.log('Signalement de l\'anomalie 404 consigné dans les logs.');
    // Intégrez ici l'ouverture d'un modal, un toaster Swal, ou un service d'envoi de ticket.
  }
}