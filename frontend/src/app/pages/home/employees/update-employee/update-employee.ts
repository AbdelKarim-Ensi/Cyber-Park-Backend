import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../../../core/services/employee';
import { DepartmentService } from '../../../../core/services/department';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-employee.html',
  styleUrl: './update-employee.css',
})
export class UpdateEmployee implements OnInit {
  employeeForm: FormGroup;
  id: string = '';
  departments: any[] = [];

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _act: ActivatedRoute,
    private _employee: EmployeeService,
    private _department: DepartmentService,
    private _cdr:ChangeDetectorRef
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      department: [''],
      joinDate: ['', Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }
   get isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
  }


  ngOnInit(): void {
    this.id = this._act.snapshot.paramMap.get('id') || '';

    // 1. Charger d'abord la liste des départements pour ton select HTML
    this._department.getDepartments().subscribe({
      next: (res: any) => {
        this.departments = res.data || res;
        console.log("Départements chargés :", this.departments);
      },
      error: (err) => console.log("Erreur de départements :", err)
    });

    // 2. Récupérer l'employé par son ID
    this._employee.getEmployeeById(this.id).subscribe({
      next: (res: any) => {
        console.log("Réponse brute du backend pour cet ID :", res);
        
        // Sécurité maximale pour extraire l'objet employé
        let emp = res;
        if (res && res.data) {
          emp = Array.isArray(res.data) ? res.data[0] : res.data;
        }

        if (!emp) {
          console.error("Aucun employé trouvé dans la réponse du serveur.");
          return;
        }

        // On remplit le formulaire proprement
        // On extrait proprement l'ID du département qu'il soit un objet, une string, ou null
let deptValue = '';
if (emp.departmentId) {
  deptValue = emp.departmentId._id ? emp.departmentId._id : emp.departmentId;
}

// Maintenant on patche le formulaire
this.employeeForm.patchValue({
  firstName:  emp.firstName || '',
  lastName:   emp.lastName  || '',
  email:      emp.email     || '',
  role:       emp.role      || emp.position || 'EMPLOYEE',
  department: deptValue, // 👈 Utilise la variable deptValue nettoyée ici !
  joinDate:   emp.joinDate ? emp.joinDate.split('T')[0] : (emp.date || ''),
  status:     emp.status    || 'ACTIVE'
});
        
        console.log("Formulaire patché avec succès !");
        this._cdr.detectChanges()
      },
      error: (err) => console.log("Erreur lors de la récupération de l'employé :", err)
    });
  }
onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    // 🎯 Préparation des données pour correspondre exactement aux attentes du Backend
    const body = {
      firstName:    this.employeeForm.value.firstName,
      lastName:     this.employeeForm.value.lastName,
      email:        this.employeeForm.value.email,
      role:         this.employeeForm.value.role,
      departmentId: this.employeeForm.value.department, // 👈 Transmet l'ID sélectionné dans le champ 'departmentId'
      joinDate:     this.employeeForm.value.joinDate,
      status:       this.employeeForm.value.status
    };

    console.log("Données envoyées pour la mise à jour :", body);

    this._employee.updateEmployee(this.id, body).subscribe({
      next: (res) => {
        Swal.fire({
          title: "Succès!",
          text: "Employé mis à jour avec succès!",
          icon: "success",
          confirmButtonColor: '#3b82f6'
        }).then(() => {
        this._router.navigate(['/home/employees']);
        this._cdr.detectChanges()
      })},
      error: (err) => console.log("Erreur lors de la mise à jour :", err)
    });
  }

  onCancel(): void {
    this._router.navigate(['/home/employees']);
  }
}