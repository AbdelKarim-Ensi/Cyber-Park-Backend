import { ChangeDetectorRef, Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AttendanceService } from '../../../../core/services/attendance';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateattendance',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './updateattendance.html',
  styleUrl: './updateattendance.css',
})
export class Updateattendance implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private _attendance = inject(AttendanceService);
  private _cdr = inject(ChangeDetectorRef);

  attendanceForm!: FormGroup;
  attendanceId!: string;
  employeeName: string = '';

  // ✅ Thème dynamique réactif
  isDarkMode: boolean = false;
  private _observer!: MutationObserver;

  ngOnInit(): void {
    this.attendanceId = this.route.snapshot.params['id'];
    this.initForm();
    this.loadAttendanceDetails();
    this.watchStatusChanges();

    // ✅ Init thème
    this.isDarkMode = document.documentElement.classList.contains('dark') ||
                      document.body.classList.contains('dark');

    this._observer = new MutationObserver(() => {
      this.isDarkMode = document.documentElement.classList.contains('dark') ||
                        document.body.classList.contains('dark');
      this._cdr.detectChanges();
    });

    this._observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    this._observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  ngOnDestroy(): void {
    if (this._observer) this._observer.disconnect();
  }

  private initForm(): void {
    this.attendanceForm = this.fb.group({
      date: ['', Validators.required],
      status: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: [''],
      notes: ['']
    });
  }

  private loadAttendanceDetails(): void {
    this._attendance.getAttendanceById(this.attendanceId).subscribe({
      next: (res: any) => {
        const data = res.data ? res.data : res;

        if (data.employeeId) {
          this.employeeName = `${data.employeeId.firstName} ${data.employeeId.lastName}`;
        }

        this.attendanceForm.patchValue({
          date: this.formatDate(data.date),
          status: data.status,
          checkIn: this.formatTime(data.checkIn),
          checkOut: this.formatTime(data.checkOut),
          notes: data.notes
        });

        this.toggleTimeFields(data.status);
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Erreur', 'Impossible de charger les détails du pointage.', 'error');
        this.router.navigate(['/home/attendance']);
      }
    });
  }

  private watchStatusChanges(): void {
    this.attendanceForm.get('status')?.valueChanges.subscribe(status => {
      this.toggleTimeFields(status);
    });
  }

  private toggleTimeFields(status: string): void {
    const checkInCtrl = this.attendanceForm.get('checkIn');
    const checkOutCtrl = this.attendanceForm.get('checkOut');

    if (status === 'ABSENT') {
      checkInCtrl?.disable();
      checkOutCtrl?.disable();
      checkInCtrl?.clearValidators();
      checkInCtrl?.setValue('');
      checkOutCtrl?.setValue('');
    } else {
      checkInCtrl?.enable();
      checkOutCtrl?.enable();
      checkInCtrl?.setValidators([Validators.required]);
    }
    checkInCtrl?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.attendanceForm.invalid) {
      this.attendanceForm.markAllAsTouched();
      return;
    }

    const formValue = this.attendanceForm.getRawValue(); // getRawValue pour inclure les champs disabled
    const baseDate = formValue.date;

    // ✅ Fusion date + heure
    const checkInDateTime = formValue.checkIn ? new Date(`${baseDate}T${formValue.checkIn}`) : null;
    const checkOutDateTime = formValue.checkOut ? new Date(`${baseDate}T${formValue.checkOut}`) : null;

    const payload = {
      date: baseDate,
      status: formValue.status,
      checkIn: checkInDateTime ? checkInDateTime.toISOString() : null,
      checkOut: checkOutDateTime ? checkOutDateTime.toISOString() : null,
      notes: formValue.notes
    };

    const bgColor = this.isDarkMode ? '#161b26' : '#ffffff';
    const textColor = this.isDarkMode ? '#ffffff' : '#0f172a';

    // ✅ updateAttendance avec l'ID — pas createAttendance !
    this._attendance.updatedAttendance(this.attendanceId, payload).subscribe({
      next: () => {
        Swal.fire({
          title: "Modifié !",
          text: "Le pointage a été mis à jour avec succès.",
          icon: "success",
          confirmButtonColor: '#3b82f6',
          background: bgColor,
          color: textColor
        }).then(() => this.router.navigate(['/home/attendance']));
      },
      error: (err: any) => {
        console.error(err);
        Swal.fire({
          title: "Erreur",
          text: "Impossible de modifier le pointage.",
          icon: "error",
          confirmButtonColor: '#ef4444',
          background: bgColor,
          color: textColor
        });
      }
    });
  }

  private formatDate(dateInput: any): string {
    if (!dateInput) return '';
    return new Date(dateInput).toISOString().split('T')[0];
  }

  private formatTime(dateInput: any): string {
    if (!dateInput) return '';
    const d = new Date(dateInput);
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }
}