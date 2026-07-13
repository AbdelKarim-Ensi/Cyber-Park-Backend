import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../../../core/services/employee';
import { ProjectService } from '../../../../core/services/project';

interface Employee {
  id: string; 
  fullName: string;
  role: string;
}

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ajoutproject.html',
  styleUrls: ['./ajoutproject.css'],
})
export class Ajoutproject implements OnInit {
  projectForm: FormGroup;
  employees: Employee[] = [];

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private _employee: EmployeeService,
    private _project: ProjectService,
    private _cdr:ChangeDetectorRef
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      assignedEmployees: [[]], // Géré via nos checkboxes custom
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._employee.getEmployees().subscribe({
      next: (res: any) => {
        let dataArray = Array.isArray(res) ? res : (res?.data?.data || res?.data || []);
        this.employees = dataArray.map((emp: any) => ({
          id: emp._id || emp.id,
          fullName: `${emp.firstName || ''} ${emp.lastName || ''}`.trim() || 'Employé',
          role: emp.role || 'Membre de l\'équipe'
        }));
        this._cdr.detectChanges()
      },
      error: (err: any) => console.error("Erreur chargement employés", err)
    });
  }

  // --- GESTION DE LA SÉLECTION D'ÉQUIPE ---
  get assignedEmployees(): string[] {
    return this.projectForm.get('assignedEmployees')?.value || [];
  }
   get isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
  }


  toggleEmployee(id: string): void {
    const current = this.assignedEmployees;
    if (current.includes(id)) {
      this.projectForm.patchValue({ assignedEmployees: current.filter(x => x !== id) });
    } else {
      this.projectForm.patchValue({ assignedEmployees: [...current, id] });
    }
  }

  isEmployeeSelected(id: string): boolean {
    return this.assignedEmployees.includes(id);
  }

  getInitials(name: string): string {
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase() || '??';
  }

  // --- SOUMISSION ---
  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }
      console.log('🔍 Form value:', this.projectForm.value);
    const payload = {
      ...this.projectForm.value,
      name: this.projectForm.value.name.trim(),
      description: this.projectForm.value.description.trim(),
    };
    console.log('📦 Payload envoyé:', payload);

    const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
    const bgColor = isDark ? '#161b26' : '#ffffff'; 
    const textColor = isDark ? '#ffffff' : '#0f172a';

    this._project.createProject(payload).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success', title: 'Projet créé !', text: 'Le nouveau projet a été ajouté avec succès.',
          confirmButtonColor: '#2563eb', background: bgColor, color: textColor,
        }).then(() => this.router.navigate(['/home/projects']));
      },
      error: () => {
        Swal.fire({
          icon: 'error', title: 'Erreur', text: "Impossible d'ajouter le projet.",
          confirmButtonColor: '#ef4444', background: bgColor, color: textColor,
        });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/home/projects']);
  }
}