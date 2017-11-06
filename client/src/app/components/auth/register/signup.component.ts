import { User } from '../../../_models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {

    constructor(private authService: AuthService) { }
    myForm: FormGroup;

    messageClass: string;
    message: string;

    // Subscribe user to signup service
    onSubmit() {
        const user = new User(
            this.myForm.value.userName,
            this.myForm.value.password,
            this.myForm.value.email,
            this.myForm.value.firstName,
            this.myForm.value.lastName
        );
        this.authService.signup(user)
            .subscribe(
                data => {
                    if(!data.success){
                        this.messageClass = 'alert alert-danger',
                        this.message = 'Some warning message from the server'
                    } else {
                        
                        this.messageClass = 'alert alert-success',
                        this.message = 'Some good successful message from the server'
                    } 
                },
            );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            userName: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
        });
    }
}
