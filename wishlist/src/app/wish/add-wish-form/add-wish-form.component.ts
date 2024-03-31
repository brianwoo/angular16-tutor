import { Component, EventEmitter, Output } from '@angular/core';
import { WishItem } from 'src/shared/models/wishItem';

@Component({
  selector: 'app-add-wish-form',
  templateUrl: './add-wish-form.component.html',
  styleUrls: ['./add-wish-form.component.css']
})
export class AddWishFormComponent {

  @Output() addWish = new EventEmitter<WishItem>();

  newWishText = "";

  addNewWish(e: MouseEvent) {
    e.preventDefault();
    // add wish to items array
    // this.items.push(new WishItem(this.newWishText));

    this.addWish.emit(new WishItem(this.newWishText));
    this.newWishText = '';
  }
}
