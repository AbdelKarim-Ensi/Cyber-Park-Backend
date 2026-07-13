import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ProjectService } from '../../../core/services/project';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css']
})
export class Projects implements OnInit {
  projects: any[] = [];
  filteredProjects: any[] = [];
  userRole: string = '';

  searchQuery: string = '';
  selectedStatus: string = '';

  statusConfig: Record<string, string> = {
    'PENDING': 'En attente',
    'IN_PROGRESS': 'En cours',
    'ON_HOLD': 'En pause',
    'COMPLETED': 'Terminé'
  };

  statusList = Object.keys(this.statusConfig);

  constructor(
    private _projectService: ProjectService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const userObj = JSON.parse(storedUser);
    this.userRole = userObj.role || 'vide'; // ou userObj.role.name selon votre structure
  }
    console.log("Rôle de l'utilisateur :", this.userRole);
  
  
    this.loadProjects();
  }
  isAdmin(): boolean {
    return this.userRole === 'ADMIN' || this.userRole === 'Admin' || this.userRole === 'admin';
  }

  loadProjects(): void {
    this._projectService.getProjects().subscribe({
      next: (res: any) => {
        const rawProjects = res.data || res;
        this.projects = Array.isArray(rawProjects)
          ? rawProjects.map((proj: any) => ({ 
              ...proj, 
              id: proj.id || proj._id 
            }))
          : [];
        
        this.filteredProjects = [...this.projects];
        this._cdr.detectChanges(); 
      },
      error: (err) => console.error("❌ Erreur :", err)
    });
  }

  applyFilters(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredProjects = this.projects.filter(project => {
      const matchesSearch = 
        project.name?.toLowerCase().includes(query) || 
        project.description?.toLowerCase().includes(query);
      
      const matchesStatus = this.selectedStatus 
        ? project.status === this.selectedStatus 
        : true;

      return matchesSearch && matchesStatus;
    });
  }

  // 🎯 NOUVELLE FONCTION : Calcule les initiales (ex: MD pour Marie Dupont)
  getInitials(emp: any): string {
    if (!emp) return '👤';
    
    // Si le backend n'a pas fait le ".populate()" et renvoie juste une suite de chiffres/lettres (l'ID MongoDB)
    if (typeof emp === 'string') return '👤'; 
    
    // Si on a bien l'employé avec son prénom et nom
    const first = emp.firstName ? emp.firstName.charAt(0).toUpperCase() : '';
    const last = emp.lastName ? emp.lastName.charAt(0).toUpperCase() : '';
    
    if (first || last) return first + last;
    
    // Sécurité de secours si l'objet a juste un champ "name"
    if (emp.name) return emp.name.substring(0, 2).toUpperCase();
    
    return '👤';
  }

  deleteProject(id: string): void {
    const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
    const bgColor   = isDark ? '#161b26' : '#ffffff';
    const textColor = isDark ? '#ffffff' : '#0f172a';

    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'La suppression de ce projet est définitive.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      background: bgColor,
      color: textColor
    }).then((result) => {
      if (result.isConfirmed) {
        this._projectService.deleteProject(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success', title: 'Supprimé !', text: 'Le projet a été retiré.',
              confirmButtonColor: '#2563eb', background: bgColor, color: textColor
            });
            this.loadProjects();
          },
          error: () => {
            Swal.fire({
              icon: 'error', title: 'Erreur', text: 'Impossible de supprimer ce projet.',
              confirmButtonColor: '#ef4444', background: bgColor, color: textColor
            });
          }
        });
      }
    });
  }
}