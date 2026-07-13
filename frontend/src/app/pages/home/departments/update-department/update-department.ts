import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DepartmentService } from '../../../../core/services/department';
import { EmployeeService } from '../../../../core/services/employee';

interface Employee {
  id: string;
  fullName: string;
  role: string;
}

@Component({
  selector: 'app-update-department',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-department.html',
  styleUrls: ['./update-department.css'],
})
export class UpdateDepartment implements OnInit {
  departmentForm: FormGroup;
  id: string = '';
  employees: Employee[] = [];
  isMembersDropdownOpen = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _act: ActivatedRoute,
    private _department: DepartmentService,
    private _employee: EmployeeService
  ) {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      managerId: [''],
      membres: [[]]
    });
  }

  ngOnInit(): void {
    this.id = this._act.snapshot.paramMap.get('id') || '';

    // forkJoin garantit que les DEUX appels sont terminés avant de
    // toucher au formulaire. Avant, les deux subscribe() étaient indépendants
    // et l'ordre d'arrivée des réponses réseau n'était pas garanti.
    const employees$ = this._employee.getEmployees().pipe(
      catchError((err) => {
        console.error('Impossible de charger les employés', err);
        return of(null);
      })
    );

    const department$ = this.id
      ? this._department.getDepartmentById(this.id).pipe(
          catchError((err) => {
            console.error('Erreur lors du chargement du département :', err);
            return of(null);
          })
        )
      : of(null);

    forkJoin({ employees: employees$, department: department$ }).subscribe(({ employees: empRes, department: deptRes }) => {
      // 1) Construire la liste des employés
      let dataArray: any[] = [];
      if (Array.isArray(empRes)) dataArray = empRes;
      else if (empRes && Array.isArray((empRes as any).data)) dataArray = (empRes as any).data;
      else if (empRes && (empRes as any).data && Array.isArray((empRes as any).data.data)) dataArray = (empRes as any).data.data;

      this.employees = dataArray.map(emp => ({
        // String(...) force TOUJOURS une comparaison de type identique
        // avec les IDs stockés dans le département (évite ObjectId vs string).
        id: String(emp._id || emp.id),
        fullName: `${emp.firstName || ''} ${emp.lastName || ''}`.trim() || 'Employé Anonyme',
        role: emp.role || 'Employé'
      }));

      // 2) Patcher le formulaire avec les données du département (si édition)
      if (deptRes) {
        let dep: any = deptRes;
        if (dep && dep.data) {
          dep = Array.isArray(dep.data) ? dep.data[0] : dep.data;
        }

        if (dep) {
          console.log('📦 [AJOUT] Objet département brut reçu du backend :', dep); // AJOUT : log de debug

          let managerValue = '';
          if (dep.managerId) {
            managerValue = String(dep.managerId._id ? dep.managerId._id : dep.managerId);
          }

          // 🎯 AJOUT : détection robuste du champ contenant les membres.
          // Le backend peut renvoyer "membres", "members", "team" ou "employees"
          // selon le endpoint / la version de l'API. On prend le premier tableau
          // non-vide trouvé parmi ces noms, sans casser le cas "membres" existant.
          const rawMembres =
            (Array.isArray(dep.membres) && dep.membres) ||
            (Array.isArray(dep.members) && dep.members) ||
            (Array.isArray(dep.team) && dep.team) ||
            (Array.isArray(dep.employees) && dep.employees) ||
            [];

          const membresValue: string[] = rawMembres.map((m: any) =>
            String(m && typeof m === 'object' ? (m._id || m.id) : m)
          );

          console.log('👥 [AJOUT] IDs des membres extraits :', membresValue); // AJOUT : log de debug
          console.log('👥 [AJOUT] IDs des employés disponibles :', this.employees.map(e => e.id)); // AJOUT : log de debug

          this.departmentForm.patchValue({
            name: dep.name || '',
            description: dep.description || '',
            managerId: managerValue,
            membres: membresValue
          });
        }
      }
    });
  }

  toggleMembersDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.isMembersDropdownOpen = !this.isMembersDropdownOpen;
  }

  isEmployeeSelected(id: string): boolean {
    const currentSelection: string[] = this.departmentForm.get('membres')?.value || [];
    // comparaison normalisée en String() des deux côtés
    return currentSelection.map(String).includes(String(id));
  }

  toggleMemberSelection(id: string): void {
    const normalizedId = String(id);
    const currentSelection: string[] = [...(this.departmentForm.get('membres')?.value || [])].map(String);
    const index = currentSelection.indexOf(normalizedId);

    if (index > -1) {
      currentSelection.splice(index, 1);
    } else {
      currentSelection.push(normalizedId);
    }

    this.departmentForm.patchValue({ membres: currentSelection });
  }

  getSelectedMembersText(): string {
    const count = (this.departmentForm.get('membres')?.value || []).length;
    if (count === 0) return 'Sélectionnez les membres';
    if (count === 1) return '1 membre sélectionné';
    return `${count} membres sélectionnés`;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event): void {
    this.isMembersDropdownOpen = false;
  }

  get isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark') ||
           document.body.classList.contains('dark') ||
           document.body.classList.contains('dark-theme');
  }

  onSubmit(): void {
    if (this.departmentForm.invalid) {
      this.departmentForm.markAllAsTouched();
      return;
    }

    const formValues = this.departmentForm.value;

    const payload = {
      name: formValues.name.trim(),
      description: formValues.description ? formValues.description.trim() : '',
      managerId: formValues.managerId ? formValues.managerId : null,
      membres: formValues.membres || []
    };
    const isDark = this.isDarkMode;
    const bgColor = isDark ? '#161b26' : '#ffffff';
    const textColor = isDark ? '#ffffff' : '#0f172a';

    this._department.updateDepartment(this.id, payload).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès !',
          text: 'Le département a été modifié avec succès.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#2563eb',
          background: bgColor,
          color: textColor,
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/home/departments']);
          }
        });
      },
      error: (err: any) => {
        console.error("❌ Erreur lors de la modification :", err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: "Impossible de modifier le département. Vérifiez votre connexion.",
          confirmButtonColor: '#ef4444',
          background: bgColor,
          color: textColor,
        }); 
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/home/departments']);
  }
}