import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Blog } from '../../models/blog' ;
import { BlogService } from 'src/app/services/blog.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

// to correct
/*
userdata type
res of create blog api, token private, use observable, unsubscribe
*/

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  createBlogForm:FormGroup;
  userData:any ;

  constructor(
            private fb : FormBuilder,
            private dialogRef: MatDialogRef<DialogComponent>,
            private blogService : BlogService,
            private authService : AuthenticationService,
            private router : Router
    ) { 
          this.userData = this.authService.currentUserValue ;          
    }

  ngOnInit() {
      this.createForm();
  }

  createForm(){
      this.createBlogForm = this.fb.group({
          title : ['', Validators.required],
          content : ['', Validators.required]
      })
  }

  get f() { return this.createBlogForm.controls ;}

  onCreateBlog(){
    if(this.createBlogForm.invalid)
      return;

      // api create blog      
      let blog =  new Blog(this.userData.data.user_id, this.f.title.value, this.f.content.value);
      this.blogService.createBlog(blog)
      .subscribe(res => {
          console.log('blog api resp ', res );
          if(res.status){
              this.close();
              this.router.navigate(['/viewblog', res.data.data.insertId])
          }
      });
  }

  close() {
    this.dialogRef.close();
  }
}
