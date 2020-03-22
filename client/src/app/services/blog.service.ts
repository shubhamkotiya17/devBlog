import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../models/blog' ;



@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private api:string = environment.api ;
  constructor(private http: HttpClient) { }

//create blog
  createBlog(blog : Blog){
    return this.http.post<any>(`${this.api}/blog/createBlog`, blog);
  }

  // get a blog by id
  getBlog(blogid){
    return this.http.get<any>(`${this.api}/blog/getBlog/${blogid}`);

  }
// get all blogs list for home
  getAllBlogs(userid:number){
    return this.http.get<any>(`${this.api}/blog/getAllBlogs/${userid}`);

  }

  // get all blgs for profile only logged in user's blog
  getAllBlogsForProfile(userid:number) {
    return this.http.get<any>(`${this.api}/blog/getAllBlogsForProfile/${userid}`);

  }
}
