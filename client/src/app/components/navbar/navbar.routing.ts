import { AuthComponent } from './../auth/auth.component';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './../../pages/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full'},
  { path: 'about', component: AboutComponent},
  { path: 'auth', component: AuthComponent}, 
  
];

export const routing = RouterModule.forRoot(routes);
