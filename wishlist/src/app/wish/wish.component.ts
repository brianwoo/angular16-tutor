import { Component, OnInit } from '@angular/core';
import { WishItem } from 'src/shared/models/wishItem';
import { EventService } from '../../shared/services/EventService';
import { WishService } from './wish.service';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.css']
})
export class WishComponent implements OnInit {
  items: WishItem[] = [];

  constructor(private events: EventService, private wishService: WishService) {
    events.listen('removeWish', (wish: any) => {
      const index = this.items.indexOf(wish);
      this.items.splice(index, 1);
      // this.items = this.items.filter((item) => item !== wish)
    });
  }

  ngOnInit(): void {
    this.wishService.getWishes().subscribe(
      {
        next: (data: any) => {
          this.items = data;
        },
        error: (error: any) => {
          alert(error.message);
        }
      })
  }


  listFilter = '0';

  // visibleItems: WishItem[] = this.items;
  // Using a getter method to make sure an updated list is returned 
  // everytime visibleItems is referenced
  get visibleItems(): WishItem[] {

    let value = this.listFilter;
    if (value === '0') {
      return this.items;
    }
    else if (value === '1') {
      return this.items.filter((item) => !item.isComplete)
    }
    else {
      return this.items.filter((item) => item.isComplete)
    }
  }


}
