import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Profil } from '../../../core/services/profil';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee';
import { DepartmentService } from '../../../core/services/department';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profil.html',
  styleUrl: './profil.css'
})
export class Profile implements OnInit {
  private fb = inject(FormBuilder);
  private profilService = inject(Profil);
  private _cdr = inject(ChangeDetectorRef);
  private _employeeService = inject(EmployeeService);
  private _departmentService = inject(DepartmentService);
  private _router = inject(Router);

  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  avatarPreview: string = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';

  // Variables de recherche d'employés
  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchQuery: string = '';
  selectedDepartment: string = '';
  showDropdown: boolean = false;

  // AJOUT : Liste RÉELLE des départements (avec leur _id Mongo), utilisée
  // pour peupler les <select> (filtre de recherche ET détails professionnels).
  // C'est CETTE liste qui permet d'envoyer un vrai departmentId au backend.
  allDepartments: { _id: string; name: string }[] = [];

  // Suivi de l'employé en cours d'édition par l'administrateur
  isAdminUser: boolean = false;
  isEditingSelectedEmployee: boolean = false;
  selectedEmployeeId: string | null = null;

  ngOnInit(): void {
    this.initForms();
    this.loadDepartmentsList();
    this.fetchUserProfile();
  }

  get isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
  }

  // Les champs professionnels sont verrouillés SAUF si un admin édite activement un employé sélectionné
  get isProDetailsReadonly(): boolean {
    return !(this.isAdminUser && this.isEditingSelectedEmployee);
  }

  private initForms(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      jobTitle: [{ value: '', disabled: true }],
      department: [{ value: '', disabled: true }],
      salary: [{ value: '', disabled: true }],
      joinDate: [{ value: '', disabled: true }],
      role: [{ value: '', disabled: true }],
      status: [{ value: '', disabled: true }]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  // AJOUT : charge la vraie liste des départements (_id + name) depuis le backend
  private loadDepartmentsList(): void {
    this._departmentService.getDepartments().subscribe({
      next: (res: any) => {
        this.allDepartments = res.data || res || [];
        this._cdr.detectChanges();
      },
      error: (err) => console.error('Erreur de chargement des départements :', err)
    });
  }

  private fetchUserProfile(): void {
    this.profilService.getProfil().subscribe({
      next: (response: any) => {
        if (response && response.data) {
          const user = response.data;
          this.isAdminUser = (user.role === 'ADMIN');
          const isAdminAccount = this.isAdminUser;

          // AJOUT : pour un employé, on stocke l'ID réel du département (pas son nom)
          // pour que le <select> puisse correctement matcher l'option correspondante.
          const employeeDepartmentId = user.departmentId
            ? (user.departmentId._id || user.departmentId)
            : '';

          this.profileForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone || '',
            jobTitle: isAdminAccount ? 'Administrateur' : (user.jobTitle || 'Collaborateur'),
            department: isAdminAccount ? 'Administration' : employeeDepartmentId,
            salary: isAdminAccount ? 9999999 : (user.salary ? user.salary : 0),
            // La date d'embauche n'est JAMAIS modifiée, même pour l'admin
            joinDate: user.joinDate ? new Date(user.joinDate).toLocaleDateString('fr-FR') : '',
            role: user.role,
            status: user.status
          });

          if (this.isAdminUser) {
            this.loadEmployees();
          }

          if (user.avatar && user.avatar !== 'default-avatar.png') {
            this.avatarPreview = `${environment.apiUrl}/uploads/avatars/${user.avatar}`;
          }
        }
        this._cdr.detectChanges();
      },
      error: (err) => console.error('Erreur de chargement du profil', err)
    });
  }

  onAvatarChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.avatarPreview = reader.result as string;
      reader.readAsDataURL(file);

      this.profilService.updateAvatar(file).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: 'Avatar enregistré !',
            text: 'Votre photo de profil a été mise à jour.',
            icon: 'success',
            background: this.isDarkMode ? '#0f172a' : '#ffffff',
            color: this.isDarkMode ? '#ffffff' : '#1e293b',
            confirmButtonColor: '#2563eb'
          });
          this.profilService.notifyUserUpdated();
        }
      });
    }
  }

  onSaveProfile(): void {
    if (this.profileForm.valid) {
      const updatedData = {
        firstName: this.profileForm.get('firstName')?.value,
        lastName: this.profileForm.get('lastName')?.value,
        email: this.profileForm.get('email')?.value,
        phone: this.profileForm.get('phone')?.value
      };

      this.profilService.updateProfil(updatedData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Profil mis à jour !',
            text: 'Vos modifications ont été enregistrées.',
            icon: 'success',
            background: this.isDarkMode ? '#0f172a' : '#ffffff',
            color: this.isDarkMode ? '#ffffff' : '#1e293b'
          });
          this.profilService.notifyUserUpdated();
        }
      });
    }
  }

  onSavePassword(): void {
    if (this.passwordForm.valid) {
      const data = {
        currentPassword: this.passwordForm.get('currentPassword')?.value,
        newPassword: this.passwordForm.get('newPassword')?.value
      };

      // AJOUT : on récupère l'email affiché dans le profil pour personnaliser le message du popup
      const userEmail = this.profileForm.get('email')?.value || 'votre adresse email';

      this.profilService.updatePassword(data).subscribe({
        next: () => {
          Swal.fire({
            title: 'Mot de passe modifié !',
            // AJOUT : précise qu'un email de confirmation a été envoyé (le backend
            // envoie déjà cet email dans profile.controller.js -> updatePassword)
            html: `Votre mot de passe a été mis à jour avec succès.<br><br>Un email de confirmation a été envoyé à <strong>${userEmail}</strong>.`,
            icon: 'success',
            background: this.isDarkMode ? '#0f172a' : '#ffffff',
            color: this.isDarkMode ? '#ffffff' : '#1e293b',
            confirmButtonColor: '#2563eb'
          });
          this.passwordForm.reset();
        },
        // AJOUT : gestion d'erreur manquante (ex: mot de passe actuel incorrect)
        error: (err) => {
          const message = err?.error?.message || "Une erreur est survenue lors de la modification du mot de passe.";
          Swal.fire({
            title: 'Erreur',
            text: message,
            icon: 'error',
            background: this.isDarkMode ? '#0f172a' : '#ffffff',
            color: this.isDarkMode ? '#ffffff' : '#1e293b',
            confirmButtonColor: '#2563eb'
          });
        }
      });
    }
  }

  onCancelProfile(): void {
    this.cancelEmployeeEdition();
    this.fetchUserProfile();
  }

  loadEmployees(): void {
    this._employeeService.getEmployees().subscribe({
      next: (response: any) => {
        let dataArray: any[] = [];
        if (Array.isArray(response)) dataArray = response;
        else if (response && Array.isArray(response.data)) dataArray = response.data;
        else if (response && response.data && Array.isArray(response.data.data)) dataArray = response.data.data;

        this.employees = dataArray.map(emp => {
          return {
            id: emp._id || emp.id || 'N/A',
            name: emp.name || `${emp.firstName || ''} ${emp.lastName || ''}`.trim() || 'Employé Anonyme',
            email: emp.email || 'N/A',
            // Nom du département, pour l'affichage dans les résultats de recherche
            department: emp.departmentId?.name || emp.department || 'Aucun',
            // AJOUT : l'ID réel du département, pour pouvoir pré-remplir le <select> correctement
            departmentId: emp.departmentId?._id || (typeof emp.departmentId === 'string' ? emp.departmentId : null),
            jobTitle: emp.jobTitle || 'Collaborateur',
            salary: emp.salary || 0,
            joinDate: emp.joinDate ? new Date(emp.joinDate).toLocaleDateString('fr-FR') : '',
            role: emp.role || ''
          };
        });

        this.filteredEmployees = [...this.employees];
        this._cdr.detectChanges();
      }
    });
  }

  applyFilters(): void {
    const query = this.searchQuery.toLowerCase().trim();

    this.filteredEmployees = this.employees.filter(emp => {
      const matchesSearch = !query ||
        (emp.name && emp.name.toLowerCase().includes(query)) ||
        (emp.email && emp.email.toLowerCase().includes(query)) ||
        (emp.role && emp.role.toLowerCase().includes(query)) ||
        (emp.id && emp.id.toLowerCase().includes(query));

      const matchesDept = !this.selectedDepartment ||
        (emp.department && emp.department.toLowerCase() === this.selectedDepartment.toLowerCase());

      return matchesSearch && matchesDept;
    });
    this._cdr.detectChanges();
  }

  // ACTION : L'admin clique sur un employé dans la liste
  goToEditEmployee(id: string): void {
    const selectedEmp = this.employees.find(e => e.id === id);
    if (selectedEmp) {
      this.selectedEmployeeId = id;
      this.isEditingSelectedEmployee = true;
      this.searchQuery = selectedEmp.name;
      this.showDropdown = false;

      this.profileForm.get('jobTitle')?.enable();
      this.profileForm.get('department')?.enable();
      this.profileForm.get('salary')?.enable();
      this.profileForm.get('joinDate')?.enable();

      // AJOUT : on patche le <select> avec l'ID réel du département (departmentId),
      // pas son nom, sinon aucune <option> ne correspond.
      this.profileForm.patchValue({
        jobTitle: selectedEmp.jobTitle,
        department: selectedEmp.departmentId || '',
        salary: selectedEmp.salary,
        joinDate: selectedEmp.joinDate
      });

      this.searchQuery = '';
      this.applyFilters();
      this._cdr.detectChanges();
    }
  }

  cancelEmployeeEdition(): void {
    this.isEditingSelectedEmployee = false;
    this.selectedEmployeeId = null;
    this.searchQuery = '';
    this.showDropdown = false;

    this.profileForm.get('jobTitle')?.disable();
    this.profileForm.get('department')?.disable();
    this.profileForm.get('salary')?.disable();
    this.profileForm.get('joinDate')?.disable();

    this.fetchUserProfile();
  }

  // ACTION : Sauvegarde sur le serveur des détails professionnels modifiés
  onSaveProfessionalDetails(): void {
    if (this.isEditingSelectedEmployee && this.selectedEmployeeId) {
      const proPayload = {
        jobTitle: this.profileForm.get('jobTitle')?.value,
        // FIX : le backend attend la clé "departmentId" avec un vrai ObjectId,
        // pas "department" avec un nom en texte. C'est ça qui empêchait la sauvegarde.
        departmentId: this.profileForm.get('department')?.value || null,
        salary: this.profileForm.get('salary')?.value,
        joinDate: this.profileForm.get('joinDate')?.value
      };

      this._employeeService.updateEmployee(this.selectedEmployeeId, proPayload).subscribe({
        next: () => {
          Swal.fire({
            title: 'Employé mis à jour !',
            text: 'Les détails professionnels ont été enregistrés avec succès.',
            icon: 'success',
            background: this.isDarkMode ? '#0f172a' : '#ffffff',
            color: this.isDarkMode ? '#ffffff' : '#1e293b'
          });
          this.cancelEmployeeEdition();
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            title: 'Erreur',
            text: "Impossible d'enregistrer les modifications professionnelles.",
            icon: 'error'
          });
        }
      });
    }
  }

}