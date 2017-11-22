import { AuthService } from './_services/auth.service';
import { BlogService } from './_services/blog.service';
import { BlogComponent } from './components/blog/blog.component';
import { NotAuthGuard } from './_guards/notAuth.guard';
import { AuthGuard } from './_guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpModule } from '@angular/http';
import { AboutComponent } from './pages/about/about.component';
import { AuthComponent } from './components/auth/auth.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SigninComponent } from './components/auth/login/signin.component';
import { SignupComponent } from './components/auth/register/signup.component';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { routing } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpModule,
    FlashMessagesModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    NavbarComponent,
    AuthComponent,
    AboutComponent,
    ProfileComponent,
    BlogComponent
  ],
  providers: [
    AuthGuard,
    NotAuthGuard,
    BlogService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
