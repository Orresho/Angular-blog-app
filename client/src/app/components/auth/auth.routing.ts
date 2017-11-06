import { Routes } from '@angular/router';

import { SigninComponent } from './login/signin.component';
import { SignupComponent } from './register/signup.component';

export const authRoutes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent}, 
  { path: 'signin', component: SigninComponent},
];
