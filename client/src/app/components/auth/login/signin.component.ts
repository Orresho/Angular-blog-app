import { AuthGuard } from './../../../_guards/auth.guard';
import { Router } from '@angular/router';
import { AuthService } from '../../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { setTimeout } from 'timers';

@Component({
    selector: 'app-signup',
    templateUrl: './signin.component.html'
})


export class SigninComponent implements OnInit{
    form: FormGroup;

    messageClass;
    message;
    processing = false;
    previousUrl;

    constructor(
        private authService: AuthService, 
        private router: Router, 
        private formBuilder: FormBuilder,
        private authGuard: AuthGuard
        ){
            this.createForm();
        }

    ngOnInit() {
        if (this.authGuard.redirectUrl) {
            this.messageClass = 'alert alert-danger';
            this.message = 'You must be logged in to view that page';
            this.previousUrl = this.authGuard.redirectUrl;
            this.authGuard.redirectUrl = undefined;
        }
    }


    createForm(){
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    disableForm(){
        this.form.controls['username'].disable();
        this.form.controls['password'].disable();
    }

    enableForm(){
        this.form.controls['username'].enable();
        this.form.controls['password'].enable();
    }



    // Signing in
    onLoginSubmit() {
        this.processing = true;
        this.disableForm();
        const user = {
            username: this.form.get('username').value,
            password: this.form.get('password').value,
        }
        this.authService.login(user).subscribe(data => {
            if (!data.success) {
                this.messageClass = 'alert alert-danger';
                this.message = data.message;
                this.processing = false;
                this.enableForm();
            } else {
                this.messageClass = 'alert alert-success';
                this.message = data.message;
                this.authService.storeUserData(data.token, data.user);
                setTimeout(() => {
                    if (this.previousUrl) {
                        this.router.navigate([this.previousUrl]);
                    } else {
                        this.router.navigate(['/profile']);
                    }
                }, 500);
            }
        })
    }
}