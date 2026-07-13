import { Component, Input, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DepartmentService } from '../../../../core/services/department';
import { EmployeeService } from '../../../../core/services/employee';

interface Employee {
  id: string; 
  fullName: string;
  role: string;
}

interface Department {
  id?: string;
  name: string;
  description: string;
  managerId: string | null;
  membres?: string[];
}

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ajoute-department.html',
  styleUrls: ['./ajoute-department.css'],
})
export class DepartmentFormComponent implements OnInit {
  @Input() department: Department | null = null;

  departmentForm!: FormGroup;
  isEditMode = false;
  
  employees: Employee[] = [];
  isMembersDropdownOpen = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private _department: DepartmentService,
    private _employee: EmployeeService
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.department;

    this.departmentForm = this.fb.group({
      name: [this.department?.name || '', Validators.required],
      description: [this.department?.description || ''],
      managerId: [this.department?.managerId || ''],
      membres: [this.department?.membres || []]
    });

    this._employee.getEmployees().subscribe({
      next: (res: any) => {
        let dataArray: any[] = [];
        
        if (Array.isArray(res)) dataArray = res;
        else if (res && Array.isArray(res.data)) dataArray = res.data;
        else if (res && res.data && Array.isArray(res.data.data)) dataArray = res.data.data;

        this.employees = dataArray.map(emp => ({
          id: emp._id || emp.id,
          fullName: `${emp.firstName || ''} ${emp.lastName || ''}`.trim() || 'Employé Anonyme',
          role: emp.role || 'Employé'
        }));
      },
      error: (err: any) => console.error("Impossible de charger les employés", err)
    });
  }

  toggleMembersDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.isMembersDropdownOpen = !this.isMembersDropdownOpen;
  }

  isEmployeeSelected(id: string): boolean {
    const currentSelection: string[] = this.departmentForm.get('membres')?.value || [];
    return currentSelection.includes(id);
  }

  toggleMemberSelection(id: string): void {
    const currentSelection: string[] = [...(this.departmentForm.get('membres')?.value || [])];
    const index = currentSelection.indexOf(id);

    if (index > -1) {
      currentSelection.splice(index, 1);
    } else {
      currentSelection.push(id);
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
  closeDropdown(_event: Event): void {
    this.isMembersDropdownOpen = false;
  }

  get isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark') ||
           document.body.classList.contains('dark') || 
           document.body.classList.contains('dark-theme');
  }

  onSubmit(): void {
    if (this.departmentForm.valid) {
      const formValues = this.departmentForm.value;
      const payload = {
        ...formValues,
        managerId: formValues.managerId ? formValues.managerId : null,
      };
      
      const isDark = this.isDarkMode;
      const bgColor = isDark ? '#161b26' : '#ffffff';
      const textColor = isDark ? '#ffffff' : '#0f172a';

      if (this.isEditMode) {
        // Logique de modification
      } else {
        this._department.createDepartment(payload).subscribe({
          next: (res:any) => {
            Swal.fire({
              icon: 'success',
              title: 'Succès !',
              text: 'Le département a été ajouté à la base de données.',
              confirmButtonText: 'OK',
              confirmButtonColor: '#2563eb',
              background: bgColor,
              color: textColor,
            }).then((result) => {
              if (result.isConfirmed) {
                this.departmentForm.reset();
                this.router.navigate(['/home/departments']); 
              }
            });
          },
          error: (err:any) => {
            console.error("❌ Erreur lors de la création :", err);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: "Impossible d'ajouter le département. Vérifiez votre connexion.",
              confirmButtonColor: '#ef4444',
              background: bgColor,
              color: textColor,
            });
          }
        });
      }
    } else {
      this.departmentForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/home/departments']);
  }
}