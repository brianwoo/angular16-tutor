import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Blog } from '../types/types';
import { BlogsService } from '../services/blogs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  blogForm = new FormGroup({
    blogTitle: new FormControl('', Validators.required),
    blogBody: new FormControl('', Validators.required),
    blogAuthor: new FormControl('', Validators.required),
  });

  isPending: boolean = false;

  constructor(private blogsService: BlogsService, private router: Router) { }

  handleSubmit() {

    const blog: Blog = {
      title: this.blogForm.value.blogTitle!,
      body: this.blogForm.value.blogBody!,
      author: this.blogForm.value.blogAuthor!,
    }

    this.isPending = true;

    this.blogsService.submitBlog(blog).subscribe(
      {
        next: (blogs: any) => {
          console.log("new blog added");
          this.isPending = false;
          this.router.navigate(['/']);

        },
        error: (error: any) => {
          alert('error!');
        }
      }
    );
  }
}
