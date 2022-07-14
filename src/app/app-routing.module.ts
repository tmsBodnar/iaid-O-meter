import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from '../app/components/auth/sign-up/sign-up.component';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../app/components/auth/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ErrorPageComponent } from './components/auth/error-page/error-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
