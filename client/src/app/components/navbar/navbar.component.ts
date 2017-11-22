import { Router } from '@angular/router';
import { AuthService } from './../../_services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {

    
    constructor(
        private authService: AuthService,
        private router: Router,
        private flashMessagesService: FlashMessagesService
    ){}

    onLogoutClick(){
        this.authService.logout();
        this.flashMessagesService.show('You are logged out', {cssClass: 'alert-info', timeout: 5000});
        this.router.navigate(['/']);
    }
    
    // This method does nothing and is not used. 
    loggedIn(){
        this.authService.loggedIn();        
    }
}