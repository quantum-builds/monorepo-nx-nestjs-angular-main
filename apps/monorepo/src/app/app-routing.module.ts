import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Import the AuthGuard
import { LoginGuard } from './login.guard'; // Import the LoginGuard

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    canActivate: [LoginGuard], // Prevent access if logged in, redirect to dashboard
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
    // No guard for signup, anyone can access this
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./user-list/user-list.module').then((m) => m.UserListModule),
    canActivate: [AuthGuard], // Protect dashboard, only accessible if logged in
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })], // Tracing can be enabled for debugging
  exports: [RouterModule],
})
export class AppRoutingModule {}
