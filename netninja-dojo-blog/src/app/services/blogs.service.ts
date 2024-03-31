import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Blog } from '../types/types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  // private blogs: Blog[] = [
  //   { title: 'My new website', body: 'lorem ipsum...', author: 'mario', id: 1 },
  //   { title: 'Welcome party!', body: 'lorem ipsum...', author: 'yoshi', id: 2 },
  //   { title: 'Web dev top tips', body: 'lorem ipsum...', author: 'mario', id: 3 },
  // ];

  constructor(private http: HttpClient) { }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


  getBlogs() {
    return this.http
      .get('http://localhost:8000/blogs')
      .pipe(catchError(this.handleError));
  }

  getBlogDetails(id: string) {
    return this.http
      .get(`http://localhost:8000/blogs/${id}`)
      .pipe(catchError(this.handleError));
  }

  submitBlog(blog: Blog) {
    return this.http
      .post('http://localhost:8000/blogs',
        blog,
        { headers: { 'Content-Type': 'application/json' } }
      )
      .pipe(catchError(this.handleError));
  }

  deleteBlog(id: string) {
    return this.http
      .delete(`http://localhost:8000/blogs/${id}`)
      .pipe(catchError(this.handleError));
  }

}
