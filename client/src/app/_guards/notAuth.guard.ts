import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router){}

    canActivate() {
        // if user is logged in they cannot activate
        if (this.authService.loggedIn()) {
            this.router.navigate(['/home']);
            return false;
        } else {
            return true;
        }
    }
}