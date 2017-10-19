import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent}, 
  { path: 'signin', component: SigninComponent}
  
];

export const routing = RouterModule.forRoot(routes);
