import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signin.component.html'
})


export class SigninComponent implements OnInit{
    myForm: FormGroup;

    constructor(){}

    ngOnInit() {
        this.myForm = new FormGroup({
            username: new FormControl(null, [
                Validators.required,
            ]),
            password: new FormControl(null, Validators.required)
        });
    }

    // Signing in
    onSubmit(){
        console.log('User signed in!');
        this.myForm.reset();
    }
}