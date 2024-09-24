import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment'; // Import environment variables

// Define an interface for the expected API response
interface ApiResponse {
  error?: string; // Optional error property
  // Add other properties here if needed
}

@Component({
  selector: 'registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  errorMessage: string | null = null; // Property for error messages

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = form.value;

      // Call Nest API
      this.http.post<ApiResponse>(`${environment.apiUrl}/auth/signup`, formData)
        .subscribe({
          next: (response) => {
            // Check if the response contains an error
            if (response && response.error) {
              // Handle the error response
              console.error('Registration failed', response.error); // Log the error response
              this.errorMessage = response.error; // Extract the error message to display
            } else {
              // Registration successful
              console.log('Registration successful', response); // Log the response
              this.router.navigateByUrl(""); // Navigate to the login page
              this.errorMessage = null; // Reset error message on success
            }
          },
          error: (error) => {
            console.error('HTTP error occurred', error); // Log the HTTP error
            this.errorMessage = 'An unexpected error occurred. Please try again.'; // Generic error message
          }
        });
    }
  }

  openLoginPage(){
    this.router.navigateByUrl("");
}
}
