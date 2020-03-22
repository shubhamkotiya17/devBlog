import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../models/blog';

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.css']
})
export class BloglistComponent implements OnInit {

  @Input('allBlogs') allBlogs:Blog;
  @Input("componentName") componentName:string;
  blog_index:number = -1;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(){
  }

  readMore(index:number){
    this.blog_index = index;
  }
  
  renderAllBlogs(){

  }

}
