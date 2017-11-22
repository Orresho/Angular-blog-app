import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BlogService {
    constructor(
        private http: Http,
        private authService: AuthService) { }

    domain = this.authService.domain;
    options;

    createAuthenticationHeaders() {
        this.options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': this.authService.authToken
            })
        });
    }


    getBlog() {
        return this.http.get(this.domain + '/blog/newblog')
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    postBlog(blog) {
        this.createAuthenticationHeaders();
        return this.http.post(this.domain + 'new' + '/blog/newblog', blog, this.options)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}