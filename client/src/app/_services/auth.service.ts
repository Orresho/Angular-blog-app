import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
    constructor(private http: Http) { }

    domain = "http://localhost:3000";
    authToken;
    user;
    options;

    createAuthenticationHeaders(){
        this.loadToken();
        this.options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': this.authToken
            })
        });
    }

    // Retrieve token from localstorage
    loadToken(){
        this.authToken = localStorage.getItem('token');
    }

    signup(user) {
        return this.http.post(this.domain + '/user/register', user)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    login(user){
        return this.http.post(this.domain + '/user/login', user)
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }

    storeUserData(token, user){
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }


    getProfile(){
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + '/user/profile', this.options)
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }

    logout() {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }

    
    // Method used to hide links/routes
    loggedIn() {
        return tokenNotExpired();
    }
}