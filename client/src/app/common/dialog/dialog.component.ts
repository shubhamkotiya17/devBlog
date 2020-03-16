import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Blog } from '../../models/blog' ;
import { BlogService } from 'src/app/services/blog.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


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
            private authService : AuthenticationService
    ) { 
          this.userData = this.authService.currentUserValue ;
          // console.log('user data * ', this.userData);
          
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
      // console.log('idddddddd ', this.userData.data.user_id);
      
      let blog =  new Blog(this.userData.data.user_id, this.f.title.value, this.f.content.value);
      this.blogService.createBlog(blog)
      .subscribe(res => {
          console.log('blog api resp ', res );
          if(res.status){
              this.close();
          }
      });
  }

  close() {
    this.dialogRef.close();
  }
}
