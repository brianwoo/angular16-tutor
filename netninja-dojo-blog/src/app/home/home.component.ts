import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../services/blogs.service';
import { Blog } from '../types/types';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs: Blog[] = [];
  isPending = true;

  constructor(private blogsService: BlogsService, private eventsService: EventsService) {

    this.eventsService.listen('deleteBlog', (blog: Blog) => {
      this.blogs = this.blogs.filter((eachblog) => eachblog.id !== blog.id);
    });
  }

  ngOnInit(): void {
    this.blogsService.getBlogs().subscribe(
      {
        next: (blogs: any) => {
          this.blogs = blogs as Blog[];
          this.isPending = false;
        },
        error: (error: any) => {
          alert('error!');
        }
      }
    );
  }
}
