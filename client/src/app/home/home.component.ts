import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { DialogComponent } from '../common/dialog/dialog.component';
import { AuthenticationService } from '../services/authentication.service';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn:boolean = false;
  userData:any;
  allBlogs:Blog;

  constructor(private dialog: MatDialog, 
              private authenticationService : AuthenticationService,
              private blogService : BlogService,
              private authService : AuthenticationService
              ) {
        this.isLoggedIn = this.authenticationService.isLoggedIn();
        this.userData = this.authService.currentUserValue ;
          console.log('user data * ', this.userData);

   }

  ngOnInit() {
    this.getAllBlogs();
  }

  // get all blogs
  getAllBlogs(){
      this.blogService.getAllBlogs(this.userData.data.user_id)
      .subscribe(res => {
        if(res.status){
            this.allBlogs = res.data.data;
            console.log('res of all blogs api ', this.allBlogs);

        }
      })
  }

  // for modal
    openDialog() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      this.dialog.open(DialogComponent ,{
          height: '600px',
          width: '900px',
      });
  }

  readMore(){
    
  }

}
