import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();

    console.log('Auth Guard - Is Logged In:', isLoggedIn);

    if (!isLoggedIn) {
      console.log('Redirecting to login page');
      this.router.navigate(['/']); // If not logged in, redirect to login
      return false;
    }

    return true; // Allow navigation if logged in
  }
}
