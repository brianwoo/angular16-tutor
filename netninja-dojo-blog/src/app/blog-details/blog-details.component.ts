import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BlogsService } from '../services/blogs.service';
import { Blog } from '../types/types';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  blog: Blog | undefined;

  constructor(
    private blogsService: BlogsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');

      if (id) {
        this.blogsService.getBlogDetails(id).subscribe(
          {
            next: (blog: any) => {
              this.blog = blog as Blog;
            },
            error: (error: any) => {
              alert('Error! Unable to fetch blog detail');
            }
          }
        )
      }
    });
  }


  handleDelete() {

    if (this.blog?.id) {
      this.blogsService.deleteBlog(this.blog.id).subscribe(
        {
          next: (blog: any) => {
            console.log("Blog deleted");
            this.router.navigate(['/']);
          },
          error: (error: any) => {
            alert('Error! Unable to delete blog detail');
          }
        }
      )
    }
  }

}
