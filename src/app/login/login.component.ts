import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false; 
  errorMessage: string = '';  

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.loading = true;  

      this.http.post('http://43.205.202.221:5001/test/auth/login', this.loginForm.value).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);  
          this.router.navigate(['/dashboard']);  
          this.loading = false;  
        },
        error: (error) => {
          this.loading = false; 
          this.errorMessage = 'Invalid credentials. Please try again.';  
          console.error('Login error:', error);
        }
      });
    }
  }
}
