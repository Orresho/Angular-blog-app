import { AuthService } from './../../_services/auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{


    constructor(
        private authService: AuthService,
    ){}

    
    // This method does nothing and is not used. 
    loggedIn(){
        this.authService.loggedIn();
    }
}