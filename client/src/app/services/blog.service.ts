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

  createBlog(blog : Blog){
    return this.http.post<any>(`${this.api}/blog/createBlog`, blog);

  }
}
