import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  {
    path: 'employees',
    loadChildren: () => import('./features/employees/employees.module').then(m => m.EmployeesModule)
  },


  { path: '**', redirectTo: 'employees' }
];
