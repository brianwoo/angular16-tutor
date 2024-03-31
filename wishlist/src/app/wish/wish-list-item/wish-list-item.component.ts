import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventService } from '../../../shared/services/EventService';
import { WishItem } from 'src/shared/models/wishItem';

@Component({
  selector: 'wish-list-item',
  templateUrl: './wish-list-item.component.html',
  styleUrls: ['./wish-list-item.component.css']
})
export class WishListItemComponent {

  @Input() wish!: WishItem;

  constructor(private events: EventService) { }

  get cssClasses() {
    // --- 2 options of returning css classes ---
    // return this.fullfilled ? ['strikeout', 'text-muted'] : [''];
    return {
      'strikeout text-muted': this.wish.isComplete
    };
  }

  removeWish() {
    this.events.emit('removeWish', this.wish);
  }

  toggleFullfilled() {
    // this.fullfilled = !this.fullfilled;
    // this.fullfilledChange.emit(this.fullfilled);
    this.wish.isComplete = !this.wish.isComplete;
  }

}
