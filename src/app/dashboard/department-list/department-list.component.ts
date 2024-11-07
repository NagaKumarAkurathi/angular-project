import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { HttpClientModule } from '@angular/common/http';  

interface Department {
  id: number;
  name: string;
}

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule], 
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  loading: boolean = false;
  totalRecords: number = 0;
  page: number = 1;
  pageSize: number = 10;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    if (!token) {
      console.error('No token found. User not logged in.');
      this.router.navigate(['/login']); 
      return new HttpHeaders();  
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
  }

  getDepartments() {
    this.loading = true;
    const headers = this.getAuthHeaders();  
    if (!headers.get('Authorization')) {
      this.loading = false;
      return;
    }
    console.log('Authorization Header:', headers);

    this.http.get<{ total: number; departments: Department[] }>(
      `http://43.205.202.221:5001/admin/department/list?page=${this.page}&size=${this.pageSize}`,
      { headers }
    ).subscribe({
      next: (response) => {
        console.log('Departments fetched successfully:', response);
        this.departments = response.departments;
        this.totalRecords = response.total;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching departments:', err);
        alert('Could not fetch departments. Please check your permissions or try again later.');
        this.loading = false;
      }
    });
  }
  editDepartment(departmentId: number) {
    this.router.navigate(['/dashboard/department/edit', departmentId]);
  }

  deleteDepartment(departmentId: number) {
    const headers = this.getAuthHeaders();  
    if (!headers.get('Authorization')) {
      return;
    }

    this.http.delete(
      `http://43.205.202.221:5001/admin/department/${departmentId}`,
      { headers }
    ).subscribe({
      next: () => {
        alert('Department deleted successfully.');
        this.getDepartments(); 
      },
      error: (err) => {
        console.error('Error deleting department:', err);
        alert('Could not delete department. Please try again later.');
      }
    });
  }

  changePage(newPage: number) {
    this.page = newPage;
    this.getDepartments();
  }
  getTotalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }
}
