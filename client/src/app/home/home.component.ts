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
              ) {
        this.isLoggedIn = this.authenticationService.isLoggedIn();
        if(this.isLoggedIn){          
            this.userData = this.authenticationService.currentUserValue ;
            this.getAllBlogs(this.userData.data.user_id)
        }else{
            this.getAllBlogs(-1); // on no user 
        }

   }

  ngOnInit() {
  }

  // get all blogs
  getAllBlogs(user_id){
      this.blogService.getAllBlogs(user_id)
      .subscribe(res => {
        if(res.status){
            this.allBlogs = res.data.data;
            console.log('all blogs ', this.allBlogs);
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

}
