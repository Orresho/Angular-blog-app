import { Routes } from '@angular/router';
import { SigninComponent } from './login/signin.component';
import { SignupComponent } from './register/signup.component';
import { NotAuthGuard } from '../../_guards/notAuth.guard';

export const authRoutes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, canActivate: [NotAuthGuard]}, 
  { path: 'signin', component: SigninComponent, canActivate: [NotAuthGuard]},
];
