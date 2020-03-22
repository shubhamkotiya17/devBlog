import { Component, OnInit } from '@angular/core';
import { Blog } from '../models/blog';
import { BlogService } from '../services/blog.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  allBlogs:Blog;
  userData:any;

  constructor(private blogService : BlogService,
             private authenticationService : AuthenticationService
    ) {
       this.userData = this.authenticationService.currentUserValue ;

     }

  ngOnInit() {
    this.getAllBlogsForProfile();
  }

  getAllBlogsForProfile() {
      this.blogService.getAllBlogsForProfile(this.userData.data.user_id)
      .subscribe(res => {
        if(res.status){
          this.allBlogs = res.data.data;
          // console.log('all blogs ', this.allBlogs);
          }
      });
  }


}
