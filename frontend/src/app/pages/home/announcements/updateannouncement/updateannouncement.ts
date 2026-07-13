import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AnnouncementService } from '../../../../core/services/announcement';// 👈 Ajustez le chemin si nécessaire

@Component({
  selector: 'app-update-announcement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './updateannouncement.html',
  styleUrl: './updateannouncement.css',
})
export class Updateannouncement implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private _announcement = inject(AnnouncementService);

  announcementForm: FormGroup;
  id: string = '';

  constructor() {
    // Initialisation du formulaire aligné avec les champs requis de votre Backend
    this.announcementForm = this.fb.group({
      title: ['', [Validators.required, ]],
      content: ['', Validators.required],
      target: ['INTERNAL_ALL', Validators.required],
      image: [''] // Champ URL image optionnel
    });
  }

  ngOnInit(): void {
    // 1. Récupération de l'identifiant de l'annonce depuis les paramètres de l'URL
    this.id = this.route.snapshot.params['id'];
    
    if (this.id) {
      this.fetchAnnouncementData();
    }
  }

  // Méthode pour aller chercher l'annonce existante et patcher le formulaire
  fetchAnnouncementData(): void {
    this._announcement.getAnnouncementsById(this.id).subscribe({
      next: (res: any) => {
        // En fonction de la structure de votre API (renvoyant res ou res.data)
        const announcementData = res.data ? res.data : res;

        if (announcementData) {
          this.announcementForm.patchValue({
            title: announcementData.title,
            content: announcementData.content,
            target: announcementData.target || 'INTERNAL_ALL',
            image: announcementData.image || ''
          });
          console.log("Formulaire d'annonce pré-rempli avec succès !");
        }
      },
      error: (err) => {
        console.error("Erreur lors du chargement de l'annonce :", err);
        
      }
    });
  }

  // Getter dynamique pour vérifier si l'application est en Dark Mode
  get isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
  }

  // Soumission des modifications au Backend
  onSubmit(): void {
    if (this.announcementForm.invalid) {
      this.announcementForm.markAllAsTouched();
      return;
    }

    const body = {
      title: this.announcementForm.value.title,
      content: this.announcementForm.value.content,
      target: this.announcementForm.value.target,
      image: this.announcementForm.value.image || null
    };

    const isDark = this.isDarkMode;
    const bgColor = isDark ? '#161b26' : '#ffffff';
    const textColor = isDark ? '#ffffff' : '#0f172a';

    console.log("Données envoyées pour mise à jour :", body);

    this._announcement.updateAnnouncements(this.id, body).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: "Succès !",
          text: "L'annonce a été mise à jour avec succès !",
          icon: "success",
          confirmButtonColor: '#3b82f6',
          background: bgColor,
          color: textColor
        }).then(() => {
          this.router.navigate(['/home/announcements']); // Redirection vers la grille des annonces
        });
      },
      error: (err) => {
        console.error("Erreur serveur lors de la mise à jour :", err);
        Swal.fire({
          title: "Erreur",
          text: "Une erreur est survenue lors de la modification.",
          icon: "error",
          confirmButtonColor: '#ef4444',
          background: bgColor,
          color: textColor
        });
      }
    });
  }

  // Petit utilitaire pour afficher des alertes discrètes au chargement
  private showToast(icon: 'success' | 'error', text: string) {
    const isDark = this.isDarkMode;
    Swal.fire({
      icon: icon,
      text: text,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      background: isDark ? '#161b26' : '#ffffff',
      color: isDark ? '#ffffff' : '#0f172a'
    });
  }
}