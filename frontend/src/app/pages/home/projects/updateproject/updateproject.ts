import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'; // 🎯 Ajout de OnDestroy et ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProjectService } from '../../../../core/services/project';
import { EmployeeService } from '../../../../core/services/employee';

@Component({
  selector: 'app-update-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './updateproject.html',
  styleUrl: './updateproject.css'
})
export class UpdateProject implements OnInit, OnDestroy { // 🎯 Ajout de "implements OnDestroy"
  projectForm: FormGroup;
  id: string = '';
  employees: any[] = []; // Source brute pour ton *ngFor HTML
  selectedEmployeeIds: string[] = []; // Liste des IDs uniques cochés
  
  
  private themeObserver!: MutationObserver; // 🎯 Écouteur pour traquer le mode sombre

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _act: ActivatedRoute,
    private _projectService: ProjectService,
    private _employeeService: EmployeeService,
    private cdr: ChangeDetectorRef // 🎯 Injection du détecteur de changement d'Angular
  ) {
    // Initialisation par défaut du formulaire réactif
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      status: ['PENDING', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // 🎯 SCANNER UNIVERSEL : Récupère le premier paramètre disponible dans l'URL
    const params = this._act.snapshot.params;
    const paramKeys = Object.keys(params);
    
    if (paramKeys.length > 0) {
      this.id = params[paramKeys[0]];
    } else {
      this.id = this._act.snapshot.paramMap.get('id') || '';
    }
    
    console.log("🚀 ID détecté de manière dynamique :", this.id);
    
    // 1. Charger d'abord tous les collaborateurs
    this._employeeService.getEmployees().subscribe({
      next: (res: any) => {
        const rawEmployees = res.data || res;
        this.employees = Array.isArray(rawEmployees) 
        ? rawEmployees.map((emp: any) => ({ ...emp, id: emp.id || emp._id }))
        : [];
        
        console.log("👥 Liste des collaborateurs prête :", this.employees);
        
        // 2. Lancer la récupération du projet uniquement si l'ID est valide
        if (this.id && this.id !== 'undefined') {
          this.loadProjectDetails();
        } else {
          console.error("❌ Impossible de charger le projet car l'ID est toujours introuvable dans l'URL.");
        }
      },
      error: (err:any) => console.error("❌ Erreur chargement employés :", err)
    });
    
    // 🎯 AJOUT DU MUTATION OBSERVER POUR L'AGENDA DYNAMIQUE
    this.themeObserver = new MutationObserver(() => {
      this.cdr.detectChanges(); // Force Angular à réévaluer instantanément ton getter isDarkMode ci-dessous !
    });
    
    // On écoute les changements de classes sur le HTML et le Body
    this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    this.themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }
  
  ngOnDestroy(): void {
    if (this.themeObserver) {
      this.themeObserver.disconnect();
    }
  }
  // 🎯 Nettoyage de l'écouteur à la destruction du composant pour éviter les fuites de mémoire
  

  loadProjectDetails(): void {
    this._projectService.getProjectById(this.id).subscribe({
      next: (res: any) => {
        console.log("📦 Réponse brute reçue du Backend :", res);
        
        let proj = (res && res.data) ? res.data : res;

        if (Array.isArray(proj)) {
          proj = proj[0];
        }

        if (!proj) {
          console.error("❌ Impossible d'extraire les données du projet.");
          return;
        }

        console.log("🔍 Objet projet extrait et prêt à être patché :", proj);

        let formattedStartDate = '';
        if (proj.startDate) {
          try {
            formattedStartDate = new Date(proj.startDate).toISOString().split('T')[0];
          } catch (e) {
            formattedStartDate = typeof proj.startDate === 'string' ? proj.startDate.split('T')[0] : '';
          }
        }

        let formattedEndDate = '';
        if (proj.endDate) {
          try {
            formattedEndDate = new Date(proj.endDate).toISOString().split('T')[0];
          } catch (e) {
            formattedEndDate = typeof proj.endDate === 'string' ? proj.endDate.split('T')[0] : '';
          }
        }

        this.projectForm.patchValue({
          name: proj.name || '',
          status: proj.status ? proj.status.toUpperCase() : 'PENDING',
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          description: proj.description || ''
        });

        const currentTeam = proj.assignedEmployees || proj.team || [];
        this.selectedEmployeeIds = currentTeam.map((emp: any) => {
          if (emp && typeof emp === 'object') {
            return emp.id || emp._id;
          }
          return emp;
        });
        console.log("✅ Formulaire Projet initialisé avec succès ! Membres cochés :", this.selectedEmployeeIds);
      },
      error: (err) => console.error("❌ Erreur lors du getProjectById :", err)
    });
  }

  private safeFormatDate(dateInput: any): string {
    if (!dateInput) return '';
    try {
      if (typeof dateInput === 'string' && dateInput.includes('T')) {
        return dateInput.split('T')[0];
      }
      const parsedDate = new Date(dateInput);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate.toISOString().split('T')[0];
      }
    } catch (e) {
      console.warn("Format de date inhabituel :", dateInput);
    }
    return '';
  }

  toggleEmployee(employeeId: string): void {
    const index = this.selectedEmployeeIds.indexOf(employeeId);
    if (index > -1) {
      this.selectedEmployeeIds.splice(index, 1);
    } else {
      this.selectedEmployeeIds.push(employeeId);
    }
  }

  isEmployeeSelected(employeeId: string): boolean {
    return this.selectedEmployeeIds.includes(employeeId);
  }

  // Ton getter initial préservé intact
  get isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
  }

  getInitials(name: string): string {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase() || '??';
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const assignedTeam = this.employees.filter(emp => this.selectedEmployeeIds.includes(emp.id));
    const body = {
      name: this.projectForm.value.name,
      status: this.projectForm.value.status,
      startDate: this.projectForm.value.startDate,
      endDate: this.projectForm.value.endDate || null,
      description: this.projectForm.value.description,
      assignedEmployees: assignedTeam
    };

    const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
    const bgColor = isDark ? '#161b26' : '#ffffff'; 
    const textColor = isDark ? '#ffffff' : '#0f172a';

    this._projectService.updateProject(this.id, body).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Projet mis à jour !',
          text: 'Le projet a été modifié avec succès.',
          confirmButtonColor: '#2563eb',
          background: bgColor,
          color: textColor,
        }).then(() => this._router.navigate(['/home/projects']));
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: err.error?.message || 'Une erreur est survenue lors de la mise à jour.',
          confirmButtonColor: '#ef4444',
          background: bgColor,
          color: textColor,
        });
      }
    });
  }

  onCancel(): void {
    this._router.navigate(['/home/projects']);
  }
}