import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'; // Import environment variables

// Define an interface for the User
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = []; // Array to hold user data
  errorMessage: string | null = null; // Property for error messages

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers(); // Fetch users on initialization
  }

  logout() {
    localStorage.removeItem('token');
    // Redirect to login page
    this.router.navigate(['/']); // Adjust to your login route
  }
  private fetchUsers(): void {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (token) {
      // Make the HTTP GET request and include the Authorization header
      this.http.get<User[]>(`${environment.apiUrl}/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}` // Add the token in the Authorization header
        }
      })
      .subscribe({
        next: (data) => {
          this.users = data; // Assign fetched data to users array
        },
        error: () => {
          this.errorMessage = 'Failed to load users. Please try again.'; // Handle errors
        }
      });
    } else {
      this.errorMessage = 'You must be logged in to view users.'; // Handle case when no token is available
    }
  }

}
