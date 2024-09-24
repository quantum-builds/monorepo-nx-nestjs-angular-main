import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Set token expiration to 8 hours (in milliseconds)
  private readonly tokenExpirationTime = 8 * 60 * 60 * 1000; // 8 hours

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('token_expiration');
    const currentTime = Date.now();

    // Debugging logs
    console.log('Current Time:', new Date(currentTime));
    console.log('Stored Expiration:', new Date(parseInt(expiration || '0', 10)));
    console.log('Token:', token);

    // If no token or expiration time, user is not logged in
    if (!token || !expiration) {
      console.log('No token or expiration found, returning false.');
      return false;
    }

    const expirationTime = parseInt(expiration, 10);

    // If current time is greater than expiration time, token has expired
    if (currentTime > expirationTime) {
      console.log('Token is expired.');
      this.logout(); // Log the user out and clear the token
      return false;
    }

    console.log('Token is valid, returning true.');
    return true; // Token is valid, user is logged in
  }

  // Login method to store the token and set its expiration time
  login(token: string): void {
    // Save the token to localStorage
    localStorage.setItem('token', token);

    // Set expiration time to 8 hours from now
    const expirationTime = Date.now() + 8 * 60 * 60 * 1000; // 8 hours in milliseconds
    localStorage.setItem('token_expiration', expirationTime.toString());

    console.log('User logged in, token set to expire at:', new Date(expirationTime));
  }

  // Logout method to remove the token and expiration from localStorage
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration');
    console.log('User logged out, token and expiration cleared.');
  }
}
