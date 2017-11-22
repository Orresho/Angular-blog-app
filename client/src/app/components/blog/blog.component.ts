import { BlogService } from './../../_services/blog.service';
import { AuthService } from './../../_services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { setTimeout } from 'timers';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit{

    form;
    newPost = false;
    message;
    messageClass;
    loadingBlogs = false;
    processing = false;
    username;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private blogService: BlogService) {
        this.createNewBlogForm();
    }

    ngOnInit(){
        this.authService.getProfile().subscribe(data => {
            this.username = data.user.username;
        });
    }

    // Create form for the blog
    createNewBlogForm() {
        this.form = this.formBuilder.group({
            title: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.minLength(5),
                this.alphaNumericValidation
            ])],
            body: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(500),
                Validators.minLength(5)
            ])]
        });
    }

    disableForm(){
        this.form.controls['title'].disable();
        this.form.controls['body'].disable();
    }

    enableForm(){
        this.form.controls['title'].enable();
        this.form.controls['body'].enable();
    }

    alphaNumericValidation(controls) {
        const regExp = new RegExp(/^[A-Za-z0-9_. ]+$/);
        if (regExp.test(controls.value)) {
            return null;
        } else {
            return { 'alphaNumericValidation': true };
        }
    }

    newBlogForm() {
        this.newPost = true;
    }

    reloadBlogs() {
        this.loadingBlogs = true;
        // Get all blogs
        setTimeout(() => {
            this.loadingBlogs = false;
        }, 4000)

        console.log("Works");
    }

    draftComment() {

    }

    onBlogSubmit(){
        this.processing = true;
        this.disableForm(); 

        const blog = {
            title: this.form.controls['title'].value,
            body: this.form.controls['body'].value,
            createdBy: this.username
        }
        this.blogService.postBlog(blog).subscribe(data => {
            if (!data.success) {
                this.messageClass = 'alert alert-danger'; // Return error class
                this.message = data.message; // Return error message
                this.processing = false; // Enable submit button
                this.enableForm(); // Enable form
              } else {
                this.messageClass = 'alert alert-success'; // Return success class
                this.message = data.message; // Return success message
                // Clear form data after two seconds
                setTimeout(() => {
                  this.newPost = false; // Hide form
                  this.processing = false; // Enable submit button
                  this.message = false; // Erase error/success message
                  this.form.reset(); // Reset all form fields
                  this.enableForm(); // Enable the form fields
                }, 2000);
            }
        });
    }

    goBack(){
        window.location.reload();
    }

}