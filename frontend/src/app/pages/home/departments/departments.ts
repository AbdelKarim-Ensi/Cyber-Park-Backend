import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DepartmentService } from '../../../core/services/department';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './departments.html',
  styleUrl: './departments.css'
})
export class DepartmentsComponent implements OnInit {
  departments: any[] = [];
  userRole: string = '';

  constructor(
    private _department: DepartmentService,
    private _router: Router,
    private _cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
    const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const userObj = JSON.parse(storedUser);
    this.userRole = userObj.role || 'vide'; // ou userObj.role.name selon votre structure
  }
    console.log("Rôle de l'utilisateur :", this.userRole);
  }
  isAdmin(): boolean {
    return this.userRole === 'ADMIN' || this.userRole === 'Admin' || this.userRole === 'admin';
  }

  // 🔄 Charger les départements depuis la base de données
  loadDepartments(): void {
    this._department.getDepartments().subscribe({
      next: (res: any) => {
        // Ton backend renvoie la structure : { success: true, count: X, data: [...] }
        this.departments = res.data || res;
        console.log("Départements mis à jour :", this.departments);
        this._cdr.detectChanges(); // Forcer la détection de changement pour mettre à jour l'affichage
      },
      error: (err) => console.error("Erreur de chargement des départements :", err)
    });
  }

  editDept(id: string): void {
    this._router.navigate([`/home/departments/update/${id}`]);
  }

  // 🗑️ Lié au bouton de suppression (Poubelle)
  // 🔘 FONCTION : Vérifie si le thème actuel est sombre (si tu ne l'as pas encore ajoutée ici)
  get isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark') || 
           document.body.classList.contains('dark') || 
           document.body.classList.contains('dark-theme');
  }

  deleteDept(id: string): void {
    // 💡 On récupère l'état du thème
    const isDark = this.isDarkMode;

    // Définition des couleurs exactes selon le thème
    const bgColor = isDark ? '#161b26' : '#ffffff';
    const textColor = isDark ? '#ffffff' : '#0f172a';
    const cancelBtnBg = isDark ? '#232d3f' : '#e2e8f0'; 
    const cancelBtnText = isDark ? '#ffffff' : '#0f172a'; 

    Swal.fire({
      title: 'Confirmer la suppression',
      text: "Cette action est irréversible. Voulez-vous vraiment supprimer ce département ?",
      icon: 'warning',
      showCancelButton: true,
      
      // 🎨 Couleurs dynamiques (plus de couleurs en dur)
      background: bgColor,
      color: textColor,
      confirmButtonColor: '#ff4d4d',
      cancelButtonColor: cancelBtnBg,
      
      confirmButtonText: 'Supprimer',
      // Astuce pour forcer la visibilité du texte du bouton Annuler
      cancelButtonText: `<span style="color: ${cancelBtnText}; font-weight: 500;">Annuler</span>`,
      
    }).then((result) => {
      if (result.isConfirmed) {
        this._department.deleteDepartment(id).subscribe({
          next: (res: any) => {
            // 🎨 Popup de succès dynamique
            Swal.fire({
              title: 'Supprimé !',
              text: res.message || 'Le département a été retiré.',
              icon: 'success',
              background: bgColor,
              color: textColor,
              confirmButtonColor: '#3b82f6'
            });
            
            // On rafraîchit la liste avec le backend
            this.loadDepartments(); 
          },
          error: (err: any) => {
            // 🎨 Popup d'erreur dynamique
            Swal.fire({
              title: 'Impossible de supprimer',
              text: err.error?.message || "Une erreur est survenue.",
              icon: 'error',
              background: bgColor,
              color: textColor,
              confirmButtonColor: '#ff4d4d' // Bouton rouge pour l'erreur
            });
          }
        });
      }
    });
  }

  // 👤 Petite méthode bonus pour générer les initiales de l'avatar (ex: Sophie Martin -> SM)
  getInitials(manager: any): string {
    if (!manager || !manager.firstName || !manager.lastName) return '??';
    return (manager.firstName.charAt(0) + manager.lastName.charAt(0)).toUpperCase();
  }
}