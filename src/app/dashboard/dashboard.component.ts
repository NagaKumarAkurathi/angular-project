import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DepartmentListComponent } from './department-list/department-list.component';
 
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, DepartmentListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 
}