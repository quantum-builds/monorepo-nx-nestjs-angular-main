import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();

    console.log('Login Guard - Is Logged In:', isLoggedIn);

    if (isLoggedIn) {
      console.log('Redirecting to dashboard');
      this.router.navigate(['/dashboard']); // If already logged in, redirect to dashboard
      return false;
    }

    return true; // Allow navigation to login page if not logged in
  }
}
