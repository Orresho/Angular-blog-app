import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthComponent } from './components/auth/auth.component';
import { RouterModule, Routes } from '@angular/router';

import { authRoutes } from './components/auth/auth.routing';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'auth', component: AuthComponent, children: authRoutes}, 
];

export const routing = RouterModule.forRoot(routes);
