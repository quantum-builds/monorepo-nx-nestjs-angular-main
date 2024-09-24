import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service'; // Import AuthService
import { environment } from '../../environments/environment'; // Import environment variables

// Define an interface for the expected API response
interface ApiResponse {
  error?: string; // Optional error property
  message?: string; // Optional success message property
  token?: string; // JWT token returned on successful login
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null; // Property for error messages
  successMessage: string | null = null; // Property for success messages

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private http: HttpClient,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.performLogin(formData);
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.'; // Form validation error
    }
  }

  private performLogin(formData: any): void {
    this.http.post<ApiResponse>(`${environment.apiUrl}/auth/signin`, formData)
      .subscribe({
        next: (response) => this.handleLoginResponse(response),
        error: () => this.handleHttpError()
      });
  }

  private handleLoginResponse(response: ApiResponse): void {
    if (response.error) {
      // Handle the error response
      console.error('Login failed', response.error); // Log the error response
      this.errorMessage = response.error; // Set the error message to display
      this.successMessage = null; // Reset success message if there was an error
    } else {
      // Login successful
      console.log('Login successful', response); // Log the response
      this.successMessage = response.message || 'Login successful!'; // Set success message
      this.errorMessage = null; // Reset error message on success

      if (response.token) {
        this.authService.login(response.token); // Call AuthService to handle token storage
      }

      // Navigate to the dashboard after successful login
      this.router.navigateByUrl("/dashboard"); // Change to your desired route
    }
  }

  private handleHttpError(): void {
    console.error('HTTP error occurred'); // Log the HTTP error
    this.errorMessage = 'Invalid credentials.'; // Generic error message
    this.successMessage = null; // Reset success message if there was an error
  }

  openRegistrationPage(): void {
    this.router.navigateByUrl("/signup"); // Change to your registration route
  }
}
