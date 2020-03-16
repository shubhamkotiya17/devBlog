import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../models/blog';

@Component({
  selector: 'app-viewblog',
  templateUrl: './viewblog.component.html',
  styleUrls: ['./viewblog.component.css']
})
export class ViewblogComponent implements OnInit {
  blogid:number;
  blogData : Blog ;
  constructor(private blogService : BlogService, private activateRouter : ActivatedRoute) { 
       this.blogid = this.activateRouter.snapshot.params["blogid"];
  }

  ngOnInit() {
    this.getBlog();
  }

  // get blog by blog id
  getBlog(){
      if(this.blogid){
          this.blogService.getBlog(this.blogid)
          .subscribe(res => {
            if(res.status){
              this.blogData = res.data.data[0];

            }
               
                console.log('res of get blog * ', "bbbbbbbbb ", this.blogData);

          });
      }
  }

}
