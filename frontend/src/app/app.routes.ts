import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard'; 
import { LandingComponent } from './pages/landing/landing';
import { LoginComponent } from './pages/login/login'; 
import { Home } from './pages/home/home';
import { Notfound } from './pages/notfound/notfound'; 
import { Dashboard } from './pages/home/dashboard/dashboard';
import { Announcements } from './pages/home/announcements/announcements';
import { Attendance } from './pages/home/attendance/attendance';
import { DepartmentsComponent } from './pages/home/departments/departments';
import { UpdateDepartment } from './pages/home/departments/update-department/update-department';
import { EmployeesComponent } from './pages/home/employees/employees';
import { UpdateEmployee } from './pages/home/employees/update-employee/update-employee';
import { AjouteEmployeeComponent } from './pages/home/employees/ajoute-employee/ajoute-employee';
import { DepartmentFormComponent } from './pages/home/departments/ajoute-department/ajoute-department';
import { Leaves } from './pages/home/leaves/leaves';
import { AjoutConge } from './pages/home/leaves/ajout-conge/ajout-conge';
import { Projects } from './pages/home/projects/projects';
import { SalaryAdvances } from './pages/home/salary-advances/salary-advances';
import { UpdateProject } from './pages/home/projects/updateproject/updateproject';
import { Ajoutproject } from './pages/home/projects/ajoutproject/ajoutproject';
import { Ajoutsalary } from './pages/home/salary-advances/ajoutsalary/ajoutsalary';
import { Ajoutannouncement } from './pages/home/announcements/ajoutannouncement/ajoutannouncement';
import { Updateannouncement } from './pages/home/announcements/updateannouncement/updateannouncement';
import { Ajoutattendance } from './pages/home/attendance/ajoutattendance/ajoutattendance';
import { Updateattendance } from './pages/home/attendance/updateattendance/updateattendance';
import { Profile } from './pages/home/profil/profil';
import { ForgotPassword } from './pages/forgot-password/forgot-password'; // AJOUT
import { ResetPassword } from './pages/reset-password/reset-password'; // AJOUT
import { roleGuard } from './core/guards/role-guard-guard';
import { UnsubscribeComponent } from './pages/unsubscribe/unsubscribe/unsubscribe';

export const routes: Routes = [
  { path: '', component: LandingComponent, title: 'Cyber Park - Accueil' },
  { path: 'login', component: LoginComponent, title: 'Connexion - Cyber Park' },
  { path: 'forgot-password', component: ForgotPassword, title: 'Mot de passe oublié - Cyber Park' }, // AJOUT
  // AJOUT : route publique (SANS authGuard) car l'utilisateur n'est pas connecté à ce stade
  { path: 'reset-password/:token', component: ResetPassword, title: 'Réinitialiser le mot de passe - Cyber Park' },
  {path:"unsubscribe/:id", component: UnsubscribeComponent},

  {
    path: 'home',
    component: Home,
    canActivate: [authGuard], 
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      { path: 'dashboard', component: Dashboard },
      { path: 'profil', component: Profile },
      { path: 'announcements', children:[
          { path: '', component: Announcements },
          { path: 'update/:id', component: Updateannouncement },
          { path: 'ajout', component: Ajoutannouncement }
      ] },
      { path: 'attendance', children:[
        
          { path: '', component: Attendance },
          { path: 'update/:id', component: Updateattendance },
          { path: 'ajout', component: Ajoutattendance }
      ] },
      { 
        path: 'departments', 
        children: [
          { path: '', component: DepartmentsComponent },
          { path: 'update/:id', component: UpdateDepartment },
          { path: 'ajout', component: DepartmentFormComponent }
        ] 
      },
      { 
        path: 'employees', canActivate: [roleGuard(['ADMIN'])],
        children: [
          { path: '', component: EmployeesComponent },
          { path: 'update/:id', component: UpdateEmployee },
          { path: 'ajout', component: AjouteEmployeeComponent }
        ] 
      },
      { 
        path: 'leaves', 
        children: [
          { path: '', component: Leaves },
          { path: 'ajout', component: AjoutConge }
        ] 
      },
      { path: 'projects', children:[
        
          { path: '', component: Projects },
          { path: 'update/:id', component: UpdateProject },
          { path: 'ajout', component: Ajoutproject }
      ]
        },
      { path: 'salaryAdvances',children:[
        { path: '', component: SalaryAdvances },
          { path: 'ajout', component: Ajoutsalary }
      ] }
    ]
  },
  { path: '**', component: Notfound }
];