import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AttendanceService } from '../../../../core/services/attendance';
import { EmployeeService } from '../../../../core/services/employee'; // Ajuste le chemin selon ton projet

@Component({
  selector: 'app-add-attendance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './ajoutattendance.html',
  styleUrl: './ajoutattendance.css'
})
export class Ajoutattendance implements OnInit {
  
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private _attendance = inject(AttendanceService);
  private _employee = inject(EmployeeService);
  private _cdr = inject(ChangeDetectorRef);
  

  attendanceForm: FormGroup;
  employeesList: any[] = []; // Liste des employés pour le Select

  constructor() {
    this.attendanceForm = this.fb.group({
      employeeId: ['', Validators.required],
      date: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: [''], // Optionnel
      status: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
    this._cdr.detectChanges()
  }

  // Charge la liste des employés pour le menu déroulant
  loadEmployees(): void {
    this._employee.getEmployees().subscribe({
      next: (res: any) => {
        // Gère la structure de ton API
        this.employeesList = res.data ? res.data : res;
        this._cdr.detectChanges()
      },
      error: (err:any) => console.error("Erreur de récupération des employés :", err)
    });
  }

  get isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
  }

  onSubmit(): void {
    if (this.attendanceForm.invalid) {
      this.attendanceForm.markAllAsTouched();
      return;
    }

    const formValue = this.attendanceForm.value;
    const baseDate = formValue.date; // Format: "YYYY-MM-DD"

    // 🎯 FUSION DATE + HEURE pour que Mongoose (type: Date) accepte la donnée !
    const checkInDateTime = new Date(`${baseDate}T${formValue.checkIn}`);
    const checkOutDateTime = formValue.checkOut ? new Date(`${baseDate}T${formValue.checkOut}`) : null;

    const payload = {
      employeeId: formValue.employeeId,
      date: baseDate,
      checkIn: checkInDateTime.toISOString(),
      checkOut: checkOutDateTime ? checkOutDateTime.toISOString() : null,
      status: formValue.status,
      notes: formValue.notes
    };

    const isDark = this.isDarkMode;
    const bgColor = isDark ? '#161b26' : '#ffffff';
    const textColor = isDark ? '#ffffff' : '#0f172a';

    this._attendance.createAttendance(payload).subscribe({
      next: () => {
        Swal.fire({
          title: "Enregistré !",
          text: "Le pointage manuel a été ajouté avec succès.",
          icon: "success",
          confirmButtonColor: '#3b82f6',
          background: bgColor,
          color: textColor
        }).then(() => this.router.navigate(['/home/attendance']));
      },
      error: (err:any) => {
        console.error(err);
        Swal.fire({
          title: "Erreur",
          text: "Impossible d'ajouter le pointage.",
          icon: "error",
          confirmButtonColor: '#ef4444',
          background: bgColor,
          color: textColor
        });
      }
    });
  }
}