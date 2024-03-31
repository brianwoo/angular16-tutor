import { Component, Input } from '@angular/core';
import { Blog } from '../types/types';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.css']
})
export class BloglistComponent {

  @Input() blogs: Blog[] = [];
  @Input() title: string = "";

  constructor(private eventsService: EventsService) { }

  handleDelete(blog: Blog) {
    this.eventsService.emit('deleteBlog', blog);
  }

}
