import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AttendanceService } from '../../../core/services/attendance';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink, FormsModule],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css'
})
export class Attendance implements OnInit {
  private _attendance = inject(AttendanceService);
  private router = inject(Router);
  private _cdr = inject(ChangeDetectorRef);

  // Tableaux de données pour le rendu HTML
  attendancesList: any[] = [];
  attendances: any[] = []; 
  
  // Modèles de filtres liés à l'HTML
  searchTerm: string = '';
  filterDate: string = '';
  filterStatus: string = 'ALL';

  userRole: string = '';

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const userObj = JSON.parse(storedUser);
    this.userRole = userObj.role || 'vide'; // ou userObj.role.name selon votre structure
  }
    console.log("Rôle de l'utilisateur :", this.userRole);
  
 
    this.loadAttendances();
  }
   isAdmin(): boolean {
    return this.userRole === 'ADMIN' || this.userRole === 'Admin' || this.userRole === 'admin';
  }

  loadAttendances(): void {
    // 1️⃣ TENTATIVE EN MODE ADMIN (Charger tout le monde)
    this._attendance.getAllAttendances().subscribe({
      next: (res: any) => {
        console.log("Connexion réussie en mode ADMIN :", res);
        this.userRole = 'ADMIN';
        this.processResponse(res);
      },
      error: (err) => {
        // 2️⃣ CAS EMPLOYÉ (Si l'API bloque l'accès général, on bascule sur ses propres données)
        console.warn("Accès global refusé (403). Bascule automatique en mode EMPLOYÉ...");
        this.userRole = 'EMPLOYEE'; // Confirmation du rôle Employé

        this._attendance.getMyAttendance().subscribe({
          next: (res: any) => {
            console.log("Connexion réussie en mode EMPLOYÉ :", res);
            this.processResponse(res);
          },
          error: (employeeErr) => {
            console.error("Erreur critique lors de la récupération des données :", employeeErr);
          }
        });
      }
    });
  }

  // 🛠️ CENTRALISATION ET TRAITEMENT DES DONNÉES (Votre astuce + correctif d'affichage)
  private processResponse(res: any): void {
    // 🔥 VOTRE ASTUCE D'ORIGINE CONSERVÉE À 100%
    const rawData = res?.data ? res.data : res;

    // Mise en tableau stricte
    let finalArray = Array.isArray(rawData) ? rawData : (rawData ? [rawData] : []);

    // Sécurité employeeId : Convertit les chaînes ID brutes en objet pour éviter l'écran blanc
    finalArray = finalArray.map(record => {
      if (record && typeof record.employeeId === 'string') {
        record.employeeId = {
          _id: record.employeeId,
          firstName: 'Employé',
          lastName: `#${record.employeeId.substring(record.employeeId.length - 4)}`,
          role: record.status || 'EMPLOYEE'
        };
      }
      return record;
    });

    // Remplissage de toutes les variables possibles pour satisfaire le template HTML
    this.attendancesList = finalArray;
    this.attendances = finalArray;

    this._cdr.detectChanges();
  }

  // 🎯 GETTER DE FILTRAGE ASSURÉ
  get filteredAttendances(): any[] {
    const listToFilter = this.attendancesList || [];
    
    return listToFilter.filter(record => {
      if (!record) return false;

      // Recherche Textuelle globale
      let employeeInfo = '';
      if (record.employeeId) {
        if (typeof record.employeeId === 'object') {
          employeeInfo = `${record.employeeId.firstName || ''} ${record.employeeId.lastName || ''} ${record.employeeId.role || ''}`;
        } else {
          employeeInfo = String(record.employeeId);
        }
      }

      const matchesSearch = !this.searchTerm.trim() ? true :
        employeeInfo.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Filtrage par Statut
      const matchesStatus = (!this.filterStatus || this.filterStatus === 'ALL') ? true : 
        String(record.status).toUpperCase() === String(this.filterStatus).toUpperCase();

      // Filtrage par Date
      let matchesDate = true;
      if (this.filterDate && record.date) {
        try {
          const recordDateStr = new Date(record.date).toISOString().split('T')[0];
          matchesDate = recordDateStr === this.filterDate;
        } catch (e) {
          matchesDate = true;
        }
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }

  getInitials(employee: any): string {
    if (!employee) return '👤';
    if (typeof employee === 'string') return '👤';
    const first = employee.firstName ? employee.firstName.charAt(0).toUpperCase() : '';
    const last = employee.lastName ? employee.lastName.charAt(0).toUpperCase() : '';
    return first + last || '👤';
  }

  get isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
  }

  viewNote(note: string): void {
    const isDark = this.isDarkMode;
    Swal.fire({
      title: 'Note / Justification',
      text: note || 'Aucune note fournie pour ce pointage.',
      icon: 'info',
      confirmButtonColor: '#3b82f6',
      background: isDark ? '#161b26' : '#ffffff',
      color: isDark ? '#ffffff' : '#0f172a'
    });
  }

  onEdit(id: string): void {
    if (this. userRole === 'ADMIN') {
      this.router.navigate(['/home/attendance/update', id]);
    } else {
      Swal.fire('Accès refusé', 'Seul un administrateur peut modifier un pointage.', 'error');
    }
  }
}