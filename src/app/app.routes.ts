import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentListComponent } from './dashboard/department-list/department-list.component';
import { ImportcsvComponent } from './dashboard/importcsv/importcsv.component';

 
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'department-list', component: DepartmentListComponent },
      { path: 'csv-import', component: ImportcsvComponent }, 
      { path: '', redirectTo: 'department-list', pathMatch: 'full' }, 
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
];
 