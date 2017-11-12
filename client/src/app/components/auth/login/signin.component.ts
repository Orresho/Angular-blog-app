// import { Router } from '@angular/router';
// import { AuthService } from '../../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signin.component.html'
})


export class SigninComponent implements OnInit{
    form: FormGroup;

    messageClass;
    message;

    constructor(
        // private authService: AuthService, 
        // private router: Router, 
        private formBuilder: FormBuilder){}

    ngOnInit() {
    }


    createForm(){
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // Signing in
    onLoginSubmit() {
        const user = {
            username: this.form.get('username').value,
            password: this.form.get('password').value,
        }
        console.log(user);
    }
}