import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee';
import { SweetAlertService } from '../../../core/sweet-alert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees',
  standalone: true,
  templateUrl: './employees.html',
  styleUrls: ['./employees.css'],
  imports: [FormsModule]
})
export class EmployeesComponent implements OnInit {
  
  employees: any[] = []; // Source brute d'origine
  
  // 🔘 Variables ajoutées exclusivement pour le fonctionnement des filtres
  filteredEmployees: any[] = [];   
  departmentsList: string[] = [];  
  searchQuery: string = '';        
  selectedDepartment: string = ''; 

  constructor(
    private _employeeService: EmployeeService,
    private _alertService: SweetAlertService,
    private _router: Router,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this._cdr.detectChanges()
  }

  loadEmployees(): void {
    this._employeeService.getEmployees().subscribe({
      next: (response: any) => {

        let dataArray: any[] = [];

        if (Array.isArray(response)) {
          dataArray = response;
        } else if (response && Array.isArray(response.data)) {
          dataArray = response.data;
        } else if (response && response.data && Array.isArray(response.data.data)) {
          dataArray = response.data.data; 
        } else if (response && Array.isArray(response.employees)) {
          dataArray = response.employees; 
        }

        if (dataArray.length === 0) {
          console.warn('⚠️ Le tableau est vide !');
        }

        this.employees = dataArray.map(emp => {
          let resolvedName = 'Employé Anonyme';
          if (emp.name) {
            resolvedName = emp.name;
          } else if (emp.firstName || emp.lastName) {
            resolvedName = `${emp.firstName || ''} ${emp.lastName || ''}`.trim();
          }

          return {
            id: emp._id || emp.id || 'N/A',
            name: resolvedName,
            email: emp.email || 'Pas d\'adresse email',
            role: emp.role || 'EMPLOYEE',
            department: emp.departmentId
              ? (typeof emp.departmentId === 'object' ? emp.departmentId?.name || 'Général' : emp.departmentId)
              : (emp.department || 'Non assigné'),
            date: emp.joinDate
              ? new Date(emp.joinDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
              : 'N/A',
            status: emp.status || 'INACTIVE'
          };
        });

        this.extractDepartments(); 
        this.applyFilters();       
        
        this._cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('❌ Erreur HTTP lors du chargement :', err);
        this._alertService.error({
          title: 'Erreur',
          message: 'Impossible de charger la liste des employés.'
        });
      }
    });
  }

  extractDepartments(): void {
    const rawDepts = this.employees
      .map(emp => emp.department)
      .filter(dept => dept && dept.trim() !== '' && dept !== 'Non assigné');
    
    this.departmentsList = Array.from(new Set(rawDepts));
  }

  // 🔘 Application des filtres de recherche sans recharger la page
  applyFilters(): void {
    const query = this.searchQuery.toLowerCase().trim();

    this.filteredEmployees = this.employees.filter(emp => {
      const matchesSearch = !query || 
        (emp.name && emp.name.toLowerCase().includes(query)) ||
        (emp.email && emp.email.toLowerCase().includes(query)) ||
        (emp.role && emp.role.toLowerCase().includes(query));

      const matchesDept = !this.selectedDepartment || 
        (emp.department && emp.department.toLowerCase() === this.selectedDepartment.toLowerCase());

      return matchesSearch && matchesDept;
    });
  }

  // 🚫 Tes fonctionnalités d'origine (Strictement inchangées)
  addEmployee(): void {
    this._router.navigate(['/home/employees/ajout']);
  }

  editUser(id: string): void {
    if (id !== 'N/A') {
      this._router.navigate([`/home/employees/update/${id}`]);
    } else {
      this._alertService.toast({ icon: 'error', title: 'Erreur', message: 'ID invalide' });
    }
  }

  // 🔘 NOUVELLE FONCTION : Vérifie si le thème actuel est sombre
  get isDarkMode(): boolean {
    // Adapte 'dark' si tu utilises un autre nom de classe pour ton thème
    return document.documentElement.classList.contains('dark') || 
           document.body.classList.contains('dark') || 
           document.body.classList.contains('dark-theme');
  }

  deleteUser(id: string): void {
    // 💡 TON IDÉE : On récupère l'état du thème
    const isDark = this.isDarkMode;

    // Définition des couleurs exactes selon le thème (Figma)
    const bgColor = isDark ? '#161b26' : '#ffffff';
    const textColor = isDark ? '#ffffff' : '#0f172a';
    const cancelBtnBg = isDark ? '#232d3f' : '#e2e8f0'; // Gris foncé vs Gris clair
    const cancelBtnText = isDark ? '#ffffff' : '#0f172a'; 

    Swal.fire({
      title: 'Confirmer la suppression',
      text: "Cette action est irréversible. Voulez-vous vraiment supprimer cet employé ?",
      icon: 'warning',
      showCancelButton: true,
      
      // 🎨 Application de TES couleurs dynamiques
      background: bgColor,
      color: textColor,
      confirmButtonColor: '#ef4444', // Rouge de suppression
      cancelButtonColor: cancelBtnBg,
      
      confirmButtonText: 'Supprimer',
      // Petite astuce HTML pour forcer la couleur du texte du bouton annuler
      cancelButtonText: `<span style="color: ${cancelBtnText}; font-weight: 500;">Annuler</span>`,
      
    }).then((result) => {
      if (result.isConfirmed) {
        this._employeeService.deleteEmployee(id).subscribe({
          next: () => {
            this.employees = this.employees.filter(emp => emp.id !== id);
            this.applyFilters();
            
            // 🎨 On utilise un Swal.fire direct pour forcer l'alerte de succès au bon thème
            Swal.fire({
              title: 'Succès',
              text: 'Employé supprimé avec succès.',
              icon: 'success',
              background: bgColor,
              color: textColor,
              confirmButtonColor: '#2563eb' // Bleu principal
            });
            this._cdr.detectChanges()
          },
          error: (err: any) => {
            console.error('❌ Erreur suppression :', err);
            
            // Alerte d'erreur avec le bon thème
            Swal.fire({
              title: 'Erreur',
              text: 'Impossible de supprimer cet employé.',
              icon: 'error',
              background: bgColor,
              color: textColor,
              confirmButtonColor: '#ef4444'
            });
          }
        });
      }
    });
  }
}