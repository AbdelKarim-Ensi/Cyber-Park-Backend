import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../../core/services/employee';
import { DepartmentService } from '../../../../core/services/department';
import { SweetAlertService } from '../../../../core/sweet-alert';

@Component({
  selector: 'app-ajoute-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ajoute-employee.html',
  styleUrls: ['./ajoute-employee.css']
})
export class AjouteEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  departments: any[] = []; // ✅ Liste dynamique

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _employee: EmployeeService,
    private _department: DepartmentService, // ✅ Ajout du service
    private _sweetAlert: SweetAlertService,
    private _cdr:ChangeDetectorRef
  ) {
    this.employeeForm = this.fb.group({
      firstName:  ['', Validators.required],
      lastName:   ['', Validators.required],
      email:      ['', [Validators.required, Validators.email]],
      role:       ['', Validators.required],
      department: ['', Validators.required],
      hireDate:   ['', Validators.required],
      status:     ['', Validators.required]
    });
  }

  ngOnInit(): void {
  this._department.getDepartments().subscribe({
    next: (res: any) => {
      // ✅ FIX Bug 2 : forcer _id en string pure pour que [value] dans le HTML
      // transmette bien une string à mongoose.Types.ObjectId.isValid()
      this.departments = (res.data || res).map((d: any) => ({
        ...d,
        _id: d._id?.toString() ?? d._id
      }));
      this._cdr.detectChanges()
    }
    ,
    error: (err: any) => {
      console.error('❌ Erreur chargement départements :', err);
    }
  });
}
  get isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
  }
  

  async onSubmit(): Promise<void> {
    if (this.employeeForm.invalid) {
      this._sweetAlert.warning({
        title: 'Attention',
        message: 'Veuillez remplir tous les champs obligatoires.'
      });
      return;
    }

    const formVal = this.employeeForm.value;

    // ✅ Mapper vers les vrais champs du backend
    const body = {
      firstName:  formVal.firstName,
      lastName:   formVal.lastName,
      email:      formVal.email,
      role:       formVal.role,
      department: formVal.department, // _id MongoDB du département
      hireDate:   formVal.hireDate,
      status:     formVal.status
    };

    this._employee.ajouteEmpoyee(body).subscribe({
      next: async () => {
        await this._sweetAlert.success({
          title: 'Succès !',
          message: "L'employé a été ajouté à la base de données."
        });
        this.router.navigate(['/home/employees']);
      },
      error: (err: unknown) => {
        this._sweetAlert.error({
          title: 'Erreur',
          message: "Impossible d'ajouter cet employé en base de données."
        });
        console.error(err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/home/employees']);
  }
}